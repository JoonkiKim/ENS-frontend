
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@apollo/client';
import * as S from './mainPage.style';

import { DisclosureButtonIcon } from '../../../commons/libraries/DisclosureButtonIcon';
import LoginModal from '../modals/loginModal';
import AgreeModal from '../modals/agreeModal';
import SignUpModal from '../modals/signUpModal';
import { accessTokenState, authCheckedState } from '../../../commons/stores';
import { FETCH_ALL_BOARDS } from '../../../commons/apis/graphql-queries';

// Global Styles




export default function Dashboard() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  
  // 로그인 상태 확인
  const accessToken = useRecoilValue(accessTokenState);
  const authChecked = useRecoilValue(authCheckedState);
  // 인증 체크가 완료되고 로그인하지 않은 경우에만 버튼 표시
  const shouldShowAuthButtons = authChecked && !accessToken;
  // 로그인된 경우에만 콘텐츠 표시
  const isLoggedIn = authChecked && !!accessToken;

  // 게시판 데이터 가져오기
  const { data: boardsData, loading: boardsLoading } = useQuery(FETCH_ALL_BOARDS, {
    skip: !isLoggedIn, // 로그인하지 않았으면 쿼리 실행 안 함
    fetchPolicy: 'cache-and-network',
  });

  // 최신 게시글 3개 가져오기 (createdAt 기준 내림차순)
  const latestBoards = boardsData?.fetchAllBoards
    ? [...boardsData.fetchAllBoards]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)
    : [];

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 카테고리 매핑
  const categoryMap: Record<string, string> = {
    'NOTICE': '학회 공지',
    'RECRUITMENT': '채용 공고',
    'ETC': '기타',
  };

  return (
    <>
 
     
      <S.Container>


        {/* Hero Section */}
        <S.Hero>
          <S.HeroContent>
            <S.HeroTitle>SNU ENS Intranet</S.HeroTitle>
            <S.HeroDescription>ENS 학회원을 위한 네트워킹을 지원합니다.</S.HeroDescription>
            {shouldShowAuthButtons && (
              <S.ButtonGroup>
                <S.Button variant="secondary" onClick={() => setIsLoginModalOpen(true)}>로그인</S.Button>
                <S.Button variant="primary" onClick={() => setIsAgreeModalOpen(true)}>회원가입</S.Button>
              </S.ButtonGroup>
            )}
          </S.HeroContent>
        </S.Hero>

        {/* Quick View Section */}
        <S.QuickViewSection>
          <S.SectionHeader>
            <S.SectionTitle>Quick View</S.SectionTitle>
            <S.SectionSubtitle>바로가기</S.SectionSubtitle>
          </S.SectionHeader>

          {isLoggedIn ? (
            <>
              <S.CardGrid>
                {/* Alumni Search Card */}
                <Link href="/findAlumni">
                  <a style={{ textDecoration: 'none', color: 'inherit', display: 'flex', height: '100%' }}>
                    <S.Card>
                      <S.BoardCardTitleWrapper>
                        <S.CardTitle>알럼나이 찾기</S.CardTitle>
                        <S.DisclosureButton>
                          <DisclosureButtonIcon />
                        </S.DisclosureButton>
                      </S.BoardCardTitleWrapper>
                      <S.AvatarBlock>
                        <S.Avatar>
                          <img
                            src="data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23E5E5E5'/%3E%3Cpath d='M24 24C27.3137 24 30 21.3137 30 18C30 14.6863 27.3137 12 24 12C20.6863 12 18 14.6863 18 18C18 21.3137 20.6863 24 24 24Z' fill='%23999'/%3E%3Cpath d='M24 27C17.3726 27 12 29.6863 12 33V36H36V33C36 29.6863 30.6274 27 24 27Z' fill='%23999'/%3E%3C/svg%3E"
                            alt="Profile"
                          />
                        </S.Avatar>
                        <S.UserInfo>
                          <S.UserName>홍길동</S.UserName>
                          <S.UserDetails>ENS 00기 · 00 재직 중</S.UserDetails>
                        </S.UserInfo>
                      </S.AvatarBlock>
                    </S.Card>
                  </a>
                </Link>

                {/* Profile Edit Card */}
                <Link href="/mypage">
                  <a style={{ textDecoration: 'none', color: 'inherit', display: 'flex', height: '100%' }}>
                    <S.Card>
                      <S.BoardCardTitleWrapper>
                        <S.CardTitle>내 정보 수정</S.CardTitle>
                        <S.DisclosureButton>
                          <DisclosureButtonIcon />
                        </S.DisclosureButton>
                      </S.BoardCardTitleWrapper>
                      <S.CardDescription>
                        개인정보 및 경력을 수정할 수 있습니다.
                      </S.CardDescription>
                    </S.Card>
                  </a>
                </Link>
              </S.CardGrid>

              {/* Board Card */}
              <Link href="/boardMain">
                <a style={{ textDecoration: 'none', color: 'inherit', display: 'flex', height: '100%' }}>
                  <S.BoardCard>
                    <S.BoardCardTitleWrapper>
                      <S.CardTitle>자유 게시판</S.CardTitle>
                      <S.DisclosureButton>
                        <DisclosureButtonIcon />
                      </S.DisclosureButton>
                    </S.BoardCardTitleWrapper>
                    <S.BoardItems>
                      {boardsLoading ? (
                        <S.EmptyStateMessage>로딩 중...</S.EmptyStateMessage>
                      ) : latestBoards.length === 0 ? (
                        <S.EmptyStateMessage>
                          등록된 게시글이 없습니다.
                        </S.EmptyStateMessage>
                      ) : (
                        latestBoards.map((board) => (
                          <S.BoardItem key={board.id}>
                            <S.BoardTitle>
                              <span className="arrow">&gt;</span>
                              [{categoryMap[board.category] || board.category}] {board.title}
                            </S.BoardTitle>
                            <S.BoardDate>{formatDate(board.createdAt)}</S.BoardDate>
                          </S.BoardItem>
                        ))
                      )}
                    </S.BoardItems>
                  </S.BoardCard>
                </a>
              </Link>
            </>
          ) : authChecked ? (
            <S.LoginRequiredMessage>
              로그인 후 이용이 가능합니다.
            </S.LoginRequiredMessage>
          ) : null}
        </S.QuickViewSection>

      </S.Container>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={(username, password, keepLoggedIn) => {
          // 로그인 처리 로직 추가 가능
          console.log('Login:', { username, password, keepLoggedIn });
        }}
        onSignUp={() => {
          // 회원가입 처리 로직 추가 가능
          console.log('Sign up clicked');
        }}
        onForgotPassword={() => {
          // 비밀번호 찾기 처리 로직 추가 가능
          console.log('Forgot password clicked');
        }}
      />

      <AgreeModal
        isOpen={isAgreeModalOpen}
        onClose={() => setIsAgreeModalOpen(false)}
        onSubmit={() => {
          // 약관 동의 완료 후 회원가입 모달 열기
          setIsAgreeModalOpen(false);
          setIsSignUpModalOpen(true);
        }}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSubmit={(formData) => {
          // 회원가입 제출 처리 로직 추가 가능
          console.log('Sign up submitted:', formData);
          setIsSignUpModalOpen(false);
        }}
      />
    </>
  );
}