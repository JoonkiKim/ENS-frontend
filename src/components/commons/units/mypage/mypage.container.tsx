import React, { useState } from 'react';
import { Global, css } from '@emotion/react';
import * as S from './mypage.style';
import Head from 'next/head';


export default function MyPage() {
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

  // 경력 항목 상태 관리
  const [careers, setCareers] = useState([

  ]);

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
      },
    ]);
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
              <S.SelectWrapper>
                <S.Select>
                  <option value="">기수를 선택하세요</option>
                  <option value="39">39기</option>
                  <option value="40">40기</option>
                </S.Select>
                <S.DropdownIcon>
                  <svg viewBox="0 0 15 11" fill="none">
                    <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                  </svg>
                </S.DropdownIcon>
              </S.SelectWrapper>
            </S.FormInputWrapper>
          </S.FormField>

          {/* 학번 */}
          <S.FormField>
            <S.FormLabelWrapper>
              <S.FormLabel className="required">학번</S.FormLabel>
            </S.FormLabelWrapper>
            <S.FormInputWrapper>
              <S.SelectWrapper>
                <S.Select>
                  <option value="">학번을 선택하세요</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                </S.Select>
                <S.DropdownIcon>
                  <svg viewBox="0 0 15 11" fill="none">
                    <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                  </svg>
                </S.DropdownIcon>
              </S.SelectWrapper>
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
          <S.SectionTitle>연락처</S.SectionTitle>

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
                <S.SelectWrapper style={{ width: '199px' }}>
                <S.EmailDomain as="select">
  <option value="" disabled selected hidden></option>
  <option value="gmail.com">gmail.com</option>
  <option value="naver.com">naver.com</option>
</S.EmailDomain>
                  <S.DropdownIcon id="email-dropdown-icon">
                    <svg viewBox="0 0 15 11" fill="none">
                      <path d="M1 1L7.5 9L14 1" stroke="#ffb700" strokeWidth="2" />
                    </svg>
                  </S.DropdownIcon>
                </S.SelectWrapper>
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
                    </S.CareerField>
                    <S.CareerDivider />
                    <S.CareerField>
                      <S.CareerLabel>직무 카테고리</S.CareerLabel>
                      <S.RequiredDot />
                      <S.DropdownIcon style={{ position: 'absolute', right: '18px' }}>
                        <svg viewBox="0 0 15 11" fill="none">
                          <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                        </svg>
                      </S.DropdownIcon>
                    </S.CareerField>
                    <S.CareerDivider />
                    <S.CareerField>
                      <S.CareerLabel>구체적 직무명</S.CareerLabel>
                      <S.RequiredDot />
                    </S.CareerField>
                  </S.CareerRow>
                  <S.CareerRow>
                    <S.CareerField>
                      <S.CareerLabel>산업군</S.CareerLabel>
                      <S.RequiredDot />
                      <S.DropdownIcon style={{ position: 'absolute', right: '18px' }}>
                        <svg viewBox="0 0 15 11" fill="none">
                          <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                        </svg>
                      </S.DropdownIcon>
                    </S.CareerField>
                    <S.CareerDivider />
                    <S.CareerField>
                      <S.CareerLabel>입사년월</S.CareerLabel>
                    </S.CareerField>
                    <S.CareerDivider />
                    <S.CareerField isCurrentJob={career.isCurrentJob}>
                      {career.isCurrentJob ? (
                        <S.CareerValue>현재 재직 중</S.CareerValue>
                      ) : (
                        <S.CareerLabel>퇴사년월</S.CareerLabel>
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
          <S.SaveButton>변경사항 저장</S.SaveButton>
        </S.ButtonWrapper>
      </S.Container>
    </>
  );
}
