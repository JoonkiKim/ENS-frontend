import styled from '@emotion/styled';

// Page Container
export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #ffffff;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
`;

// Sidebar
export const Sidebar = styled.aside`
  width: 200px;
  background: white;
  border-right: 1px solid #e4e4e7;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

export const Logo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #ffb700;
  padding: 0 20px 40px;
  letter-spacing: -0.36px;
`;

export const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NavItem = styled.div<{ active?: boolean }>`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? '#ffffff' : '#09090b')};
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ active }) => (active ? '#ffb700' : 'transparent')};

  
  &:hover {
    background: #f4f4f5;
    color: #09090b;
  }
`;

// Main Content
export const MainContent = styled.main`
  flex: 1;
  padding: 24px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const PageTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #09090b;
  margin: 0 0 24px 0;
  letter-spacing: -0.36px;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e4e4e7;
  margin: 0 0 24px 0;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
`;

// Filter Sidebar
export const FilterSidebar = styled.aside`
//   width: 250px;
  min-width: 180px;
  background: white;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 16px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  max-height: calc(90vh - 120px);
  overflow: hidden;
`;

export const FilterHeader = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #09090b;
  margin: 0 0 16px 0;
  letter-spacing: -0.28px;
  flex-shrink: 0;
  padding-left: 10px;
`;

export const FilterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 16px;

  /* ✅ 기본은 auto로: (Chrome에서 ::-webkit-*가 override 당하지 않게) */
  scrollbar-width: auto;
  scrollbar-color: auto;

  /* ✅ Chrome / Edge / Safari */
  &::-webkit-scrollbar {
    width: 5px;

  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e4e4e7;
    border-radius: 4px;
  }

  /* ✅ 스크롤바 위/아래 화살표(버튼) 제거 */
  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  /* ✅ Firefox에서만 얇게/색 적용 */
  @supports (-moz-appearance: none) {
    scrollbar-width: thin;
    scrollbar-color: #e4e4e7 transparent;
  }
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FilterCheckbox = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #18181b;
  border-radius: 4px;
  cursor: pointer;
  accent-color: #ffb700;
  
  &:checked {
    background: #ffb700;
    border-color: #ffb700;
  }
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: #09090b;
  cursor: pointer;
  letter-spacing: -0.28px;
`;

// Table Section
export const TableSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  min-width: 0;
`;

// Search Filter Bar
export const SearchFilterBar = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

export const SearchInput = styled.input`
  flex: 0 1 auto;
  max-width: 300px;
  height: 36px;
  padding: 4px 12px;
  background: white;
  border: 1px solid #e4e4e7;
  border-radius: 6px;
  font-size: 14px;
  color: #09090b;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  
  &::placeholder {
    color: #71717a;
  }
  
  &:focus {
    outline: none;
    border-color: #ffb700;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 6px;
`;

export const Button = styled.button<{ variant?: 'danger' }>`
  height: 36px;
  padding: 8px 16px;
  background: ${({ variant }) => (variant === 'danger' ? '#EF4444' : 'white')};
  border: 1px solid #e4e4e7;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ variant }) => (variant === 'danger' ? '#FAFAFA' : '#18181b')};
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ variant }) => (variant === 'danger' ? '#DC2626' : '#f4f4f5')};
  }
  
  &:active {
    background: ${({ variant }) => (variant === 'danger' ? '#B91C1C' : '#e4e4e7')};
  }
`;

// Table
export const TableContainer = styled.div`
  background: white;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background: #ffffff;
  border-bottom: 1px solid #e4e4e7;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e4e4e7;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #fafafa;
  }
`;

export const TableHeaderCell = styled.th<{ width?: string }>`
  padding: 6px 8px;
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  color: #71717a;
  width: ${({ width }) => width || 'auto'};
  height: 40px;
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 6px 8px;
  font-size: 14px;
  color: #09090b;
  height: 40px;
  vertical-align: middle;
`;

export const MemoCell = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 190px;
  cursor: pointer;
  position: relative;
`;

export const GradeSelectField = styled.div`
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  display: flex;
  align-items: center;
  position: relative;
  background: white;
  cursor: pointer;
  
  &:focus-within {
    border-color: #ffb700;
  }
`;

export const GradeValue = styled.span`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
`;

export const GradeDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border-radius: 3px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const GradeDropdownItem = styled.div`
  padding: 12px 18px;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
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

export const MemoInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 4px 8px;
  background: white;
  border: 1px solid #e4e4e7;
  border-radius: 6px;
  font-size: 14px;
  color: #09090b;
  font-family: inherit;
  
  &::placeholder {
    color: #71717a;
  }
  
  &:focus {
    outline: none;
    border-color: #ffb700;
  }
`;

export const MemoModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: transparent;
  z-index: 2000;
  pointer-events: auto;
`;

export const MemoModalContainer = styled.div<{ top: number; left: number }>`
  background: white;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  width: 300px;
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  flex-direction: column;

  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  pointer-events: auto;
`;

export const MemoModalCloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 1px;
    background: #71717a;
    border-radius: 1px;
  }
  
  &::before {
    transform: rotate(45deg);
  }
  
  &::after {
    transform: rotate(-45deg);
  }
`;

export const MemoModalContent = styled.div`
  padding: 20px;
  overflow-y: auto;
  font-size: 14px;
  color: #09090b;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const TableCheckbox = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #18181b;
  border-radius: 4px;
  cursor: pointer;
  accent-color: #ffb700;
  
  &:checked {
    background: #ffb700;
    border-color: #ffb700;
  }
`;

export const EditButton = styled.button`
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;
  
  &:hover {
    background: #f4f4f5;
  }
  
  svg {
    display: block;
  }
`;

// Pagination
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`;

export const PaginationInfo = styled.div`
  font-size: 14px;
  color: #71717a;
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #09090b;
`;

export const Select = styled.select`
  height: 32px;
  padding: 4px 8px;
  background: white;
  border: 1px solid #e4e4e7;
  border-radius: 6px;
  font-size: 14px;
  color: #09090b;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #ffb700;
  }
`;

export const PageInfo = styled.div`
  font-size: 14px;
  color: #09090b;
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: 4px;
`;

export const PaginationButton = styled.button`
  width: 32px;
  height: 32px;
  background: white;
  border: 1px solid #e4e4e7;
  border-radius: 6px;
  font-size: 16px;
  color: #09090b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #f4f4f5;
  }
  
  &:disabled {
    color: #d4d4d8;
    cursor: not-allowed;
  }
`;