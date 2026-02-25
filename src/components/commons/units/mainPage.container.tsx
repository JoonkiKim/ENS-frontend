
import Head from 'next/head';
import * as S from './mainPage.style';

import { DisclosureButtonIcon } from '../../../commons/libraries/DisclosureButtonIcon';

// Global Styles




export default function Dashboard() {
  const boardItems = [
    {
      title: '[채용 공고] 네이버웹툰에서 채용 연계형 인턴을 모집합니다',
      date: '2026.02.05',
    },
    {
      title: '[기타] 39기 최현준 결혼합니다. 장소: 서울대호암교수회관...',
      date: '2026.01.27',
    },
    {
      title: '[채용 공고] 법무법인 태평양에서 방학 기간 알바 구인합니다',
      date: '2026.01.24',
    },
  ];

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/images/log-in-bg.png"
          as="image"
        />
      </Head>
     
      <S.Container>


        {/* Hero Section */}
        <S.Hero>
          <S.HeroContent>
            <S.HeroTitle>SNU ENS Intranet</S.HeroTitle>
            <S.HeroDescription>ENS 학회원을 위한 네트워킹을 지원합니다.</S.HeroDescription>
            <S.ButtonGroup>
              <S.Button variant="secondary">로그인</S.Button>
              <S.Button variant="primary">회원가입</S.Button>
            </S.ButtonGroup>
          </S.HeroContent>
        </S.Hero>

        {/* Quick View Section */}
        <S.QuickViewSection>
          <S.SectionHeader>
            <S.SectionTitle>Quick View</S.SectionTitle>
            <S.SectionSubtitle>바로가기</S.SectionSubtitle>
          </S.SectionHeader>

          <S.CardGrid>
            {/* Alumni Search Card */}
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

            {/* Profile Edit Card */}
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
          </S.CardGrid>

          {/* Board Card */}
          <S.BoardCard>
            <S.BoardCardTitleWrapper>
              <S.CardTitle>자유 게시판</S.CardTitle>
              <S.DisclosureButton>
                <DisclosureButtonIcon />
              </S.DisclosureButton>
            </S.BoardCardTitleWrapper>
            <S.BoardItems>
              {boardItems.map((item, index) => (
                <S.BoardItem key={index}>
                  <S.BoardTitle>
                    <span className="arrow">&gt;</span>
                    {item.title}
                  </S.BoardTitle>
                  <S.BoardDate>{item.date}</S.BoardDate>
            
                </S.BoardItem>
              ))}
            </S.BoardItems>
          </S.BoardCard>
        </S.QuickViewSection>

      </S.Container>
    </>
  );
}