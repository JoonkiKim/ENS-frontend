import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ForceWithdrawModal from '../../modals/forceWithdrawModal';
import ForceWithdrawSuccessModal from '../../modals/forceWithdrawSuccessModal';
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
  EditButton,
  Pagination,
  PaginationInfo,
  PaginationControls,
  RowsPerPage,
  Select,
  PageInfo,
  PaginationButtons,
  PaginationButton,
} from './adminComponent.style';

interface Member {
  id: number;
  generation: string;
  name: string;
  phone: string;
  email: string;
  grade: string;
  memo: string;
}

const mockMembers: Member[] = [
  { id: 1, generation: '1기', name: '○○○', phone: '010-0000-0000', email: 'ens@ens.com', grade: '운영진', memo: '37기 커리어세션 강의해주셨음. 33기 커리어세션 참여해주셨음. 그리고 00기업과 산학협력 주선해주심.' },
  { id: 2, generation: '2기', name: '○○○', phone: '010-0000-0000', email: 'ens@ens.com', grade: '운영진', memo: '' },
  { id: 3, generation: '2기', name: '○○○', phone: '010-0000-0000', email: 'ens@ens.com', grade: '학회원', memo: '' },
  { id: 4, generation: '2기', name: '○○○', phone: '010-0000-0000', email: 'ens@ens.com', grade: '학회원', memo: '' },
  { id: 5, generation: '2기', name: '○○○', phone: '010-0000-0000', email: 'ens@ens.com', grade: '학회원', memo: '커피챗' },
  { id: 6, generation: '2기', name: '○○○', phone: '010-0000-0000', email: 'ens@ens.com', grade: '학회원', memo: '' },
  { id: 7, generation: '2기', name: '○○○', phone: '010-0000-0000', email: 'ens@ens.com', grade: '학회원', memo: '' },
  { id: 8, generation: '2기', name: '○○○', phone: '010-0000-0000', email: 'ens@ens.com', grade: '학회원', memo: '' },
  { id: 9, generation: '10기', name: '○○○', phone: '010-0000-0000', email: 'ens@ens.com', grade: '학회원', memo: '' },
  { id: 10, generation: '30기', name: '○○○', phone: '010-0000-0000', email: 'ens@ens.com', grade: '학회원', memo: '' },
];

const generations = Array.from({ length: 40 }, (_, i) => `${i + 1}기`);

export default function MembersList() {
  const router = useRouter();
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedMemo, setSelectedMemo] = useState<{ id: number; memo: string; position: { top: number; left: number } } | null>(null);
  const memoCellRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [openGradeDropdowns, setOpenGradeDropdowns] = useState<{ [key: number]: boolean }>({});
  const [isForceWithdrawModalOpen, setIsForceWithdrawModalOpen] = useState(false);
  const [isForceWithdrawSuccessModalOpen, setIsForceWithdrawSuccessModalOpen] = useState(false);

  const handleSelectAll = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map(m => m.id));
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

  const totalPages = Math.ceil(members.length / rowsPerPage);

  const handleEditAll = () => {
    setIsEditMode(!isEditMode);
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
        setIsForceWithdrawModalOpen(true);
      }
    }}
  >
    {isEditMode ? '강제 탈퇴' : '내보내기'}
  </Button>
</ButtonGroup>
            </SearchFilterBar>

            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell width="30px">
                      <TableCheckbox
                        type="checkbox"
                        checked={selectedMembers.length === mockMembers.length}
                        onChange={handleSelectAll}
                      />
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
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <TableCheckbox
                          type="checkbox"
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => handleSelectMember(member.id)}
                        />
                      </TableCell>
                      <TableCell>{member.generation}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{member.email}</TableCell>
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Pagination>
              <PaginationInfo>
                {selectedMembers.length} of {members.length} row(s) selected.
              </PaginationInfo>
              <PaginationControls>
                <RowsPerPage>
                  <span>Rows per page</span>
                  <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </Select>
                </RowsPerPage>
                <PageInfo>
                  Page {currentPage} of {totalPages}
                </PageInfo>
                <PaginationButtons>
                  <PaginationButton
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  >
                    «
                  </PaginationButton>
                  <PaginationButton
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </PaginationButton>
                  <PaginationButton
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </PaginationButton>
                  <PaginationButton
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </PaginationButton>
                </PaginationButtons>
              </PaginationControls>
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
        onConfirm={() => {
          // TODO: 강제 탈퇴 로직 구현
          console.log('강제 탈퇴 실행:', selectedMembers);
          setIsForceWithdrawModalOpen(false);
          setIsForceWithdrawSuccessModalOpen(true);
        }}
        selectedCount={selectedMembers.length}
      />

      {/* Force Withdraw Success Modal */}
      <ForceWithdrawSuccessModal
        isOpen={isForceWithdrawSuccessModalOpen}
        onClose={() => setIsForceWithdrawSuccessModalOpen(false)}
        selectedCount={selectedMembers.length}
      />
    </PageContainer>
  );
}