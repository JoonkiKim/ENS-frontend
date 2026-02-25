
import { Global, css } from '@emotion/react';
import * as S from './mainPage.style';

// Global Styles
const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: white;
    color: #1e1e1e;
  }
`;

// SVG paths for social icons
const svgPaths = {
  instagram:
    'M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z',
  linkedin:
    'M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 6.988 20 12.241V19Z',
};

export default function MainPage() {
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
      <Global styles={globalStyles} />
      <S.Container>
        {/* Header */}
        <S.Header>
          <S.Logo>
            <S.LogoENS>ENS</S.LogoENS>
            <S.LogoIntranet>Intranet</S.LogoIntranet>
          </S.Logo>
          <S.Navigation>
            <S.NavItem href="#">알럼나이 찾기</S.NavItem>
            <S.NavItem href="#">자유 게시판</S.NavItem>
            <S.NavItem href="#">마이페이지</S.NavItem>
          </S.Navigation>
        </S.Header>

        {/* Hero Section */}
        <S.Hero>
          <S.HeroBackground>
            {/* Background pattern image - using placeholder for demonstration */}
            <img
              src="data:image/svg+xml,%3Csvg width='1600' height='1878' viewBox='0 0 1600 1878' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='800' cy='939' r='800' stroke='%23FFB700' stroke-width='2' stroke-dasharray='10 10' opacity='0.3'/%3E%3C/svg%3E"
              alt=""
            />
          </S.HeroBackground>
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
              <S.CardTitle>알럼나이 찾기</S.CardTitle>
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
              <S.CardTitle>내 정보 수정</S.CardTitle>
              <S.CardDescription>
                개인정보 및 경력을 수정할 수 있습니다.
              </S.CardDescription>
            </S.Card>
          </S.CardGrid>

          {/* Board Card */}
          <S.BoardCard>
            <S.CardTitle>자유 게시판</S.CardTitle>
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

        {/* Footer */}
        <S.Footer>
          <S.FooterContent>
            <S.FooterLeft>
              <S.FooterLogo>ENS</S.FooterLogo>
              <S.SocialIcons>
                <S.SocialIcon href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0)">
                      <path d={svgPaths.instagram} fill="currentColor" />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </S.SocialIcon>
                <S.SocialIcon href="#" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip1)">
                      <path d={svgPaths.linkedin} fill="currentColor" />
                    </g>
                    <defs>
                      <clipPath id="clip1">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </S.SocialIcon>
              </S.SocialIcons>
            </S.FooterLeft>
            <S.FooterRight>
              <S.ContactTitle>Contact Us</S.ContactTitle>
              <S.ContactInfo>
                <S.ContactText>서울대학교 문화산업 경영전략학회 ENS</S.ContactText>
                <S.ContactText>
                  회장 김재연 010-6519-5758 ㅣ E-mail. snuens@gmail.com
                </S.ContactText>
              </S.ContactInfo>
            </S.FooterRight>
          </S.FooterContent>
        </S.Footer>
      </S.Container>
    </>
  );
}
