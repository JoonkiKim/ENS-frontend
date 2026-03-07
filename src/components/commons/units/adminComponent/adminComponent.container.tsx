import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';
import * as XLSX from 'xlsx';
import ForceWithdrawModal from '../../modals/forceWithdrawModal';
import ForceWithdrawSuccessModal from '../../modals/forceWithdrawSuccessModal';
import MessageModal from '../../modals/messageModal';
import ExportModal from '../../modals/exportModal';
import { FETCH_ALL_USERS, UPDATE_USERS_BATCH, DELETE_USER } from '../../../../commons/apis/graphql-queries';
import {
  PageContainer,
  Sidebar,
  Logo,
  NavMenu,
  NavItem,
  MainContent,
  PageTitle,
  Divider,
  ContentWrapper,
  FilterSidebar,
  FilterHeader,
  FilterList,
  FilterItem,
  FilterCheckbox,
  FilterLabel,
  TableSection,
  SearchFilterBar,

  SearchInput,
  ButtonGroup,
  Button,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  MemoCell,
  GradeSelectField,
  GradeValue,
  GradeDropdown,
  GradeDropdownItem,
  MemoInput,
  MemoModalOverlay,
  MemoModalContainer,
  MemoModalCloseButton,
  MemoModalContent,
  TableCheckbox,
  CheckboxWrapper,
  EditButton,
  Pagination,
  PaginationInfo,
} from './adminComponent.style';

interface Member {
  id: number;
  generation: string;
  name: string;
  phone: string;
  email: string;
  grade: string;
  memo: string;
  userId?: string; // 실제 유저 ID (변경사항 추적용)
}

interface User {
  id: string;
  name: string;
  generation: number;
  phone: string;
  email: string;
  role: 'MEMBER' | 'ADMIN';
  memo: string | null;
}

const generations = Array.from({ length: 40 }, (_, i) => `${i + 1}기`);

export default function MembersList() {
  const router = useRouter();
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(20); // 무한스크롤용 표시 개수
  const [selectedMemo, setSelectedMemo] = useState<{ id: number; memo: string; position: { top: number; left: number } } | null>(null);
  const memoCellRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const tableContainerRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 ref
  const [isEditMode, setIsEditMode] = useState(false);
  const [openGradeDropdowns, setOpenGradeDropdowns] = useState<{ [key: number]: boolean }>({});
  const [isForceWithdrawModalOpen, setIsForceWithdrawModalOpen] = useState(false);
  const [isForceWithdrawSuccessModalOpen, setIsForceWithdrawSuccessModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageModalMessage, setMessageModalMessage] = useState('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // 사용자 데이터 조회
  const { data, loading, error } = useQuery<{ fetchAllUsers: User[] }>(FETCH_ALL_USERS);

  // Batch update mutation
  const [updateUsersBatch] = useMutation(UPDATE_USERS_BATCH, {
    refetchQueries: [{ query: FETCH_ALL_USERS }],
  });

  // Delete user mutation
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: FETCH_ALL_USERS }],
  });

  // 초기 데이터 저장 (변경사항 추적용)
  const [initialMembers, setInitialMembers] = useState<Member[]>([]);
  const [userMap, setUserMap] = useState<Map<number, User>>(new Map());

  // 로컬 상태로 관리 (수정 시 사용)
  const [members, setMembers] = useState<Member[]>([]);

  // API 데이터가 변경되면 로컬 상태 업데이트
  useEffect(() => {
    if (data?.fetchAllUsers) {
      const convertedMembers = data.fetchAllUsers.map((user, index) => ({
        id: index + 1,
        generation: `${user.generation}기`,
        name: user.name,
        phone: user.phone,
        email: user.email,
        grade: user.role === 'ADMIN' ? '운영진' : '학회원',
        memo: user.memo || '',
        userId: user.id, // 실제 유저 ID 저장
      }));
      
      // 유저 ID 매핑 생성
      const newUserMap = new Map<number, User>();
      data.fetchAllUsers.forEach((user, index) => {
        newUserMap.set(index + 1, user);
      });
      setUserMap(newUserMap);
      
      setMembers(convertedMembers);
      setInitialMembers(convertedMembers); // 초기 데이터 저장
    }
  }, [data]);

  const handleSelectAll = () => {
    const displayedIds = displayedMembers.map(m => m.id);
    const allSelected = displayedIds.length > 0 && displayedIds.every(id => selectedMembers.includes(id));
    
    if (allSelected) {
      // 현재 표시된 항목들만 선택 해제
      setSelectedMembers(selectedMembers.filter(id => !displayedIds.includes(id)));
    } else {
      // 현재 표시된 항목들 모두 선택 (기존 선택 유지)
      const newSelected = Array.from(new Set([...selectedMembers, ...displayedIds]));
      setSelectedMembers(newSelected);
    }
  };

  const handleSelectMember = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(m => m !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const handleSelectGeneration = (gen: string) => {
    if (selectedGenerations.includes(gen)) {
      setSelectedGenerations(selectedGenerations.filter(g => g !== gen));
    } else {
      setSelectedGenerations([...selectedGenerations, gen]);
    }
  };

  // 필터링된 멤버 계산
  const filteredMembers = members.filter((member) => {
    // 기수 필터링
    if (selectedGenerations.length > 0 && !selectedGenerations.includes(member.generation)) {
      return false;
    }
    // 검색 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.phone.includes(query) ||
        member.generation.includes(query)
      );
    }
    return true;
  });

  // 표시할 멤버 계산
  const displayedMembers = filteredMembers.slice(0, displayCount);
  const hasMore = displayedMembers.length < filteredMembers.length;

  // 필터 변경 시 displayCount 리셋
  useEffect(() => {
    setDisplayCount(20);
  }, [selectedGenerations, searchQuery]);

  // 저장하기 핸들러
  const handleSave = async () => {
    // 변경사항이 있는 유저만 찾기
    const updates: Array<{ userId: string; updateUserInput: any }> = [];
    
    members.forEach((member, index) => {
      const initial = initialMembers[index];
      if (!initial) return;
      
      const hasChanges = 
        member.grade !== initial.grade || 
        member.memo !== initial.memo;
      
      if (hasChanges) {
        const user = userMap.get(member.id);
        if (!user) return;
        
        const updateUserInput: any = {};
        
        // 등급 변경
        if (member.grade !== initial.grade) {
          updateUserInput.role = member.grade === '운영진' ? 'ADMIN' : 'MEMBER';
        }
        
        // 메모 변경
        if (member.memo !== initial.memo) {
          updateUserInput.memo = member.memo || null;
        }
        
        updates.push({
          userId: user.id,
          updateUserInput,
        });
      }
    });
    
    if (updates.length === 0) {
      setMessageModalMessage('변경사항이 없습니다.');
      setIsMessageModalOpen(true);
      setIsEditMode(false);
      return;
    }
    
    try {
      // 단일 요청으로 모든 변경사항 전송
      const result = await updateUsersBatch({
        variables: {
          updates: {
            updates,
          },
        },
      });
      
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      
      // 성공 처리
      setIsEditMode(false);
      setInitialMembers([...members]); // 초기 데이터 업데이트
      setMessageModalMessage(`${updates.length}명의 변경사항이 저장되었습니다.`);
      setIsMessageModalOpen(true);
    } catch (error: any) {
      console.error('저장 중 오류:', error);
      setMessageModalMessage(error.message || '저장 중 오류가 발생했습니다.');
      setIsMessageModalOpen(true);
    }
  };

  const handleEditAll = () => {
    if (isEditMode) {
      handleSave(); // 저장하기 버튼 클릭 시 저장 실행
    } else {
      setIsEditMode(true);
    }
  };

  const handleGradeChange = (id: number, newGrade: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, grade: newGrade } : m));
  };

  const handleMemoChange = (id: number, newMemo: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, memo: newMemo } : m));
  };

  const handleToggleGradeDropdown = (id: number) => {
    setOpenGradeDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectGrade = (id: number, grade: string) => {
    handleGradeChange(id, grade);
    setOpenGradeDropdowns(prev => ({
      ...prev,
      [id]: false
    }));
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-grade-dropdown]')) {
        setOpenGradeDropdowns({});
      }
    };

    if (Object.values(openGradeDropdowns).some(open => open)) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openGradeDropdowns]);

  // 무한스크롤 로직
  useEffect(() => {
    const handleScroll = () => {
      const container = tableContainerRef.current;
      if (container && hasMore) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        // 하단 100px 전에 도달하면 더 불러오기
        if (scrollHeight - scrollTop - clientHeight < 100) {
          setDisplayCount((prevCount) => prevCount + 20);
        }
      }
    };

    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMore]);

  // 검색어 하이라이트 함수
  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) {
      return text;
    }

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <span key={index} style={{ color: '#ffb700', fontWeight: 600 }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // 엑셀 다운로드 함수
  const handleExportToExcel = (selectedColumns: string[]) => {
    // 필터링된 멤버들 전체를 다운로드
    if (filteredMembers.length === 0) {
      setMessageModalMessage('다운로드할 회원이 없습니다.');
      setIsMessageModalOpen(true);
      return;
    }

    // 선택된 열만 포함하는 데이터 생성
    const columnLabels: { [key: string]: string } = {
      generation: '그룹',
      name: '이름',
      phone: '연락처',
      email: '메일',
      memo: '메모',
    };

    const worksheetData = filteredMembers.map(member => {
      const row: { [key: string]: string } = {};
      selectedColumns.forEach(col => {
        const value = member[col as keyof Member];
        row[columnLabels[col]] = value ? String(value) : '';
      });
      return row;
    });

    // 워크북 생성
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(wb, ws, '회원 목록');

    // 파일 다운로드
    const fileName = `회원목록_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);

    setIsExportModalOpen(false);
  };

  return (
    <PageContainer>
      {/* Sidebar */}
      <Sidebar>
        <Logo>ENS Intranet</Logo>
        <NavMenu>
          <Link href="/" passHref>
            <NavItem as="a">Home</NavItem>
          </Link>
          <NavItem active>Members</NavItem>
        </NavMenu>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <PageTitle>Members</PageTitle>
        <Divider />
        <ContentWrapper>
          {/* Filter Sidebar */}
          <FilterSidebar>
            <FilterHeader>그룹 필터링</FilterHeader>
            <FilterList>
              {generations.map((gen) => (
                <FilterItem key={gen}>
                  <FilterCheckbox
                    type="checkbox"
                    id={gen}
                    checked={selectedGenerations.includes(gen)}
                    onChange={() => handleSelectGeneration(gen)}
                  />
                  <FilterLabel htmlFor={gen}>{gen}</FilterLabel>
                </FilterItem>
              ))}
            </FilterList>
          </FilterSidebar>

          {/* Table Section */}
          <TableSection>
            <SearchFilterBar>
              <SearchInput
                type="text"
                placeholder="searching..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           <ButtonGroup>
  <Button onClick={handleEditAll}>
    {isEditMode ? '저장하기' : '전체 수정'}
  </Button>
  <Button 
    variant={isEditMode ? 'danger' : undefined}
    onClick={() => {
      if (isEditMode) {
        // 먼저 선택된 유저가 있는지 확인
        if (selectedMembers.length === 0) {
          setMessageModalMessage('삭제할 유저가 없습니다.');
          setIsMessageModalOpen(true);
          return;
        }
        setIsForceWithdrawModalOpen(true);
      } else {
        // 내보내기 모달 열기
        setIsExportModalOpen(true);
      }
    }}
  >
    {isEditMode ? '강제 탈퇴' : '내보내기'}
  </Button>
</ButtonGroup>
            </SearchFilterBar>

            <TableContainer ref={tableContainerRef}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell id="header-cell" width="30px">
                      <CheckboxWrapper>
                        <TableCheckbox
                          type="checkbox"
                          checked={selectedMembers.length === displayedMembers.length && displayedMembers.length > 0}
                          onChange={handleSelectAll}
                          id="header-checkbox"
                        />
                      </CheckboxWrapper>
                    </TableHeaderCell>
                    <TableHeaderCell width="80px">그룹</TableHeaderCell>
                    <TableHeaderCell width="100px">이름</TableHeaderCell>
                    <TableHeaderCell width="170px">연락처</TableHeaderCell>
                    <TableHeaderCell width="170px">메일</TableHeaderCell>
                    <TableHeaderCell width="100px">등급</TableHeaderCell>
                    <TableHeaderCell>메모</TableHeaderCell>
                    <TableHeaderCell width="40px"></TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} style={{ textAlign: 'center', padding: '40px' }}>
                        로딩 중...
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#ff4444' }}>
                        데이터를 불러오는 중 오류가 발생했습니다.
                      </TableCell>
                    </TableRow>
                  ) : displayedMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} style={{ textAlign: 'center', padding: '40px' }}>
                        검색 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayedMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <CheckboxWrapper>
                          <TableCheckbox
                            type="checkbox"
                            checked={selectedMembers.includes(member.id)}
                            onChange={() => handleSelectMember(member.id)}
                          />
                        </CheckboxWrapper>
                      </TableCell>
                      <TableCell>{highlightText(member.generation, searchQuery)}</TableCell>
                      <TableCell>{highlightText(member.name, searchQuery)}</TableCell>
                      <TableCell>{highlightText(member.phone, searchQuery)}</TableCell>
                      <TableCell>{highlightText(member.email, searchQuery)}</TableCell>
                      <TableCell>
                        {isEditMode ? (
                          <GradeSelectField
                            data-grade-dropdown
                            onClick={() => handleToggleGradeDropdown(member.id)}
                          >
                            <GradeValue>{member.grade}</GradeValue>
                            <div style={{ position: 'absolute', right: '8px',  }}>
                              <svg width="12" height="8" viewBox="0 0 15 11" fill="none" >
                                <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                              </svg>
                            </div>
                            {openGradeDropdowns[member.id] && (
                              <GradeDropdown data-grade-dropdown>
                                <GradeDropdownItem 
                                  data-grade-dropdown
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectGrade(member.id, '운영진');
                                  }}
                                >
                                  운영진
                                </GradeDropdownItem>
                                <GradeDropdownItem 
                                  data-grade-dropdown
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectGrade(member.id, '학회원');
                                  }}
                                >
                                  학회원
                                </GradeDropdownItem>
                              </GradeDropdown>
                            )}
                          </GradeSelectField>
                        ) : (
                          member.grade
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditMode ? (
                          <MemoInput
                            type="text"
                            value={member.memo}
                            onChange={(e) => handleMemoChange(member.id, e.target.value)}
                            placeholder="메모를 입력해주세요"
                          />
                        ) : (
                          <MemoCell 
                            ref={(el) => {
                              if (el) {
                                memoCellRefs.current[member.id] = el;
                              }
                            }}
                            onDoubleClick={() => {
                              if (member.memo && member.memo.trim()) {
                                const cellElement = memoCellRefs.current[member.id];
                                if (cellElement) {
                                  const rect = cellElement.getBoundingClientRect();
                                  setSelectedMemo({ 
                                    id: member.id, 
                                    memo: member.memo,
                                    position: {
                                      top: rect.bottom + window.scrollY,
                                      left: rect.left + window.scrollX
                                    }
                                  });
                                }
                              }
                            }}
                            style={{ cursor: member.memo && member.memo.trim() ? 'pointer' : 'default' }}
                          >
                            {member.memo}
                          </MemoCell>
                        )}
                      </TableCell>
                      <TableCell>
                        <EditButton onClick={() => router.push('/mypage')}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L5.33301 13.3334L1.99967 14.3334L2.99967 11L11.333 2.00004Z"
                              stroke="#71717A"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            {/* 스크롤바 가로 직선 */}
                            <line
                              x1="10"
                              y1="13.5"
                              x2="14"
                              y2="13.5"
                              stroke="#71717A"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </EditButton>
                      </TableCell>
                    </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Pagination>
              <PaginationInfo>
                {selectedMembers.length} of {filteredMembers.length} row(s) selected.
              </PaginationInfo>
            </Pagination>
          </TableSection>
        </ContentWrapper>
      </MainContent>
      
      {/* Memo Modal */}
      {selectedMemo && (
        <>
          <MemoModalOverlay onClick={() => setSelectedMemo(null)} />
          <MemoModalContainer 
            top={selectedMemo.position.top}
            left={selectedMemo.position.left}
            onClick={(e) => e.stopPropagation()}
          >
            <MemoModalCloseButton onClick={() => setSelectedMemo(null)} />
            <MemoModalContent>{selectedMemo.memo}</MemoModalContent>
          </MemoModalContainer>
        </>
      )}

      {/* Force Withdraw Modal */}
      <ForceWithdrawModal
        isOpen={isForceWithdrawModalOpen}
        onClose={() => setIsForceWithdrawModalOpen(false)}
        onConfirm={async () => {
          try {
            // 선택된 멤버들의 userId 가져오기
            const userIdsToDelete = selectedMembers
              .map(memberId => {
                const member = members.find(m => m.id === memberId);
                return member?.userId;
              })
              .filter((userId): userId is string => userId !== undefined);

            if (userIdsToDelete.length === 0) {
              setIsForceWithdrawModalOpen(false);
              setMessageModalMessage('삭제할 유저가 없습니다.');
              setIsMessageModalOpen(true);
              return;
            }

            // 모든 유저 삭제 요청 (병렬 처리)
            const deletePromises = userIdsToDelete.map(userId =>
              deleteUser({
                variables: { userId },
              })
            );

            await Promise.all(deletePromises);

            // 성공 처리
            setIsForceWithdrawModalOpen(false);
            setSelectedMembers([]); // 선택 초기화
            setIsEditMode(false); // edit 모드 종료
            setIsForceWithdrawSuccessModalOpen(true);
          } catch (error: any) {
            console.error('강제 탈퇴 중 오류:', error);
            setIsForceWithdrawModalOpen(false);
            setMessageModalMessage(error.message || '강제 탈퇴 중 오류가 발생했습니다.');
            setIsMessageModalOpen(true);
          }
        }}
        selectedCount={selectedMembers.length}
      />

      {/* Force Withdraw Success Modal */}
      <ForceWithdrawSuccessModal
        isOpen={isForceWithdrawSuccessModalOpen}
        onClose={() => {
          setIsForceWithdrawSuccessModalOpen(false);
          setIsEditMode(false); // edit 모드 종료
        }}
        selectedCount={selectedMembers.length}
      />

      {/* Message Modal */}
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        message={messageModalMessage}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onConfirm={handleExportToExcel}
        selectedCount={filteredMembers.length}
      />
    </PageContainer>
  );
}