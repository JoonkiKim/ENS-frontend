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

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e5e5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

// User Info
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const UserName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.32px;
`;

// Form Fields
export const FormRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const CategoryFieldWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 180px;
`;

export const CategoryField = styled.div`
  width: 100%;
  padding: 12px 16px;
  border-bottom: 1px solid #d9d9d9;

  background: white;
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-color 0.2s;
  
  &:hover {
    border-color: #ffb700;
  }
`;

export const DropdownArrow = styled.div`
  width: 6px;
  height: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CategoryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
  
  /* 커스텀 스크롤바 */
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 transparent;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

export const CategoryDropdownItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:first-child {
    border-radius: 4px 4px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 4px 4px;
  }
`;

export const TitleInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  outline: none;
  transition: border-bottom-color 0.2s;
  
  &::placeholder {
    color: #b3b3b3;
  }
  
  &:focus {
    border-bottom-color: #ffb700;
  }
`;

// Rich Text Editor
export const EditorWrapper = styled.div`
  margin-bottom: 24px;
  
  /* 툴바 스타일 */
  .ql-toolbar {
    border: 1px solid #d9d9d9;
    border-radius: 4px 4px 0 0;
    background: #4C4C4C;
    padding: 8px;
    color: #ffffff;
  }
  
  /* 툴바 버튼 스타일 */
  .ql-toolbar .ql-stroke {
    stroke: #ffffff;
  }
  
  .ql-toolbar .ql-fill {
    fill: #ffffff;
  }
  
  .ql-toolbar button:hover,
  .ql-toolbar button.ql-active {
    background: #ffffff;
  }
  
  /* 활성화된 버튼의 아이콘 색상 */
  .ql-toolbar button.ql-active .ql-stroke {
    stroke: #2c2c2c;
  }
  
  .ql-toolbar button.ql-active .ql-fill {
    fill: #2c2c2c;
  }
  
  /* focus된 버튼의 아이콘 색상 */
  .ql-toolbar button:focus .ql-stroke {
    stroke: #2c2c2c;
  }
  
  .ql-toolbar button:focus .ql-fill {
    fill: #2c2c2c;
  }
  
  .ql-toolbar button:focus {
    background: #ffffff;
    outline: none;
  }
  
  /* 드롭다운 메뉴 (Normal, Heading 1 등) 스타일 */
  .ql-picker-label {
    color: #ffffff; /* 드롭다운 버튼 텍스트 색상 */
  }
  
  .ql-picker-label:hover {
    color: #ffffff;
  }
  
  /* 드롭다운 버튼이 활성화되었을 때 배경색 */
  .ql-picker.ql-expanded .ql-picker-label,
  .ql-picker-label.ql-active {
    background: #ffffff;
    color: #2c2c2c; /* 배경이 흰색이므로 텍스트는 어두운 색으로 */
  }
  
  /* 드롭다운 화살표 색상 */
  .ql-picker-label svg {
    stroke: #ffffff;
  }
  
  /* 활성화된 드롭다운 버튼의 화살표 색상 */
  .ql-picker.ql-expanded .ql-picker-label svg,
  .ql-picker-label.ql-active svg {
    stroke: #2c2c2c;
  }
  
  /* 드롭다운 메뉴 옵션들 스타일 */
  .ql-picker-options {
    background: #ffffff; /* 드롭다운 배경색 */
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .ql-picker-item {
    color: #2c2c2c; /* 옵션 텍스트 색상 (Normal, Heading 1 등) */
  }
  
  .ql-picker-item:hover {
    background: #f5f5f5;
    color: #2c2c2c;
  }
  
  .ql-picker-item.ql-selected {
    background: #ffb700;
    color: #ffffff;
  }
  
  /* 컨테이너 스타일 */
  .ql-container {
    border: none;
    border-top: none;
    font-size: 15px;
    font-weight: 500;
    color: #2c2c2c;
    min-height: 400px;
  }
  
  /* 에디터 영역 스타일 */
  .ql-editor {
    min-height: 400px;
    padding: 16px;
    
    &::before {
      color: #b3b3b3;
      font-style: normal;
    }
    
    &.ql-blank::before {
      content: '내용을 입력해주세요';
    }
  }
`;

export const EditorToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;

  background: #4C4C4C;
  flex-wrap: wrap;
`;

export const ToolbarButton = styled.button`
color: #ffffff;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 0;
  
  &:hover {
    background-color: #e5e5e5;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  strong, em, u {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
  }
  
  em {
    font-style: italic;
    font-weight: 500;
  }
  
  u {
    text-decoration: underline;
    font-weight: 500;
  }
`;

export const ToolbarDivider = styled.div`
  width: 1px;
  height: 20px;
  background: #ffffff;
  margin: 0 4px;
`;

export const QuillWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  
  /* react-quill 기본 툴바 숨기기 */
  .ql-toolbar {
    display: none;
  }
  
  /* react-quill 에디터 영역 스타일 */
  .ql-container {
    border: none;
    border-top: none;
    font-size: 14px;
    font-weight: 500;
    color: #2c2c2c;
    font-family: inherit;
    min-height: 400px;
  }
  
  .ql-editor {
    min-height: 400px;
    padding: 16px;
    
    &::before {
      color: #b3b3b3;
      font-style: normal;
    }
    
    &.ql-blank::before {
      content: '내용을 입력해주세요';
    }
  }
  
  /* react-quill 포커스 스타일 제거 */
  .ql-container.ql-snow {
    border: none;
  }
`;

// Action Buttons
export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;  
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #B3B3B3;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f5f5f5;
    border-color: #b3b3b3;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 24px;
  background: #ffb700;
  border: 1px solid #ffb700;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #e6a500;
    border-color: #e6a500;
  }
`;
