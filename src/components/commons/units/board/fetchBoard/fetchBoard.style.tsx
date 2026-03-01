import styled from '@emotion/styled';

export const Container = styled.div`
  width: 1200px;
  min-height: 100vh;
  background: white;
  margin: 0 auto;
  position: relative;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
`;

export const Header = styled.header`
  width: 100%;
  height: 89px;
  background: white;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 37px;
  position: relative;
`;

export const Logo = styled.div`
  width: 183px;
  height: 60px;
  display: flex;
  align-items: center;
  
  span {
    font-size: 36px;
    font-weight: 700;
    color: #ffb700;
    letter-spacing: -1.08px;
  }
  
  span:last-child {
    font-size: 24px;
    font-weight: 400;
    color: #b3b3b3;
    margin-left: 8px;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const NavItem = styled.button`
  padding: 8px;
  border-radius: 8px;
  background: transparent;
  border: none;
  font-size: 16px;
  color: #1e1e1e;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  width: 63%;
  margin: 0 auto;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: #d9d9d9;
  }
`;

export const BreadcrumbItem = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.34px;
  margin: 0;
  text-align: center;
`;

export const BreadcrumbSeparator = styled.div`
  width: 1px;
  height: 19px;
  background: #d9d9d9;
`;

export const ContentSection = styled.section`
  padding: 40px 0 80px;
  width: 63%;
  margin: 0 auto;
`;

export const PostHeader = styled.div`

display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
`;
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;


export const CategoryBadge = styled.span`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  color: #ffb700;
  letter-spacing: -0.4px;
  margin: 0;
  flex-shrink: 0;
`;

export const PostTitle = styled.h1`
  font-size: 15px;
  font-weight: 500;
  color: rgba(44, 44, 44, 0.8);
  letter-spacing: -0.3px;
  margin: 0;
  line-height: 1.4;
  flex: 1;
`;

export const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`;

export const PostDate = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: rgba(44, 44, 44, 0.6);
  letter-spacing: -0.3px;
  margin: 0;
`;

export const PostAuthor = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: rgba(44, 44, 44, 0.6);
  letter-spacing: -0.3px;
  margin: 0;
`;

export const PostBody = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: rgba(44, 44, 44, 0.6);
  letter-spacing: -0.3px;
  line-height: 1.2;
  margin-bottom: 32px;
  white-space: pre-wrap;
  
  p {
    margin: 0 0 12px 0;
  }
  
  a {
    color: rgba(63, 72, 255, 0.6);
    text-decoration: underline;
    
    &:hover {
      color: rgba(63, 72, 255, 0.8);
    }
  }
`;

export const PostImage = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 32px 0;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

export const BackButton = styled.a`
  display: inline-block;
  margin-top: 40px;
  padding: 12px 24px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    background: #ffb700;
    color: white;
    border-color: #ffb700;
  }
`;
