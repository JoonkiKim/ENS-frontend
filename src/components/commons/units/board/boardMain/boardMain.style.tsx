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
  padding: 0 37px 0 37px;
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

export const HeroSection = styled.section`
  width: 100%;
  padding: 80px 0 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: url('/images/free-board-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const HeroTitle = styled.h1`
  font-size: 72px;
  font-weight: 700;
  color: #303030;
  letter-spacing: -2.16px;
  text-align: center;
  margin: 0 0 24px 0;
  filter: blur(1px);
`;

export const HeroDescription = styled.div`

  font-size: 16px;
  color: #2c2c2c;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 40px;
  
  p {
    margin: 0;
    font-weight: 300;
  }
  
  strong {
    font-weight: 600;
  }
`;

export const CategoryBox = styled.div`
width: 60%;

  background: white;
  border-radius: 8px;
  padding: 24px 32px;
//   max-width: 485px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CategoryItem = styled.p`
  font-size: 16px;
  line-height: 23px;
  margin: 0 0 8px 0;
  color: #4e4e4e;
  margin-left: 10%;
  margin-right: 10%;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    font-weight: 500;
    color: #ffb700;
  }
`;

export const BoardSection = styled.section`
  padding: 60px 50px 80px;
`;

export const TableContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 120px 1fr 150px 100px;
  gap: 20px;
  padding: 12px 35px;
//   border-top: 1px solid #d9d9d9;
//   border-bottom: 1px solid #d9d9d9;
  align-items: center;
  background-color: rgba(217, 217, 217, 0.3);
`;

export const TableHeaderCell = styled.p`
  font-size: 13px;
  color: #2C2C2C;
//   opacity: 0.75;
  letter-spacing: -0.26px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:first-of-type {
    justify-content: center;
  }
  
  &:nth-of-type(2) {
    justify-content: center;
  }
  &:nth-of-type(3) {
    justify-content: center;
  }
  
  &:nth-of-type(4),
  &:nth-of-type(5) {
    justify-content: center;
  }
`;

export const CategoryHeaderCell = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

export const CategoryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  margin-top: 4px;
  z-index: 100;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CategoryDropdownItem = styled.div`
  padding: 12px 18px;
  font-size: 13px;
  color: #2c2c2c;
  letter-spacing: -0.26px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e5e5e5;
  }
  
  &:first-of-type {
    border-radius: 3px 3px 0 0;
  }
  
  &:last-of-type {
    border-radius: 0 0 3px 3px;
  }
`;

export const SortIcon = styled.div`
  width: 8px;
  height: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scaleY(-1);
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const TableRow = styled.div<{ clickable?: boolean }>`
  display: grid;
  grid-template-columns: 60px 120px 1fr 150px 100px;
  gap: 20px;
  padding: 16px 35px;
  border-bottom: 1px solid #d9d9d9;
  align-items: center;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  transition: background 0.2s;
  
  &:hover {
    background: ${({ clickable }) => (clickable ? 'rgba(255, 183, 0, 0.05)' : 'transparent')};
  }
`;

export const TableCell = styled.p`
  font-size: 13px;
  color: rgba(44, 44, 44, 0.6);
  letter-spacing: -0.26px;
  margin: 0;
  font-weight: 500;
  
  &:first-of-type {
    text-align: center;
  }
  
  &:nth-of-type(4),
  &:nth-of-type(5) {
    text-align: center;
  }
`;

export const CategoryBadge = styled.span`
  font-weight: 600;
  color: #2c2c2c;
  text-align: center;
  display: block;
`;

export const TitleCell = styled(TableCell)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  background: transparent;
  border: none;
  font-size: 13px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? '#ffb700' : '#b3b3b3')};
  cursor: pointer;
  padding: 4px 8px;
  letter-spacing: 3.9px;
  
  &:hover {
    color: #ffb700;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const WriteButton = styled.button`
  position: absolute;
  bottom: 60px;
  right: 50px;
  padding: 12px 24px;
  background: white;
  border: 1px solid #FFB700;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #ffb700;
    color: white;
    border-color: #ffb700;
  }
`;

export const RedNote = styled.p`
  position: absolute;
  font-size: 12px;
  color: red;
  line-height: 15px;
  letter-spacing: -0.3px;
  width: 173px;
  white-space: pre-wrap;
`;
