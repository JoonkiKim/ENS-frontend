import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  font-family: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

// Header Styles
export const Header = styled.header`
  position: relative;
  height: 89px;
  background-color: white;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 20px;
    gap: 15px;
  }
`;

export const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const LogoENS = styled.span`
  color: #ffb700;
`;

export const LogoIntranet = styled.span`
  color: #2c2c2c;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
`;

export const NavItem = styled.a`
  padding: 8px;
  font-size: 16px;
  color: #1e1e1e;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

// Hero Styles
export const Hero = styled.section`
  position: relative;
  height: 586px;
  background-image: url('/images/findalumni-background-real.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const BlurCircle = styled.div<{ variant?: 'blur-1' | 'blur-2' | 'blur-3' }>`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  filter: blur(100px);
  pointer-events: none;

  ${({ variant }) => {
    switch (variant) {
      case 'blur-1':
        return `
          width: 225px;
          height: 220px;
          top: 104px;
          right: 87px;
        `;
      case 'blur-2':
        return `
          width: 131px;
          height: 126px;
          top: 261px;
          right: 31px;
        `;
      case 'blur-3':
        return `
          width: 433px;
          height: 302px;
          bottom: 37px;
          right: -70px;
        `;
      default:
        return '';
    }
  }}
`;

export const HeroTitle = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 72px;
  font-weight: 700;
  color: #303030;
  letter-spacing: -2.16px;
  line-height: 1.2;
  text-align: center;
  filter: blur(0.5px);
  margin-bottom: 4vh;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

export const HeroDescription = styled.p`
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  color: black;
  text-align: center;
  line-height: 1.4;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  margin-bottom: 4vh;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 20px;
  }
`;

// Search Section Styles
export const SearchSection = styled.section`

width: 80%;
  position: relative;
  // padding: 90px 50px 60px;
  background: transparent;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  max-width: 956px;
  margin: 0 auto;
  background: white;
  border-radius: 27px;
  padding: 40px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
`;

export const SearchLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 12px;
  margin-bottom: 25px;
`;

export const SearchLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: black;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

export const SearchHelper = styled.p`
  font-size: 13px;
  color: #2c2c2c;
  letter-spacing: -0.26px;
  margin: 0;
`;

export const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 69px;
  background: white;
  border: 1px solid rgba(117, 117, 117, 0.5);
  border-radius: 100px;
  padding: 0 10px 0 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 20px;
    gap: 15px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #2c2c2c;
  letter-spacing: -0.32px;
  background: transparent;

  &::placeholder {
    color: #b3b3b3;
  }
`;

export const SearchDivider = styled.div`
  width: 1px;
  height: 38px;
  background: #b3b3b3;
  margin: 0 15px;

  @media (max-width: 768px) {
    width: 100%;
    height: 1px;
    margin: 10px 0;
  }
`;

export const SearchFilter = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

export const FilterLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const FilterTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.32px;
`;

export const FilterSubtitle = styled.div`
  font-size: 13px;
  color: #b3b3b3;
  letter-spacing: -0.26px;
`;

export const SearchButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #2c2c2c;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #1a1a1a;
  }
`;

export const SearchIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

// Results Section Styles
export const ResultsSection = styled.section`
  margin-top: 5vh;
  padding: 0 50px 100px;
  background: white;

  @media (max-width: 768px) {
    padding: 0 20px 60px;
  }
`;

export const ResultsCount = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #2c2c2c;
  margin-bottom: 20px;
  letter-spacing: -0.26px;
`;

export const CountNumber = styled.span`
  font-weight: 700;
  color: #ffb700;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 70px 140px 180px 200px 120px 140px 100px;
  gap: 10px;
  padding: 15px 0;
  background: rgba(217, 217, 217, 0.2);
  font-size: 13px;
  color: rgba(44, 44, 44, 0.75);
  letter-spacing: -0.26px;
  border-bottom: 1px solid #d9d9d9;

  & > div {
    text-align: center;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: left;
    gap: 5px;

    & > div {
      text-align: left;
      padding: 5px 0;
    }
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 70px 140px 180px 200px 120px 140px 100px;
  gap: 10px;
  padding: 18px 0;
  font-size: 13px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.26px;
  border-bottom: 1px solid #d9d9d9;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fafafa;
  }

  & > div {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: left;
    gap: 5px;

    & > div {
      text-align: left;
      justify-content: flex-start;
      padding: 5px 0;
    }
  }
`;

export const TableCell = styled.div``;

export const EmailLink = styled.a`
  color: #2c2c2c;
  text-decoration: underline;

  &:hover {
    color: #000;
  }
`;

export const ProfileLink = styled.a`
  color: #ffb700;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #cc9200;
  }
`;

// Pagination Styles
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 60px;
  font-size: 13px;
  letter-spacing: 3.9px;
`;

export const PageNav = styled.span`
  color: #b3b3b3;
  cursor: pointer;
`;

export const PageNumber = styled.span<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#ffb700' : '#b3b3b3')};
  font-weight: ${({ active }) => (active ? '600' : 'normal')};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #2c2c2c;
  }
`;

// Footer Styles
export const Footer = styled.footer`
  background: white;
  border-top: 1px solid #e5e5e5;
  padding: 40px 50px;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

export const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FooterLogo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ffb700;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
`;

export const SocialIcon = styled.a`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const FooterRight = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

export const ContactTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const ContactInfo = styled.div``;

export const ContactName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  color: #666;
`;
