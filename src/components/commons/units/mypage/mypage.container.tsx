import  { useState, useEffect, useRef } from 'react';

import * as S from './mypage.style';
import Head from 'next/head';
import MessageModal from '../../modals/messageModal';
import ErrorModal from '../../modals/errorModal';


export default function MyPage() {
  // 메시지 모달 상태 관리
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    message: '',
  });

  // 에러 모달 상태 관리
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    message: '',
  });

  // 상태 표시 버튼 상태 관리
  const [statusBadges, setStatusBadges] = useState({
    coffeeChat: false, // 커피챗은 어려워요
    overseas: false, // 해외 거주 중
  });

  // 전공 필드 상태 관리
  const [majors, setMajors] = useState([
    {
      id: 1,
      value: '',
    },
  ]);

  // 기수와 학번 상태 관리
  const [generation, setGeneration] = useState<number | undefined>(undefined);
  const [studentId, setStudentId] = useState<number | undefined>(undefined);
  const [isGenerationDropdownOpen, setIsGenerationDropdownOpen] = useState(false);
  const [isStudentIdDropdownOpen, setIsStudentIdDropdownOpen] = useState(false);

  // 이메일 도메인 상태 관리
  const [emailDomain, setEmailDomain] = useState<string | undefined>(undefined);
  const [isEmailDomainDropdownOpen, setIsEmailDomainDropdownOpen] = useState(false);

  // 기수 목록 생성 (40기부터 1기까지 역순)
  const generations = Array.from({ length: 40 }, (_, i) => 40 - i);

  // 학번 목록 생성 (2026부터 2019까지 역순)
  const studentIds = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019];

  // 이메일 도메인 목록
  const emailDomains = ['gmail.com', 'naver.com'];

  // 이메일 도메인 드롭다운 토글
  const handleToggleEmailDomainDropdown = () => {
    setIsEmailDomainDropdownOpen(!isEmailDomainDropdownOpen);
    setIsGenerationDropdownOpen(false);
    setIsStudentIdDropdownOpen(false);
    // 경력 항목의 모든 드롭다운 닫기
    setCareers(
      careers.map((career) => ({
        ...career,
        isPositionDropdownOpen: false,
        isIndustryDropdownOpen: false,
        isDatePickerOpen: false,
        isYearDropdownOpen: false,
        isMonthDropdownOpen: false,
        isLeaveDatePickerOpen: false,
        isLeaveYearDropdownOpen: false,
        isLeaveMonthDropdownOpen: false,
      }))
    );
  };

  // 이메일 도메인 선택
  const handleSelectEmailDomain = (domain: string) => {
    setEmailDomain(domain);
    setIsEmailDomainDropdownOpen(false);
  };

  // 기수 드롭다운 토글
  const handleToggleGenerationDropdown = () => {
    setIsGenerationDropdownOpen(!isGenerationDropdownOpen);
    setIsStudentIdDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    // 경력 항목의 모든 드롭다운 닫기
    setCareers(
      careers.map((career) => ({
        ...career,
        isPositionDropdownOpen: false,
        isIndustryDropdownOpen: false,
        isDatePickerOpen: false,
        isYearDropdownOpen: false,
        isMonthDropdownOpen: false,
        isLeaveDatePickerOpen: false,
        isLeaveYearDropdownOpen: false,
        isLeaveMonthDropdownOpen: false,
      }))
    );
  };

  // 학번 드롭다운 토글
  const handleToggleStudentIdDropdown = () => {
    setIsStudentIdDropdownOpen(!isStudentIdDropdownOpen);
    setIsGenerationDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    // 경력 항목의 모든 드롭다운 닫기
    setCareers(
      careers.map((career) => ({
        ...career,
        isPositionDropdownOpen: false,
        isIndustryDropdownOpen: false,
        isDatePickerOpen: false,
        isYearDropdownOpen: false,
        isMonthDropdownOpen: false,
        isLeaveDatePickerOpen: false,
        isLeaveYearDropdownOpen: false,
        isLeaveMonthDropdownOpen: false,
      }))
    );
  };

  // 기수 선택
  const handleSelectGeneration = (gen: number) => {
    setGeneration(gen);
    setIsGenerationDropdownOpen(false);
  };

  // 학번 선택
  const handleSelectStudentId = (id: number) => {
    setStudentId(id);
    setIsStudentIdDropdownOpen(false);
  };

  // 운영진 참고 사항 상태 관리
  const [adminNotes, setAdminNotes] = useState<string>('');

  // 경력 항목 상태 관리
  const [careers, setCareers] = useState<Array<{
    id: number;
    isCurrentJob: boolean;
    isPrivate: boolean;
    industry?: string;
    isIndustryDropdownOpen?: boolean;
    positionCategory?: string;
    isPositionDropdownOpen?: boolean;
    joinYear?: number;
    joinMonth?: number;
    isDatePickerOpen?: boolean;
    isYearDropdownOpen?: boolean;
    isMonthDropdownOpen?: boolean;
    leaveYear?: number;
    leaveMonth?: number;
    isLeaveDatePickerOpen?: boolean;
    isLeaveYearDropdownOpen?: boolean;
    isLeaveMonthDropdownOpen?: boolean;
  }>>([]);

  // 전공 필드 추가 함수
  const handleAddMajor = () => {
    console.log('handleAddMajor called', majors);
    const newId = majors.length > 0 ? Math.max(...majors.map(m => m.id)) + 1 : 1;
    setMajors([
      ...majors,
      {
        id: newId,
        value: '',
      },
    ]);
  };

  // 경력 추가 함수
  const handleAddCareer = () => {
    setCareers([
      ...careers,
      {
        id: careers.length + 1,
        isCurrentJob: false,
        isPrivate: false,
        industry: undefined,
        isIndustryDropdownOpen: false,
        positionCategory: undefined,
        isPositionDropdownOpen: false,
        joinYear: undefined,
        joinMonth: undefined,
        isDatePickerOpen: false,
        isYearDropdownOpen: false,
        isMonthDropdownOpen: false,
        leaveYear: undefined,
        leaveMonth: undefined,
        isLeaveDatePickerOpen: false,
        isLeaveYearDropdownOpen: false,
        isLeaveMonthDropdownOpen: false,
      },
    ]);
  };

  // 산업군 드롭다운 토글
  const handleToggleIndustryDropdown = (careerId: number) => {
    setIsGenerationDropdownOpen(false);
    setIsStudentIdDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    setCareers(
      careers.map((career) => {
        if (career.id === careerId) {
          return {
            ...career,
            isIndustryDropdownOpen: !career.isIndustryDropdownOpen,
            // 다른 드롭다운 모두 닫기
            isPositionDropdownOpen: false,
            isDatePickerOpen: false,
            isYearDropdownOpen: false,
            isMonthDropdownOpen: false,
            isLeaveDatePickerOpen: false,
            isLeaveYearDropdownOpen: false,
            isLeaveMonthDropdownOpen: false,
          };
        }
        // 다른 경력 항목의 드롭다운도 모두 닫기
        return {
          ...career,
          isIndustryDropdownOpen: false,
          isPositionDropdownOpen: false,
          isDatePickerOpen: false,
          isYearDropdownOpen: false,
          isMonthDropdownOpen: false,
          isLeaveDatePickerOpen: false,
          isLeaveYearDropdownOpen: false,
          isLeaveMonthDropdownOpen: false,
        };
      })
    );
  };

  // 산업군 선택
  const handleSelectIndustry = (careerId: number, industry: string) => {
    setCareers(
      careers.map((career) =>
        career.id === careerId
          ? { ...career, industry, isIndustryDropdownOpen: false }
          : career
      )
    );
  };

  const industries = [
    '게임',
    '방송',
    '웹툰&소설',
    '법조',
    '스포츠',
    '공연',
    '기타',
  ];

  const positionCategories = [
    '마케팅',
    '기획',
    '콘텐츠',
    '재무',
    'HR',
    '광고',
    '컨설팅',
    '법조',
    '기타',
  ];

  // 직무 카테고리 드롭다운 토글
  const handleTogglePositionDropdown = (careerId: number) => {
    setIsGenerationDropdownOpen(false);
    setIsStudentIdDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    setCareers(
      careers.map((career) => {
        if (career.id === careerId) {
          return {
            ...career,
            isPositionDropdownOpen: !career.isPositionDropdownOpen,
            // 다른 드롭다운 모두 닫기
            isIndustryDropdownOpen: false,
            isDatePickerOpen: false,
            isYearDropdownOpen: false,
            isMonthDropdownOpen: false,
            isLeaveDatePickerOpen: false,
            isLeaveYearDropdownOpen: false,
            isLeaveMonthDropdownOpen: false,
          };
        }
        // 다른 경력 항목의 드롭다운도 모두 닫기
        return {
          ...career,
          isPositionDropdownOpen: false,
          isIndustryDropdownOpen: false,
          isDatePickerOpen: false,
          isYearDropdownOpen: false,
          isMonthDropdownOpen: false,
          isLeaveDatePickerOpen: false,
          isLeaveYearDropdownOpen: false,
          isLeaveMonthDropdownOpen: false,
        };
      })
    );
  };

  // 직무 카테고리 선택
  const handleSelectPosition = (careerId: number, positionCategory: string) => {
    setCareers(
      careers.map((career) =>
        career.id === careerId
          ? { ...career, positionCategory, isPositionDropdownOpen: false }
          : career
      )
    );
  };

  // 연도 목록 생성 (현재 연도부터 50년 전까지)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 51 }, (_, i) => currentYear - i);

  // 월 목록 생성
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 날짜 선택기 열기/닫기
  const handleToggleDatePicker = (careerId: number) => {
    setIsGenerationDropdownOpen(false);
    setIsStudentIdDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    setCareers(
      careers.map((career) => {
        if (career.id === careerId) {
          return {
            ...career,
            isDatePickerOpen: !career.isDatePickerOpen,
            // 다른 드롭다운 모두 닫기
            isPositionDropdownOpen: false,
            isIndustryDropdownOpen: false,
            isYearDropdownOpen: false,
            isMonthDropdownOpen: false,
            isLeaveDatePickerOpen: false,
            isLeaveYearDropdownOpen: false,
            isLeaveMonthDropdownOpen: false,
          };
        }
        // 다른 경력 항목의 드롭다운도 모두 닫기
        return {
          ...career,
          isDatePickerOpen: false,
          isPositionDropdownOpen: false,
          isIndustryDropdownOpen: false,
          isYearDropdownOpen: false,
          isMonthDropdownOpen: false,
          isLeaveDatePickerOpen: false,
          isLeaveYearDropdownOpen: false,
          isLeaveMonthDropdownOpen: false,
        };
      })
    );
  };

  // 연도 드롭다운 토글
  const handleToggleYearDropdown = (careerId: number) => {
    setCareers(
      careers.map((career) =>
        career.id === careerId
          ? { ...career, isYearDropdownOpen: !career.isYearDropdownOpen, isMonthDropdownOpen: false }
          : { ...career, isYearDropdownOpen: false }
      )
    );
  };

  // 월 드롭다운 토글
  const handleToggleMonthDropdown = (careerId: number) => {
    setCareers(
      careers.map((career) =>
        career.id === careerId
          ? { ...career, isMonthDropdownOpen: !career.isMonthDropdownOpen, isYearDropdownOpen: false }
          : { ...career, isMonthDropdownOpen: false }
      )
    );
  };

  // 연도 선택
  const handleSelectYear = (careerId: number, year: number) => {
    setCareers(
      careers.map((career) =>
        career.id === careerId
          ? { ...career, joinYear: year, isYearDropdownOpen: false }
          : career
      )
    );
  };

  // 월 선택
  const handleSelectMonth = (careerId: number, month: number) => {
    setCareers(
      careers.map((career) => {
        if (career.id === careerId) {
          const updatedCareer = { ...career, joinMonth: month, isMonthDropdownOpen: false };
          // 연도와 월이 모두 선택되어 있으면 날짜 선택기 닫기
          if (updatedCareer.joinYear && updatedCareer.joinMonth) {
            updatedCareer.isDatePickerOpen = false;
          }
          return updatedCareer;
        }
        return career;
      })
    );
  };

  // 퇴사년월 날짜 선택기 열기/닫기
  const handleToggleLeaveDatePicker = (careerId: number) => {
    setIsGenerationDropdownOpen(false);
    setIsStudentIdDropdownOpen(false);
    setIsEmailDomainDropdownOpen(false);
    setCareers(
      careers.map((career) => {
        if (career.id === careerId) {
          return {
            ...career,
            isLeaveDatePickerOpen: !career.isLeaveDatePickerOpen,
            // 다른 드롭다운 모두 닫기
            isPositionDropdownOpen: false,
            isIndustryDropdownOpen: false,
            isDatePickerOpen: false,
            isYearDropdownOpen: false,
            isMonthDropdownOpen: false,
            isLeaveYearDropdownOpen: false,
            isLeaveMonthDropdownOpen: false,
          };
        }
        // 다른 경력 항목의 드롭다운도 모두 닫기
        return {
          ...career,
          isLeaveDatePickerOpen: false,
          isPositionDropdownOpen: false,
          isIndustryDropdownOpen: false,
          isDatePickerOpen: false,
          isYearDropdownOpen: false,
          isMonthDropdownOpen: false,
          isLeaveYearDropdownOpen: false,
          isLeaveMonthDropdownOpen: false,
        };
      })
    );
  };

  // 퇴사년월 연도 드롭다운 토글
  const handleToggleLeaveYearDropdown = (careerId: number) => {
    setCareers(
      careers.map((career) =>
        career.id === careerId
          ? { ...career, isLeaveYearDropdownOpen: !career.isLeaveYearDropdownOpen, isLeaveMonthDropdownOpen: false }
          : { ...career, isLeaveYearDropdownOpen: false }
      )
    );
  };

  // 퇴사년월 월 드롭다운 토글
  const handleToggleLeaveMonthDropdown = (careerId: number) => {
    setCareers(
      careers.map((career) =>
        career.id === careerId
          ? { ...career, isLeaveMonthDropdownOpen: !career.isLeaveMonthDropdownOpen, isLeaveYearDropdownOpen: false }
          : { ...career, isLeaveMonthDropdownOpen: false }
      )
    );
  };

  // 입사년월과 퇴사년월 유효성 검사
  const validateLeaveDate = (joinYear?: number, joinMonth?: number, leaveYear?: number, leaveMonth?: number): boolean => {
    if (!joinYear || !joinMonth || !leaveYear || !leaveMonth) {
      return true; // 둘 중 하나라도 선택되지 않았으면 유효
    }
    
    // 연도 비교
    if (leaveYear < joinYear) {
      return false; // 퇴사년이 입사년보다 빠름
    }
    
    if (leaveYear > joinYear) {
      return true; // 퇴사년이 입사년보다 늦음
    }
    
    // 같은 연도인 경우 월 비교
    return leaveMonth >= joinMonth; // 같은 달이거나 늦은 달이면 유효
  };

  // 퇴사년월 연도 선택
  const handleSelectLeaveYear = (careerId: number, year: number) => {
    setCareers(
      careers.map((career) =>
        career.id === careerId
          ? { ...career, leaveYear: year, isLeaveYearDropdownOpen: false }
          : career
      )
    );
  };

  // 퇴사년월 월 선택
  const handleSelectLeaveMonth = (careerId: number, month: number) => {
    setCareers(
      careers.map((career) => {
        if (career.id === careerId) {
          const updatedCareer = { ...career, leaveMonth: month, isLeaveMonthDropdownOpen: false };
          // 연도와 월이 모두 선택되어 있으면 날짜 선택기 닫기
          if (updatedCareer.leaveYear && updatedCareer.leaveMonth) {
            updatedCareer.isLeaveDatePickerOpen = false;
            
            // 유효성 검사
            if (updatedCareer.joinYear && updatedCareer.joinMonth) {
              const isValid = validateLeaveDate(
                updatedCareer.joinYear,
                updatedCareer.joinMonth,
                updatedCareer.leaveYear,
                updatedCareer.leaveMonth
              );
              
              if (!isValid) {
                setMessageModal({
                  isOpen: true,
                  message: '퇴사년월이 입사년월보다 빠릅니다',
                });
              }
            }
          }
          return updatedCareer;
        }
        return career;
      })
    );
  };

  // 운영진에게만 공개 체크박스 토글
  const handleTogglePrivate = (careerId: number) => {
    setCareers(
      careers.map((career) =>
        career.id === careerId
          ? { ...career, isPrivate: !career.isPrivate }
          : career
      )
    );
  };

  // 재직 중 체크박스 토글
  const handleToggleCurrentJob = (careerId: number) => {
    setCareers(
      careers.map((career) =>
        career.id === careerId
          ? { ...career, isCurrentJob: !career.isCurrentJob }
          : career
      )
    );
  };

  // 상태 표시 버튼 토글
  const handleToggleCoffeeChat = () => {
    setStatusBadges((prev) => ({ ...prev, coffeeChat: !prev.coffeeChat }));
  };

  const handleToggleOverseas = () => {
    setStatusBadges((prev) => ({ ...prev, overseas: !prev.overseas }));
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // 클릭된 요소가 드롭다운 관련 요소인지 확인
      const isDropdownElement = 
        target.closest('[data-dropdown-container]') ||
        target.closest('[data-dropdown-item]') ||
        target.closest('[data-dropdown-field]') ||
        target.closest('[data-date-picker]') ||
        target.closest('[data-year-selector]') ||
        target.closest('[data-month-selector]');
      
      // 드롭다운 관련 요소가 아니면 모든 드롭다운 닫기
      if (!isDropdownElement) {
        setCareers(
          careers.map((career) => ({
            ...career,
            isIndustryDropdownOpen: false,
            isPositionDropdownOpen: false,
            isDatePickerOpen: false,
            isYearDropdownOpen: false,
            isMonthDropdownOpen: false,
            isLeaveDatePickerOpen: false,
            isLeaveYearDropdownOpen: false,
            isLeaveMonthDropdownOpen: false,
          }))
        );
        setIsGenerationDropdownOpen(false);
        setIsStudentIdDropdownOpen(false);
        setIsEmailDomainDropdownOpen(false);
      }
    };

    // 드롭다운이 열려있는지 확인
    const hasOpenDropdown = careers.some(
      (career) => 
        career.isIndustryDropdownOpen || 
        career.isPositionDropdownOpen ||
        career.isDatePickerOpen ||
        career.isYearDropdownOpen ||
        career.isMonthDropdownOpen ||
        career.isLeaveDatePickerOpen ||
        career.isLeaveYearDropdownOpen ||
        career.isLeaveMonthDropdownOpen
    ) || isGenerationDropdownOpen || isStudentIdDropdownOpen || isEmailDomainDropdownOpen;

    if (hasOpenDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [careers, isGenerationDropdownOpen, isStudentIdDropdownOpen, isEmailDomainDropdownOpen]);

  return (
    <>
    <Head>
      <link
        rel="preload"
        href="/images/mypage-bg.png"
        as="image"
      />
    </Head>
      <S.Container>


        {/* Hero */}
        <S.Hero>
          <S.HeroTitle>마이페이지 · 내 정보 수정</S.HeroTitle>
        </S.Hero>

        {/* 기본 인적 정보 */}
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>기본 인적 정보</S.SectionTitle>
            <S.RequiredNote>은 필수 입력 항목입니다</S.RequiredNote>
          </S.SectionHeader>

          <S.ProfileSection>
            <S.ProfileImageWrapper>
              <S.ProfileImage />
              <S.CameraButton>
                <svg viewBox="0 0 15 15" fill="none">
                  <path
                    d="M13.5 3.5H11.25L10.5 2H6L5.25 3.5H3C2.175 3.5 1.5 4.175 1.5 5V12C1.5 12.825 2.175 13.5 3 13.5H13.5C14.325 13.5 15 12.825 15 12V5C15 4.175 14.325 3.5 13.5 3.5ZM8.25 11.5C6.45 11.5 5 10.05 5 8.25C5 6.45 6.45 5 8.25 5C10.05 5 11.5 6.45 11.5 8.25C11.5 10.05 10.05 11.5 8.25 11.5Z"
                    fill="black"
                  />
                </svg>
              </S.CameraButton>
            </S.ProfileImageWrapper>

            <S.ProfileInfo>
              <S.StatusLabel>상태 표시</S.StatusLabel>
              <S.StatusBadges>
                <S.StatusBadge active={statusBadges.coffeeChat} onClick={handleToggleCoffeeChat}>
                  커피챗은 어려워요
                </S.StatusBadge>
                <S.StatusBadge active={statusBadges.overseas} onClick={handleToggleOverseas}>
                  해외 거주 중
                </S.StatusBadge>
              </S.StatusBadges>
            </S.ProfileInfo>
          </S.ProfileSection>

          {/* 이름 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">이름</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
            <S.Input type="text" placeholder="이름을 입력하세요" />
            </S.FormInputWrapper>
          </S.FormField>

          {/* 비밀번호 변경 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel>비밀번호 변경</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.Input type="password" placeholder="기존 비밀번호 입력" />
              <div>
                <S.Input type="password" placeholder="비밀번호를 변경하는 경우 입력하세요" />
                <S.InputHelper>8자리 이상의 대소문자, 숫자, 특수문자를 사용해 주세요.</S.InputHelper>
              </div>
              <S.Input type="password" placeholder="비밀번호 확인" />
            </S.FormInputWrapper>
          </S.FormField>
        </S.Section>

        <S.Divider />

        {/* 학적 정보 */}
        <S.Section>
          {/* 기수 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">기수</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.GenerationSelectField 
                isClickable={true}
                onClick={handleToggleGenerationDropdown}
                data-dropdown-field
              >
                {generation ? (
                  <S.GenerationValue>{generation}기</S.GenerationValue>
                ) : (
                  <S.GenerationPlaceholder>기수를 선택하세요</S.GenerationPlaceholder>
                )}
                <S.DropdownIcon style={{ position: 'absolute', right: '18px' }}>
                  <svg viewBox="0 0 15 11" fill="none">
                    <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                  </svg>
                </S.DropdownIcon>
                {isGenerationDropdownOpen && (
                  <S.IndustryDropdown data-dropdown-container>
                    {generations.map((gen) => (
                      <S.IndustryDropdownItem
                        key={gen}
                        data-dropdown-item
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectGeneration(gen);
                        }}
                      >
                        {gen}기
                      </S.IndustryDropdownItem>
                    ))}
                  </S.IndustryDropdown>
                )}
              </S.GenerationSelectField>
            </S.FormInputWrapper>
          </S.FormField>

          {/* 학번 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">학번</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.GenerationSelectField 
                isClickable={true}
                onClick={handleToggleStudentIdDropdown}
                data-dropdown-field
              >
                {studentId ? (
                  <S.GenerationValue>{studentId}</S.GenerationValue>
                ) : (
                  <S.GenerationPlaceholder>학번을 선택하세요</S.GenerationPlaceholder>
                )}
                <S.DropdownIcon style={{ position: 'absolute', right: '18px' }}>
                  <svg viewBox="0 0 15 11" fill="none">
                    <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                  </svg>
                </S.DropdownIcon>
                {isStudentIdDropdownOpen && (
                  <S.IndustryDropdown data-dropdown-container>
                    {studentIds.map((id) => (
                      <S.IndustryDropdownItem
                        key={id}
                        data-dropdown-item
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectStudentId(id);
                        }}
                      >
                        {id}
                      </S.IndustryDropdownItem>
                    ))}
                  </S.IndustryDropdown>
                )}
              </S.GenerationSelectField>
            </S.FormInputWrapper>
          </S.FormField>

          {/* 전공 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">전공</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.MultiInputField>
                {majors.map((major, index) => (
                  <S.MajorInputWrapper key={major.id}>
                    <S.Input type="text" placeholder="전공을 입력하세요" />
                    {index === majors.length - 1 && (
                      <S.AddButton 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddMajor();
                        }}
                      >
                        <svg viewBox="0 0 20 20" fill="none">
                          <path d="M10 5V15M5 9.90196H15" stroke="#FFB700" strokeWidth="1.5" />
                          <circle cx="10" cy="10" r="9.5" stroke="#FFB700" />
                        </svg>
                      </S.AddButton>
                    )}
                  </S.MajorInputWrapper>
                ))}
              </S.MultiInputField>
            </S.FormInputWrapper>
          </S.FormField>
        </S.Section>

        <S.Divider />

        {/* 연락처 */}
        <S.Section>
          <S.ContactSectionTitle>연락처</S.ContactSectionTitle>

          {/* 전화번호 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">전화번호</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.Input type="tel" placeholder="전화번호를 입력하세요" />
            </S.FormInputWrapper>
          </S.FormField>

          {/* 이메일 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">이메일</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.EmailField>
                <S.EmailInput type="text" />
                <S.EmailAt>@</S.EmailAt>
                <S.EmailDomainSelectField 
                  isClickable={true}
                  onClick={handleToggleEmailDomainDropdown}
                  data-dropdown-field
                >
                  {emailDomain ? (
                    <S.GenerationValue>{emailDomain}</S.GenerationValue>
                  ) : (
                    <S.GenerationPlaceholder></S.GenerationPlaceholder>
                  )}
                  <S.DropdownIcon style={{ position: 'absolute', right: '18px' }}>
                    <svg viewBox="0 0 15 11" fill="none">
                      <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                    </svg>
                  </S.DropdownIcon>
                  {isEmailDomainDropdownOpen && (
                    <S.IndustryDropdown data-dropdown-container>
                      {emailDomains.map((domain) => (
                        <S.IndustryDropdownItem
                          key={domain}
                          data-dropdown-item
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectEmailDomain(domain);
                          }}
                        >
                          {domain}
                        </S.IndustryDropdownItem>
                      ))}
                    </S.IndustryDropdown>
                  )}
                </S.EmailDomainSelectField>
              </S.EmailField>
            </S.FormInputWrapper>
          </S.FormField>

          {/* 링크드인 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel>링크드인</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.Input type="url" placeholder="링크드인 프로필 링크를 첨부해주세요" />
            </S.FormInputWrapper>
          </S.FormField>
        </S.Section>

        <S.Divider />

        {/* 경력 사항 */}
        <S.Section>
          <S.CareerSectionTitle>경력 사항</S.CareerSectionTitle>
       

          <S.CareerList>
            {careers.map((career) => (
              <S.CareerItem key={career.id}>
                <S.CareerCard>
                  <S.CareerRow>
                    <S.CareerField>
                      
                      <S.CareerLabel>회사명</S.CareerLabel>
                      <S.RequiredDot />
                      <S.CareerInput type="text" alt="회사명" />
                    </S.CareerField>
                    <S.CareerDivider />
                    <S.CareerField 
                      isClickable={true}
                      onClick={() => handleTogglePositionDropdown(career.id)}
                      data-dropdown-field
                    >
                      <S.CareerLabel>직무 카테고리</S.CareerLabel>
                      <S.RequiredDot />
                      {career.positionCategory ? (
                        <S.CareerValue>
                          {career.positionCategory}
                        </S.CareerValue>
                      ) : (
                        <S.CareerLabel style={{ color: '#b3b3b3' }}>
                          
                        </S.CareerLabel>
                      )}
                      <S.DropdownIcon style={{ position: 'absolute', right: '18px' }}>
                        <svg viewBox="0 0 15 11" fill="none">
                          <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                        </svg>
                      </S.DropdownIcon>
                      {career.isPositionDropdownOpen && (
                        <S.IndustryDropdown data-dropdown-container>
                          {positionCategories.map((positionCategory) => (
                            <S.IndustryDropdownItem
                              key={positionCategory}
                              data-dropdown-item
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectPosition(career.id, positionCategory);
                              }}
                            >
                              {positionCategory}
                            </S.IndustryDropdownItem>
                          ))}
                        </S.IndustryDropdown>
                      )}
                    </S.CareerField>
                    <S.CareerDivider />
                    <S.CareerField>
                      <S.CareerLabel>구체적 직무명</S.CareerLabel>
                      <S.RequiredDot />
                      <S.CareerInput type="text" alt="구체적 직무명" />
                    </S.CareerField>
                  </S.CareerRow>
                  <S.CareerRow>
                    <S.CareerField 
                      isClickable={true}
                      onClick={() => handleToggleIndustryDropdown(career.id)}
                      data-dropdown-field
                    >
                      <S.CareerLabel>산업군</S.CareerLabel>
                      <S.RequiredDot />
                      {career.industry ? (
                        <S.CareerValue>
                          {career.industry}
                        </S.CareerValue>
                      ) : (
                        <S.CareerLabel style={{ color: '#b3b3b3' }}>
                        
                        </S.CareerLabel>
                      )}
                      <S.DropdownIcon style={{ position: 'absolute', right: '18px' }}>
                        <svg viewBox="0 0 15 11" fill="none">
                          <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                        </svg>
                      </S.DropdownIcon>
                      {career.isIndustryDropdownOpen && (
                        <S.IndustryDropdown data-dropdown-container>
                          {industries.map((industry) => (
                            <S.IndustryDropdownItem
                              key={industry}
                              data-dropdown-item
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectIndustry(career.id, industry);
                              }}
                            >
                              {industry}
                            </S.IndustryDropdownItem>
                          ))}
                        </S.IndustryDropdown>
                      )}
                    </S.CareerField>
                    <S.CareerDivider />
                    <S.CareerField 
                      isClickable={true}
                      onClick={() => handleToggleDatePicker(career.id)}
                      data-dropdown-field
                    >
                      <S.CareerLabel>입사년월</S.CareerLabel>
                      {career.joinYear && career.joinMonth ? (
                        <S.CareerValue>
                          {career.joinYear}년 {career.joinMonth}월
                        </S.CareerValue>
                      ) : null}
                      {career.isDatePickerOpen && (
                        <S.DatePickerPopover data-date-picker>
                          <S.DatePickerTitle>입사년월을 선택하세요</S.DatePickerTitle>
                          <S.DateSelectorWrapper>
                            <S.DateSelector data-year-selector>
                              <S.DateInput
                                placeholder="년도"
                                value={career.joinYear ? `${career.joinYear}년` : ''}
                                readOnly
                                hasValue={!!career.joinYear}
                                isDropdownOpen={!!career.isYearDropdownOpen}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleYearDropdown(career.id);
                                }}
                              />
                              <S.DropdownIcon style={{ position: 'absolute', right: '18px', pointerEvents: 'none' }}>
                                <svg viewBox="0 0 15 11" fill="none">
                                  <path d="M1 1L7.5 9L14 1" stroke="#ffb700" strokeWidth="2" />
                                </svg>
                              </S.DropdownIcon>
                              {career.isYearDropdownOpen && (
                                <S.YearDropdown data-dropdown-container>
                                  {years.map((year) => (
                                    <S.YearDropdownItem
                                      key={year}
                                      data-dropdown-item
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectYear(career.id, year);
                                      }}
                                    >
                                      {year}년
                                    </S.YearDropdownItem>
                                  ))}
                                </S.YearDropdown>
                              )}
                            </S.DateSelector>
                            <S.DateSelector data-month-selector>
                              <S.DateInput
                                placeholder="월"
                                value={career.joinMonth ? `${career.joinMonth}월` : ''}
                                readOnly
                                hasValue={!!career.joinMonth}
                                isDropdownOpen={!!career.isMonthDropdownOpen}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleMonthDropdown(career.id);
                                }}
                              />
                              <S.DropdownIcon style={{ position: 'absolute', right: '18px', pointerEvents: 'none' }}>
                                <svg viewBox="0 0 15 11" fill="none">
                                  <path d="M1 1L7.5 9L14 1" stroke="#ffb700" strokeWidth="2" />
                                </svg>
                              </S.DropdownIcon>
                              {career.isMonthDropdownOpen && (
                                <S.MonthDropdown data-dropdown-container>
                                  {months.map((month) => (
                                    <S.MonthDropdownItem
                                      key={month}
                                      data-dropdown-item
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectMonth(career.id, month);
                                      }}
                                    >
                                      {month}월
                                    </S.MonthDropdownItem>
                                  ))}
                                </S.MonthDropdown>
                              )}
                            </S.DateSelector>
                          </S.DateSelectorWrapper>
                        </S.DatePickerPopover>
                      )}
                    </S.CareerField>
                    <S.CareerDivider />
                    <S.CareerField 
                      isCurrentJob={career.isCurrentJob}
                      isClickable={!career.isCurrentJob}
                      onClick={() => !career.isCurrentJob && handleToggleLeaveDatePicker(career.id)}
                      data-dropdown-field
                    >
                      {career.isCurrentJob ? (
                        <S.CareerValue>현재 재직 중</S.CareerValue>
                      ) : (
                        <>
                          <S.CareerLabel>퇴사년월</S.CareerLabel>
                          {career.leaveYear && career.leaveMonth ? (
                            <S.CareerValue>
                              {career.leaveYear}년 {career.leaveMonth}월
                            </S.CareerValue>
                          ) : null}
                          {career.isLeaveDatePickerOpen && (
                            <S.DatePickerPopover data-date-picker>
                              <S.DatePickerTitle>퇴사년월을 선택하세요</S.DatePickerTitle>
                              <S.DateSelectorWrapper>
                                <S.DateSelector data-year-selector>
                                  <S.DateInput
                                    placeholder="년도"
                                    value={career.leaveYear ? `${career.leaveYear}년` : ''}
                                    readOnly
                                    hasValue={!!career.leaveYear}
                                    isDropdownOpen={!!career.isLeaveYearDropdownOpen}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleLeaveYearDropdown(career.id);
                                    }}
                                  />
                                  <S.DropdownIcon style={{ position: 'absolute', right: '18px', pointerEvents: 'none' }}>
                                    <svg viewBox="0 0 15 11" fill="none">
                                      <path d="M1 1L7.5 9L14 1" stroke="#ffb700" strokeWidth="2" />
                                    </svg>
                                  </S.DropdownIcon>
                                  {career.isLeaveYearDropdownOpen && (
                                    <S.YearDropdown data-dropdown-container>
                                      {years.map((year) => (
                                        <S.YearDropdownItem
                                          key={year}
                                          data-dropdown-item
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectLeaveYear(career.id, year);
                                          }}
                                        >
                                          {year}년
                                        </S.YearDropdownItem>
                                      ))}
                                    </S.YearDropdown>
                                  )}
                                </S.DateSelector>
                                <S.DateSelector data-month-selector>
                                  <S.DateInput
                                    placeholder="월"
                                    value={career.leaveMonth ? `${career.leaveMonth}월` : ''}
                                    readOnly
                                    hasValue={!!career.leaveMonth}
                                    isDropdownOpen={!!career.isLeaveMonthDropdownOpen}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleLeaveMonthDropdown(career.id);
                                    }}
                                  />
                                  <S.DropdownIcon style={{ position: 'absolute', right: '18px', pointerEvents: 'none' }}>
                                    <svg viewBox="0 0 15 11" fill="none">
                                      <path d="M1 1L7.5 9L14 1" stroke="#ffb700" strokeWidth="2" />
                                    </svg>
                                  </S.DropdownIcon>
                                  {career.isLeaveMonthDropdownOpen && (
                                    <S.MonthDropdown data-dropdown-container>
                                      {months.map((month) => (
                                        <S.MonthDropdownItem
                                          key={month}
                                          data-dropdown-item
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectLeaveMonth(career.id, month);
                                          }}
                                        >
                                          {month}월
                                        </S.MonthDropdownItem>
                                      ))}
                                    </S.MonthDropdown>
                                  )}
                                </S.DateSelector>
                              </S.DateSelectorWrapper>
                            </S.DatePickerPopover>
                          )}
                        </>
                      )}
                    </S.CareerField>
                  </S.CareerRow>
                </S.CareerCard>

                <S.CareerCheckboxes>
                  <S.CheckboxLabel onClick={() => handleTogglePrivate(career.id)}>
                    <S.CheckboxBox checked={career.isPrivate} />
                    <span>운영진에게만 공개</span>
                  </S.CheckboxLabel>
                  <S.CheckboxLabel 
                    disabled={false}
                    onClick={() => handleToggleCurrentJob(career.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <S.CheckboxBox disabled={false} checked={career.isCurrentJob} />
                    <span>재직 중</span>
                  </S.CheckboxLabel>
                </S.CareerCheckboxes>
              </S.CareerItem>
            ))}
          </S.CareerList>
        </S.Section>

        <S.ButtonWrapper>
          <S.AddCareerButton onClick={handleAddCareer}>경력 추가</S.AddCareerButton>
          <S.Divider />
          
          {/* 운영진 참고 사항 */}
          <S.AdminNotesSection>
            <S.AdminNotesSectionTitle>운영진 참고 사항</S.AdminNotesSectionTitle>
            <S.AdminNotesTextarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="내용을 입력하세요"
            />
          </S.AdminNotesSection>
          
          <S.SaveButton
            onClick={() => {
              setErrorModal({
                isOpen: true,
                message: '작성을 취소하시겠습니까?',
              });
            }}
          >
            변경사항 저장
          </S.SaveButton>
        </S.ButtonWrapper>
      </S.Container>

      {/* Message Modal */}
      <MessageModal
        isOpen={messageModal.isOpen}
        onClose={() => setMessageModal({ isOpen: false, message: '' })}
        message={messageModal.message}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: '' })}
        message={errorModal.message}
      />
    </>
  );
}
