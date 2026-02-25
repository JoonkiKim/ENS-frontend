import styled from "@emotion/styled";
import Link from "next/link";

// ─── 공통 레이아웃 헤더 (ENS Intranet 스타일) ─────────────────────────────

const HeaderBackground = styled.header`
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #d9d9d9;
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  height: 89px;
  margin: 0 auto;
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: "Inter", "Noto Sans KR", -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 16px 20px;
    gap: 12px;
  }
`;

const Logo = styled.a`
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
`;

const LogoENS = styled.span`
  color: #ffb700;
`;

const LogoIntranet = styled.span`
  color: #ffb700;
  font-weight: 300;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const NavItem = styled.a`
  padding: 8px 12px;
  font-size: 16px;
  color: #1e1e1e;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function LayoutHeader(): JSX.Element {
  return (
    <HeaderBackground>
      <HeaderInner>
        <Link href="/" passHref>
          <Logo>
            <LogoENS>ENS</LogoENS> <LogoIntranet>Intranet</LogoIntranet>
          </Logo>
        </Link>

        <Navigation>
          <Link href="/findAlumni" passHref>
            <NavItem>알럼나이 찾기</NavItem>
          </Link>
          <Link href="#" passHref>
            <NavItem>자유 게시판</NavItem>
          </Link>
          <Link href="/mypage" passHref>
            <NavItem>마이페이지</NavItem>
          </Link>
        </Navigation>
      </HeaderInner>
    </HeaderBackground>
  );
}
