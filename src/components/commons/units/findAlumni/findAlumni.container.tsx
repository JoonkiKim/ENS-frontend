import { useState, useEffect, useRef, useMemo } from "react";
import { useQuery } from "@apollo/client";
import * as XLSX from "xlsx";
import * as S from "./findAlumni.style";
import Head from "next/head";
import ProfileModal from "../../modals/profileModal";
import SearchFilterModal from "../../modals/searchFilterModal";
import Filter from "../../../../commons/libraries/filter";
import {
  FETCH_ALL_USERS,
  FETCH_LOGIN_USER,
} from "../../../../commons/apis/graphql-queries";

interface FilterState {
  generationMin: number;
  generationMax: number;
  industries: string[];
  positions: string[];
}

interface User {
  id: string;
  customId?: string;
  name: string;
  generation: number;
  phone: string;
  email: string;
  entrance?: number;
  imageUrl?: string;
  linkedin?: string;
  noCoffeeChat?: boolean;
  abroad?: boolean;
  memo?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  careers?: Array<{
    id: string;
    company: string;
    position: string;
    isCurrent: boolean;
    positionCategory?: {
      id: string;
      name: string;
    };
    industry?: {
      id: string;
      name: string;
    };
    startDate?: string | null;
    endDate?: string | null;
  }>;
}

/** 표시용 경력: isCurrent 우선, 없으면 종료일 미입력·시작일 최근 순 */
function getDisplayCareer(user: User) {
  const list = user.careers;
  if (!list?.length) return undefined;

  const current = list.find((c) => c.isCurrent);
  if (current) return current;

  return [...list].sort((a, b) => {
    const aOpen = a.endDate == null ? 1 : 0;
    const bOpen = b.endDate == null ? 1 : 0;
    if (aOpen !== bOpen) return bOpen - aOpen;

    const aTime = a.startDate != null ? new Date(a.startDate).getTime() : 0;
    const bTime = b.startDate != null ? new Date(b.startDate).getTime() : 0;
    return bTime - aTime;
  })[0];
}

export default function AlumniSearch() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterState | null>(
    null
  );
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(20); // 초기 표시 개수
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // 사용자 데이터 조회
  const { data, loading, error } = useQuery<{ fetchAllUsers: User[] }>(
    FETCH_ALL_USERS
  );

  // 로그인한 유저 정보 조회 (운영진 확인용)
  const { data: loginUserData } = useQuery(FETCH_LOGIN_USER);
  const isAdmin = loginUserData?.fetchLoginUser?.role === "ADMIN";

  const handleOpenModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (filters: FilterState) => {
    setAppliedFilters(filters);
  };

  const handleRemoveGenerationFilter = () => {
    if (appliedFilters) {
      setAppliedFilters({
        ...appliedFilters,
        generationMin: 1,
        generationMax: 40,
      });
    }
  };

  const handleRemoveIndustryFilter = (industry: string) => {
    if (appliedFilters) {
      setAppliedFilters({
        ...appliedFilters,
        industries: appliedFilters.industries.filter((i) => i !== industry),
      });
    }
  };

  const handleRemovePositionFilter = (position: string) => {
    if (appliedFilters) {
      setAppliedFilters({
        ...appliedFilters,
        positions: appliedFilters.positions.filter((p) => p !== position),
      });
    }
  };

  const hasActiveFilters =
    appliedFilters &&
    (appliedFilters.generationMin !== 1 ||
      appliedFilters.generationMax !== 40 ||
      appliedFilters.industries.length > 0 ||
      appliedFilters.positions.length > 0);

  const getCurrentCompany = (user: User): string => {
    return getDisplayCareer(user)?.company || "-";
  };

  const getPositionInfo = (user: User): string => {
    const career = getDisplayCareer(user);
    if (!career) return "-";
    return career.position || "-";
  };

  // 필터링된 사용자 목록 (기수 내림차순: 최신 기수가 위로)
  const users = data?.fetchAllUsers || [];
  const filteredUsers = useMemo(() => {
    const list = appliedFilters
      ? users.filter((user) => {
          if (
            user.generation < appliedFilters.generationMin ||
            user.generation > appliedFilters.generationMax
          ) {
            return false;
          }

          if (appliedFilters.industries.length > 0) {
            const userIndustries =
              user.careers
                ?.map((career) => career.industry?.name)
                .filter(Boolean) || [];
            const hasMatchingIndustry = appliedFilters.industries.some(
              (industry) => userIndustries.includes(industry)
            );
            if (!hasMatchingIndustry) return false;
          }

          if (appliedFilters.positions.length > 0) {
            const userPositions =
              user.careers
                ?.map((career) => career.positionCategory?.name)
                .filter(Boolean) || [];
            const hasMatchingPosition = appliedFilters.positions.some(
              (position) => userPositions.includes(position)
            );
            if (!hasMatchingPosition) return false;
          }

          return true;
        })
      : users;

    return [...list].sort((a, b) => b.generation - a.generation);
  }, [users, appliedFilters]);

  // 표시할 사용자 목록 (무한 스크롤용)
  const displayedUsers = filteredUsers.slice(0, displayCount);
  const hasMore = displayedUsers.length < filteredUsers.length;

  // 필터 변경 시 표시 개수 리셋
  useEffect(() => {
    setDisplayCount(20);
  }, [appliedFilters]);

  // 엑셀 다운로드 함수
  const handleExportToExcel = () => {
    if (filteredUsers.length === 0) {
      alert("다운로드할 데이터가 없습니다.");
      return;
    }

    // password를 제외한 모든 필드를 포함한 데이터 생성
    const worksheetData = filteredUsers.map((user) => {
      const row: { [key: string]: string | number | boolean | null } = {};

      // 기본 필드들
      if (user.id) row["ID"] = user.id;
      if (user.customId) row["아이디"] = user.customId;
      if (user.name) row["이름"] = user.name;
      if (user.generation) row["기수"] = user.generation;
      if (user.phone) row["전화번호"] = user.phone;
      if (user.email) row["이메일"] = user.email;
      if (user.entrance) row["입학년도"] = user.entrance;
      if (user.imageUrl) row["프로필 이미지"] = user.imageUrl;
      if (user.linkedin) row["링크드인"] = user.linkedin;
      if (user.noCoffeeChat !== undefined)
        row["커피챗 불가"] = user.noCoffeeChat;
      if (user.abroad !== undefined) row["해외 거주"] = user.abroad;
      if (user.memo) row["메모"] = user.memo;
      if (user.role) row["역할"] = user.role === "ADMIN" ? "운영진" : "학회원";
      if (user.createdAt)
        row["생성일"] = new Date(user.createdAt).toLocaleDateString("ko-KR");
      if (user.updatedAt)
        row["수정일"] = new Date(user.updatedAt).toLocaleDateString("ko-KR");
      if (user.deletedAt)
        row["삭제일"] = new Date(user.deletedAt).toLocaleDateString("ko-KR");

      const displayCareer = getDisplayCareer(user);
      if (displayCareer) {
        row["현재 회사"] = displayCareer.company || "";
        row["현재 직무"] = displayCareer.position || "";
        row["직무 카테고리"] = displayCareer.positionCategory?.name || "";
        row["산업군"] = displayCareer.industry?.name || "";
      }

      return row;
    });

    // 워크북 생성
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(wb, ws, "알럼나이 목록");

    // 파일 다운로드
    const fileName = `알럼나이목록_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // 무한 스크롤 처리
  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    if (!tableContainer || !hasMore) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = tableContainer;
      // 하단에서 100px 전에 도달하면 다음 데이터 로드
      if (scrollHeight - scrollTop - clientHeight < 100) {
        setDisplayCount((prev) => Math.min(prev + 20, filteredUsers.length));
      }
    };

    tableContainer.addEventListener("scroll", handleScroll);
    return () => {
      tableContainer.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, filteredUsers.length, displayCount]);

  return (
    <>
      <S.Container>
        {/* Hero Section */}
        <S.Hero>
          <S.HeroTitle>알럼나이 찾기</S.HeroTitle>
          <S.HeroDescription>
            기수, 전공, 직무, 기업 등으로 알럼나이를 찾아보세요.
            <br />
            원하는 학회 구성원의 정보를 한눈에 확인할 수 있습니다.
          </S.HeroDescription>

          <S.SearchSection>
            <S.SearchContainer>
              <S.SearchLabelWrapper>
                <S.SearchLabel>FIND</S.SearchLabel>
                <S.SearchHelper>
                  검색 필터를 이용해 상세한 검색이 가능합니다.
                </S.SearchHelper>
              </S.SearchLabelWrapper>

              <S.SearchBox>
                <S.SearchInput
                  type="text"
                  placeholder="이름, 기수, 재직 기업 등을 입력하세요"
                />
                <S.SearchDivider />
                <S.SearchFilter>
                  <S.FilterLabel>
                    <S.FilterTitle>검색 필터 지정</S.FilterTitle>
                    <S.FilterSubtitle>기수, 산업군, 직무</S.FilterSubtitle>
                  </S.FilterLabel>
                </S.SearchFilter>
                <S.SearchButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenFilterModal();
                  }}
                >
                  <S.SearchIcon viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="7.25"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="13.5"
                      y1="13.5"
                      x2="15.5"
                      y2="15.5"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  </S.SearchIcon>
                </S.SearchButton>
              </S.SearchBox>
            </S.SearchContainer>
          </S.SearchSection>
        </S.Hero>

        {/* Search Section */}

        {/* Results Section */}
        <S.ResultsSection>
          <S.FilterResultsWrapper>
            {hasActiveFilters && (
              <>
                <S.FilterIconWrapper>
                  <Filter onClick={handleOpenFilterModal} />
                </S.FilterIconWrapper>
                <S.FilterTagsContainer>
                  {appliedFilters &&
                    (appliedFilters.generationMin !== 1 ||
                      appliedFilters.generationMax !== 40) && (
                      <S.FilterTag>
                        <S.FilterTagText>
                          {appliedFilters.generationMin}기~
                          {appliedFilters.generationMax}기
                        </S.FilterTagText>
                        <S.FilterTagRemove
                          onClick={handleRemoveGenerationFilter}
                        >
                          ⨉
                        </S.FilterTagRemove>
                      </S.FilterTag>
                    )}
                  {appliedFilters?.industries.map((industry) => (
                    <S.FilterTag key={`industry-${industry}`}>
                      <S.FilterTagText>산업군: {industry}</S.FilterTagText>
                      <S.FilterTagRemove
                        onClick={() => handleRemoveIndustryFilter(industry)}
                      >
                        ⨉
                      </S.FilterTagRemove>
                    </S.FilterTag>
                  ))}
                  {appliedFilters?.positions.map((position) => (
                    <S.FilterTag key={`position-${position}`}>
                      <S.FilterTagText>직무: {position}</S.FilterTagText>
                      <S.FilterTagRemove
                        onClick={() => handleRemovePositionFilter(position)}
                      >
                        ⨉
                      </S.FilterTagRemove>
                    </S.FilterTag>
                  ))}
                </S.FilterTagsContainer>
              </>
            )}
            <S.ResultsCount>
              총 <S.CountNumber>{filteredUsers.length}</S.CountNumber>명
            </S.ResultsCount>
          </S.FilterResultsWrapper>

          {/* Table Container with Infinite Scroll */}
          <S.TableScrollContainer ref={tableContainerRef}>
            {/* Table Header */}
            <S.TableHeader>
              <div>기수</div>
              <div>성명</div>
              <div>전화번호</div>
              <div>이메일</div>
              <div>현 직장</div>
              <div>소속/직무</div>
              <div>프로필</div>
            </S.TableHeader>

            {/* Table Rows */}
            {loading ? (
              <S.TableRow>
                <S.TableCell
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    gridColumn: "1 / -1",
                  }}
                >
                  로딩 중...
                </S.TableCell>
              </S.TableRow>
            ) : error ? (
              <S.TableRow>
                <S.TableCell
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#ff4444",
                    gridColumn: "1 / -1",
                  }}
                >
                  데이터를 불러오는 중 오류가 발생했습니다.
                </S.TableCell>
              </S.TableRow>
            ) : displayedUsers.length === 0 ? (
              <S.TableRow>
                <S.TableCell
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    gridColumn: "1 / -1",
                  }}
                >
                  검색 결과가 없습니다.
                </S.TableCell>
              </S.TableRow>
            ) : (
              displayedUsers.map((user) => (
                <S.TableRow key={user.id}>
                  <S.TableCell>{user.generation}</S.TableCell>
                  <S.TableCell>{user.name}</S.TableCell>
                  <S.TableCell>{user.phone}</S.TableCell>
                  <S.TableCell>
                    <S.EmailLink href={`mailto:${user.email}`}>
                      {user.email}
                    </S.EmailLink>
                  </S.TableCell>
                  <S.TableCell>{getCurrentCompany(user)}</S.TableCell>
                  <S.TableCell>{getPositionInfo(user)}</S.TableCell>
                  <S.TableCell>
                    <S.ProfileLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal(user.id);
                      }}
                    >
                      더보기
                    </S.ProfileLink>
                  </S.TableCell>
                </S.TableRow>
              ))
            )}
          </S.TableScrollContainer>

          {/* 엑셀 다운로드 버튼 (운영진만 표시) */}
          {isAdmin && (
            <S.ExcelDownloadButton onClick={handleExportToExcel}>
              엑셀파일로 저장
              <S.DownloadIcon viewBox="0 0 24 24" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </S.DownloadIcon>
            </S.ExcelDownloadButton>
          )}
        </S.ResultsSection>
      </S.Container>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userId={selectedUserId}
      />

      {/* Search Filter Modal */}
      <SearchFilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApply={handleApplyFilters}
        initialFilters={appliedFilters || undefined}
      />
    </>
  );
}
