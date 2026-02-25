import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  font-family: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: 100vh;
`;

// Header Styles
export const Header = styled.header`
  background-color: white;
  height: 89px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;

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
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoENS = styled.span`
  color: #ffb700;
`;

export const LogoIntranet = styled.span`
  color: #757575;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
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

// Hero Section Styles
export const Hero = styled.section`
  position: relative;
  height: 586px;
  background: linear-gradient(90deg, rgba(255, 183, 0, 0) 0%, rgba(255, 183, 0, 0.8) 100%),
    linear-gradient(90deg, rgb(245, 245, 245) 0%, rgb(245, 245, 245) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.15;
  overflow: hidden;
  pointer-events: none;

  img {
    position: absolute;
    height: 321.24%;
    left: -31.5%;
    max-width: none;
    top: -85.09%;
    width: 133.58%;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const HeroTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 72px;
  font-weight: 700;
  color: #303030;
  letter-spacing: -2.16px;
  line-height: 1.2;
  text-align: center;
  filter: blur(0.5px);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

export const HeroDescription = styled.p`
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 16px;
  color: rgba(30, 30, 30, 0.7);
  text-align: center;
  line-height: 1.4;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 20px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  min-width: 112px;

  ${({ variant }) =>
    variant === 'primary'
      ? `
    background: #2c2c2c;
    color: #f5f5f5;
    &:hover {
      background: #1a1a1a;
    }
  `
      : `
    background: rgba(245, 245, 245, 0.6);
    color: #1e1e1e;
    &:hover {
      background: rgba(245, 245, 245, 0.8);
    }
  `}
`;

// Quick View Section Styles
export const QuickViewSection = styled.section`
  background: white;
  padding: 64px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 28px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1e1e1e;
  letter-spacing: -0.48px;
  line-height: 1.2;
  margin: 0;
`;

export const SectionSubtitle = styled.p`
  font-size: 20px;
  color: #757575;
  line-height: 1.2;
  margin: 0;
`;

export const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const Card = styled.div`
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 24px;
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #1e1e1e;
  letter-spacing: -0.48px;
  line-height: 1.2;
  margin: 0;
`;

export const AvatarBlock = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #757575;
  line-height: 1.4;
`;

export const UserDetails = styled.div`
  font-size: 16px;
  color: #b3b3b3;
  line-height: 1.4;
`;

export const CardDescription = styled.p`
  font-size: 16px;
  color: #b3b3b3;
  line-height: 1.4;
  margin: 0;
`;

// Board Card Styles
export const BoardCard = styled(Card)`
  min-width: 100%;
  position: relative;
  min-height: 193px;
`;

export const BoardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 12px;

  &:first-of-type {
    margin-top: 0;
  }
`;

export const BoardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #757575;
  line-height: 1.4;
  flex: 1;

  span.arrow {
    font-weight: 800;
    color: #ffb700;
    margin-right: 8px;
  }
`;

export const BoardDate = styled.div`
  font-size: 16px;
  color: #b3b3b3;
  line-height: 1.4;
  white-space: nowrap;
`;

export const BoardItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Footer Styles
export const Footer = styled.footer`
  background: white;
  border-top: 1px solid #d9d9d9;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  gap: 48px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`;

export const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 240px;
`;

export const FooterLogo = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #ffb700;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
`;

export const SocialIcon = styled.a`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e1e1e;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContactTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1e1e1e;
  margin: 0 0 16px 0;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContactText = styled.p`
  font-size: 16px;
  color: #1e1e1e;
  line-height: 1.4;
  margin: 0;
`;

// Arrow Button Styles
export const ArrowButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.85);
  transform: rotate(-90deg);

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
