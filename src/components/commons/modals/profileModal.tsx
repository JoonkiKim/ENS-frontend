import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  FETCH_USER,
  FETCH_LOGIN_USER,
} from "../../../commons/apis/graphql-queries";

// Modal Overlay
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// Modal Container
const ModalContainer = styled.div`
  width: 785px;
  max-height: 90vh;
  background: white;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: "Inter", "Noto Sans KR", sans-serif;
  box-sizing: border-box;
`;

// Modal Header
const ModalHeader = styled.div`
  height: 50px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1e1e1e;
  letter-spacing: -0.32px;
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 1px;
    background: #d9d9d9;
    top: 50%;
    left: 0;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:hover::before,
  &:hover::after {
    background: #999;
  }
`;

// Modal Body
const ModalBody = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
`;

// Hero Section
const HeroSection = styled.div`
  height: 183px;
  background-image: url("/images/profile-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

// Profile Section
const ProfileSection = styled.div`
  padding: 0 51px 30px;
  position: relative;
`;

const ProfileImageWrapper = styled.div`
  width: 173px;
  height: 173px;
  border-radius: 50%;
  overflow: hidden;
  background: #e5e5e5;
  margin-top: -87px;
  margin-bottom: 20px;
  border: 4px solid white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileNameGenerationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  justify-content: space-between;
  margin-top: 48px;
`;

const ProfileName = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: black;
  letter-spacing: -0.52px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #ffd000;
  border-radius: 50%;
  font-size: 12px;
  color: white;
  font-weight: 600;
`;

const Generation = styled.p`
  font-size: 17px;
  font-weight: 600;
  color: #2c2c2c;
  letter-spacing: -0.34px;
  margin: 0;
`;

const Major = styled.p`
  font-size: 17px;
  font-weight: 600;
  color: #2c2c2c;
  letter-spacing: -0.34px;
  margin: 0 0 30px 0;
`;

// Contact and Highlight Wrapper
const ContactHighlightWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
`;

// Contact Section
const ContactSection = styled.div`
  flex: 1;
`;

const ContactTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #ffb700;
  letter-spacing: -0.34px;
  margin: 0 0 16px 0;
`;

const ContactRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactLabel = styled.div`
  font-size: 17px;
  color: #b3b3b3;
  letter-spacing: -0.34px;
  min-width: 72px;
`;

const ContactValue = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: #2c2c2c;
  letter-spacing: -0.34px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  &.link {
    color: #858585;
    text-decoration: underline;
    word-break: break-all;
  }
`;

// Highlight Section
const HighlightSection = styled.div`
  flex: 1;
`;

const HighlightLabel = styled.p`
  font-size: 17px;
  color: #ffd000;
  letter-spacing: -0.34px;
  margin: 0 0 12px 0;
`;

const HighlightCard = styled.div`
  border: 1px solid #ffd000;
  border-radius: 6px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HighlightCompany = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #2c2c2c;
  letter-spacing: -0.4px;
  margin: 0;
`;

const HighlightBadges = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const HighlightBadge = styled.span<{ active?: boolean }>`
  padding: 2px 20px;
  background: ${({ active }) => (active ? "#ffd000" : "transparent")};
  border: 1px solid #ffd000;
  border-radius: 100px;
  font-size: 17px;
  font-weight: 500;
  color: ${({ active }) => (active ? "white" : "#ffd000")};
  letter-spacing: -0.34px;
`;

// Divider
const Divider = styled.div`
  height: 8px;
  background: rgba(217, 217, 217, 0.2);
  box-shadow: inset 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
  margin: 0 -51px 30px;
`;

// Career Section
const CareerSection = styled.div`
  padding: 0 51px 40px;
`;

const CareerTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: black;
  letter-spacing: -0.52px;
  margin: 0 0 30px 0;
`;

const CareerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CareerItem = styled.div`
  position: relative;
  padding-left: 16px;
`;

const CareerBar = styled.div`
  position: absolute;
  left: 0;
  top: 3px;
  width: 4px;
  height: 48px;
  background: #ffd000;
  border-radius: 200px;
`;

const CareerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
`;

const CareerCompany = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #2c2c2c;
  letter-spacing: -0.34px;
  margin: 0;
`;

const CareerIndustryBadge = styled.span`
  width: fit-content;
  height: 24px;
  padding: 0px 12px;
  border: 1px solid #ffd000;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  color: #ffd000;
  //   letter-spacing: -0.28px;
  background: white;
`;

const CareerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CareerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CareerPosition = styled.span`
  font-size: 17px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.34px;
`;

const CareerPeriod = styled.span`
  font-size: 17px;
  font-weight: 500;
  color: #b3b3b3;
  letter-spacing: -0.34px;
`;

const EditButton = styled.button`
  padding: 8px 20px;
  background: #ffb700;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(255, 183, 0, 0.3);
  letter-spacing: -0.28px;

  &:hover {
    background: #e6a500;
    box-shadow: 0 4px 12px rgba(255, 183, 0, 0.4);
  }

  &:active {
    background: #cc9400;
    box-shadow: 0 2px 6px rgba(255, 183, 0, 0.3);
  }
`;

// Types
interface UserMajor {
  majorId: string;
  major: {
    id: string;
    name: string;
  };
  isPrimary: boolean;
}

interface Career {
  id: string;
  company: string;
  position: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  positionCategory: {
    id: string;
    name: string;
  } | null;
  industry: {
    id: string;
    name: string;
  } | null;
}

interface User {
  id: string;
  name: string;
  generation: number;
  phone: string | null;
  email: string | null;
  imageUrl: string | null;
  linkedin: string | null;
  entrance: number | null;
  noCoffeeChat: boolean;
  abroad: boolean;
  userMajors: UserMajor[] | null;
  careers: Career[] | null;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

export default function ProfileModal({
  isOpen,
  onClose,
  userId,
}: ProfileModalProps) {
  const router = useRouter();

  // 사용자 데이터 조회
  const { data, loading, error } = useQuery<{ fetchUser: User }>(FETCH_USER, {
    variables: { userId: userId || "" },
    skip: !isOpen || !userId, // 모달이 닫혀있거나 userId가 없으면 쿼리 실행 안 함
  });

  // 로그인한 유저 정보 조회 (운영진 확인용)
  const { data: loginUserData } = useQuery(FETCH_LOGIN_USER, {
    skip: !isOpen, // 모달이 닫혀있으면 쿼리 실행 안 함
  });
  const isAdmin = loginUserData?.fetchLoginUser?.role === "ADMIN";
  const loginUserId = loginUserData?.fetchLoginUser?.id;
  const isOwnProfile = userId === loginUserId; // 본인 프로필인지 확인

  const user = data?.fetchUser;

  const handleEditClick = () => {
    if (userId) {
      router.push(`/mypage?userId=${userId}`);
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (date: string | null): string => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  // 기간 계산 함수
  const calculatePeriod = (
    startDate: string | null,
    endDate: string | null,
    isCurrent: boolean
  ): string => {
    if (!startDate) return "";

    const start = formatDate(startDate);
    const end = isCurrent ? "현재" : formatDate(endDate);

    if (!endDate && !isCurrent) return start;

    // 기간 계산
    const startD = new Date(startDate);
    const endD = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(endD.getTime() - startD.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    let periodText = "";
    if (years > 0) {
      periodText = months > 0 ? `${years}년 ${months}개월` : `${years}년`;
    } else if (months > 0) {
      periodText = `${months}개월`;
    }

    return `${start} ~ ${end}${periodText ? ` · ${periodText}` : ""}`;
  };

  // 전공 정보 포맷팅
  const formatMajors = (
    userMajors: UserMajor[] | null,
    entrance: number | null
  ): string => {
    if (entrance == null) {
      if (!userMajors || userMajors.length === 0) return "";
      const majorsOnly = [...userMajors]
        .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
        .map((um) => um.major.name)
        .join(" / ");
      return majorsOnly || "";
    }

    // 학번의 마지막 두 자리만 표시 (2020 -> 20)
    const entranceYear = entrance % 100;

    if (!userMajors || userMajors.length === 0) return `${entranceYear}학번`;

    // 배열을 복사한 후 정렬 (읽기 전용 배열이므로)
    const majors = [...userMajors]
      .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
      .map((um) => um.major.name)
      .join(" / ");

    return `${entranceYear}학번 ${majors}`;
  };

  // 현재 직장 정보 가져오기
  const getCurrentCareer = (): Career | null => {
    if (!user?.careers || user.careers.length === 0) return null;

    // isCurrent가 true인 경력 찾기
    const currentCareer = user.careers.find((career) => career.isCurrent);
    if (currentCareer) return currentCareer;

    // isCurrent가 없으면 경력들 중 맨 위(첫 번째) 항목 반환
    return user.careers[0] || null;
  };

  // 모달이 열릴 때 body 스크롤 막기 (스크롤바는 유지)
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      // 스크롤바는 유지하되 스크롤만 막기
      document.body.style.overflowY = "scroll";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // 모달 컨테이너 요소 참조를 위한 ref (나중에 사용)
      const modalContainer = document.querySelector(
        "[data-modal-container]"
      ) as HTMLElement;

      // 스크롤 이벤트 막기 (모달 외부만)
      const preventScroll = (e: Event) => {
        e.preventDefault();
        window.scrollTo(0, scrollY);
      };

      // wheel 이벤트 처리 (모달 내부는 허용)
      const preventWheel = (e: WheelEvent) => {
        const target = e.target as HTMLElement;
        const modalContainer = document.querySelector(
          "[data-modal-container]"
        ) as HTMLElement;

        // 모달 내부인지 확인
        if (modalContainer && modalContainer.contains(target)) {
          // 모달 내부면 스크롤 허용
          return;
        }

        // 모달 외부면 스크롤 막기
        e.preventDefault();
        window.scrollTo(0, scrollY);
      };

      // touchmove 이벤트 처리 (모달 내부는 허용)
      const preventTouchMove = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        const modalContainer = document.querySelector(
          "[data-modal-container]"
        ) as HTMLElement;

        // 모달 내부인지 확인
        if (modalContainer && modalContainer.contains(target)) {
          // 모달 내부면 스크롤 허용
          return;
        }

        // 모달 외부면 스크롤 막기
        e.preventDefault();
      };

      window.addEventListener("scroll", preventScroll, { passive: false });
      document.addEventListener("wheel", preventWheel, { passive: false });
      document.addEventListener("touchmove", preventTouchMove, {
        passive: false,
      });

      return () => {
        // 모달이 닫힐 때 스크롤 복원
        window.removeEventListener("scroll", preventScroll);
        document.removeEventListener("wheel", preventWheel);
        document.removeEventListener("touchmove", preventTouchMove);
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflowY = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContainer data-modal-container>
          {/* Header */}
          <ModalHeader>
            <ModalTitle>프로필</ModalTitle>
            <CloseButton onClick={onClose} aria-label="Close" />
          </ModalHeader>

          {/* Body */}
          <ModalBody>
            {/* Hero */}
            <HeroSection />

            {/* Profile Info */}
            <ProfileSection>
              {loading ? (
                <div style={{ padding: "40px", textAlign: "center" }}>
                  로딩 중...
                </div>
              ) : error ? (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#ff4444",
                  }}
                >
                  데이터를 불러오는 중 오류가 발생했습니다.
                </div>
              ) : user ? (
                <>
                  {/* <ProfileImageWrapper>
                    <img
                      src={user.imageUrl || "data:image/svg+xml,%3Csvg width='173' height='173' viewBox='0 0 173 173' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='86.5' cy='86.5' r='86.5' fill='%23E5E5E5'/%3E%3Cpath d='M86.5 86.5C99.479 86.5 110 75.979 110 63C110 50.021 99.479 39.5 86.5 39.5C73.521 39.5 63 50.021 63 63C63 75.979 73.521 86.5 86.5 86.5Z' fill='%23999'/%3E%3Cpath d='M86.5 96.5C62.638 96.5 43.5 108.638 43.5 118.5V130H129.5V118.5C129.5 108.638 110.362 96.5 86.5 96.5Z' fill='%23999'/%3E%3C/svg%3E"}
                      alt={user.name}
                    />
                  </ProfileImageWrapper> */}

                  <ProfileNameGenerationWrapper>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <ProfileName>{user.name}</ProfileName>
                      <Generation>ENS {user.generation}기</Generation>
                    </div>
                    {(isAdmin || isOwnProfile) && (
                      <EditButton onClick={handleEditClick}>수정</EditButton>
                    )}
                  </ProfileNameGenerationWrapper>

                  {(() => {
                    const majorLine = formatMajors(
                      user.userMajors,
                      user.entrance
                    );
                    return majorLine ? <Major>{majorLine}</Major> : null;
                  })()}

                  {/* Contact and Highlight */}
                  <ContactHighlightWrapper>
                    {/* Contact */}
                    <ContactSection>
                      <ContactTitle>Contact</ContactTitle>
                      <ContactRow>
                        <ContactLabel>연락처</ContactLabel>
                        <ContactValue>{user.phone || "-"}</ContactValue>
                      </ContactRow>
                      <ContactRow>
                        <ContactLabel>이메일</ContactLabel>
                        <ContactValue>{user.email || "-"}</ContactValue>
                      </ContactRow>
                      <ContactRow>
                        <ContactLabel>링크드인</ContactLabel>
                        <ContactValue className={user.linkedin ? "link" : ""}>
                          {user.linkedin ? (
                            <a
                              href={
                                user.linkedin.startsWith("http")
                                  ? user.linkedin
                                  : `https://${user.linkedin}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "inherit",
                                textDecoration: "underline",
                              }}
                            >
                              {user.linkedin}
                            </a>
                          ) : (
                            "-"
                          )}
                        </ContactValue>
                      </ContactRow>
                    </ContactSection>

                    {/* Highlight */}
                    <HighlightSection>
                      <HighlightLabel>Highlight</HighlightLabel>
                      <HighlightCard>
                        {getCurrentCareer() && (
                          <HighlightCompany>
                            {getCurrentCareer()?.company}
                          </HighlightCompany>
                        )}
                        <HighlightBadges>
                          <HighlightBadge active={user.noCoffeeChat}>
                            커피챗은 어려워요
                          </HighlightBadge>
                          <HighlightBadge active={user.abroad}>
                            해외 거주
                          </HighlightBadge>
                        </HighlightBadges>
                      </HighlightCard>
                    </HighlightSection>
                  </ContactHighlightWrapper>
                </>
              ) : null}
            </ProfileSection>

            {/* Divider */}
            <Divider />

            {/* Career */}
            {user && (
              <CareerSection>
                <CareerTitle>경력</CareerTitle>
                <CareerList>
                  {user.careers && user.careers.length > 0 ? (
                    user.careers.map((career) => (
                      <CareerItem key={career.id}>
                        <CareerBar />
                        <CareerHeader>
                          <CareerCompany>{career.company}</CareerCompany>
                          {career.industry && (
                            <CareerIndustryBadge>
                              {career.industry.name}
                            </CareerIndustryBadge>
                          )}
                        </CareerHeader>
                        <CareerDetails>
                          <CareerRow>
                            <CareerPosition>{career.position}</CareerPosition>
                            <CareerPeriod>
                              {calculatePeriod(
                                career.startDate,
                                career.endDate,
                                career.isCurrent
                              )}
                            </CareerPeriod>
                          </CareerRow>
                        </CareerDetails>
                      </CareerItem>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#b3b3b3",
                      }}
                    >
                      등록된 경력이 없습니다.
                    </div>
                  )}
                </CareerList>
              </CareerSection>
            )}
          </ModalBody>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
}
