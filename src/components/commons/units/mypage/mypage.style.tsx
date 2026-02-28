import styled from '@emotion/styled';

export const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 80px;
  background-color: white;
  font-family: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

// Header
export const Header = styled.header`
  height: 89px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 37px;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
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

// Hero
export const Hero = styled.div`
  height: 185px;
  background-image: url('/images/mypage-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0 53px;
`;

export const HeroTitle = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 35px;
  font-weight: 800;
  color: white;
  margin-bottom: 35px;
`;

// Section
export const Section = styled.section`
  padding: 40px 53px;
`;

export const AdminNotesSection = styled.section`
  width: 100%;
  padding: 40px 53px;
  box-sizing: border-box;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 35px;
`;

export const SectionTitle = styled.h2`
  font-size: 27px;
  font-weight: 600;
  color: black;
  margin-right: 20px;


`;

export const ContactSectionTitle = styled(SectionTitle)`
  margin-bottom: 25px;
`;

export const CareerSectionTitle = styled.h2`
  font-size: 27px;
  font-weight: 600;
  color: black;
  margin-bottom: 20px;

`;

export const AdminNotesSectionTitle = styled.h2`
  font-size: 27px;
  font-weight: 600;
  color: black;
  margin-bottom: 20px;
`;

export const AdminNotesTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 18px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  outline: none;
  background: white;
  font-family: inherit;
  resize: vertical;
  
  &::placeholder {
    color: #b3b3b3;
  }
  
  &:focus {
    border-color: #ffb700;
  }
`;

export const RequiredNote = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.26px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: '';
    width: 4px;
    height: 4px;
    background: #ffb700;
    border-radius: 50%;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 3px;
  background: #d9d9d9;
  margin: 40px 0;
`;

// Profile Section
export const ProfileSection = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 50px;
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
`;

export const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #999;
    position: absolute;
    top: 20px;
  }
  
  &::after {
    content: '';
    width: 80px;
    height: 60px;
    border-radius: 50% 50% 0 0;
    background: #999;
    position: absolute;
    bottom: 0;
  }
`;

export const CameraButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: white;
  border: 0.5px solid rgba(217, 217, 217, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  svg {
    width: 15px;
    height: 15px;
    opacity: 0.4;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 10px;
`;

export const StatusLabel = styled.p`
  font-size: 12px;
  color: #2c2c2c;
  letter-spacing: -0.24px;
  margin: 0;
`;

export const StatusBadges = styled.div`
  display: flex;
  gap: 12px;
`;

export const StatusBadge = styled.button<{ active?: boolean }>`
  padding: 6px 16px;
  border-radius: 12px;
  border: 1px solid ${({ active }) => (active ? '#ffb700' : '#e5e5e5')};
  background: ${({ active }) => (active ? '#fff8e5' : 'white')};
  font-size: 13px;
  color: ${({ active }) => (active ? '#ffb700' : '#b3b3b3')};
  letter-spacing: -0.26px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #ffb700;
  }
`;

// Form Field
export const FormField = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 35px;
`;

export const FormLabelWrapper = styled.div`
  min-width: 167px;
  display: flex;
  align-items: flex-start;
  padding-top: 15px;
`;

export const FormLabel = styled.label`
  font-size: 20px;
  font-weight: 600;
  color: black;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &.required::after {
    content: '';
    width: 4px;
    height: 4px;
    background: #ffb700;
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

export const FormInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.input<{ active?: boolean }>`
  width: 413px;
  height: 51px;
  padding: 0 18px;
  border: 1px solid ${({ active }) => (active ? '#ffb700' : '#d9d9d9')};
  border-radius: 3px;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  outline: none;
  background: white;
  
  &::placeholder {
    color: #b3b3b3;
  }
  
  &:focus {
    border-color: #ffb700;
  }
  
  &:disabled {
    background: #f5f5f5;
  }
`;

export const InputHelper = styled.p`
  font-size: 11px;
  color: #b3b3b3;
  letter-spacing: -0.22px;
  margin: 8px 0 0 0;
`;

// Email Field
export const EmailField = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const EmailInput = styled(Input)`
  width: 169px;
`;

export const EmailAt = styled.span`
  font-size: 14px;
  color: #b3b3b3;
  letter-spacing: -0.28px;
`;

export const EmailDomain = styled(Input)`
  width: 199px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;
  
  /* IE에서 화살표 제거 */
  &::-ms-expand {
    display: none;
  }
`;
export const SelectWrapper = styled.div`
  position: relative;
  width: 413px;
`;

export const Select = styled.select`
  width: 100%;
  height: 51px;
  padding: 0 18px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  outline: none;
  background: white;
  appearance: none;
  cursor: pointer;
  
  &::placeholder {
    color: #b3b3b3;
  }
  
  option {
    color: #2c2c2c;
  }
`;

export const DropdownIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 11px;
  pointer-events: none;
  
  svg {
    width: 70%;
    height: 70%;
  }
     path {
    stroke: #ffb700 !important;
     stroke-width: 4;
  }
`;

// Multiple Input Field
export const MultiInputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MajorInputWrapper = styled.div`
  width: auto; /* 또는 441px (413px + 20px + 8px gap) */
  display: flex;
  align-items: center;
  gap: 8px;
  
  input {
    width: 413px; /* flex: 1 제거하고 고정 width */
    flex-shrink: 0; /* 줄어들지 않도록 */
  }
`;

export const AddButton = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  
  svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

// Career Section
export const CareerNote = styled.p`
  font-size: 14px;
  color: black;
  line-height: 3;
  letter-spacing: -0.28px;
  margin: 0 0 30px 0;
`;

export const CareerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const CareerItem = styled.div`
  display: flex;
  gap: 50px;
`;

export const CareerCard = styled.div`
  width: 842px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background: white;
`;

export const CareerRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr;
  height: 51px;
  
  &:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
`;

export const CareerRowSpan = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 2fr;
  height: 51px;
  
  &:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
`;

export const CareerField = styled.div<{ isCurrentJob?: boolean; isClickable?: boolean }>`
  padding: 0 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  min-width: 0;
  background-color: ${({ isCurrentJob }) => 
    isCurrentJob ? 'rgba(217, 217, 217, 0.33)' : 'transparent'};
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
`;

export const GenerationSelectField = styled.div<{ isClickable?: boolean }>`
  width: 413px;
  height: 51px;
  padding: 0 18px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  display: flex;
  align-items: center;
  position: relative;
  background: white;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  
  &:focus-within {
    border-color: #ffb700;
  }
`;

export const EmailDomainSelectField = styled.div<{ isClickable?: boolean }>`
  width: 199px;
  height: 51px;
  padding: 0 18px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  display: flex;
  align-items: center;
  position: relative;
  background: white;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  
  &:focus-within {
    border-color: #ffb700;
  }
`;

export const GenerationValue = styled.span`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
`;

export const GenerationPlaceholder = styled.span`
  font-size: 14px;
  color: #b3b3b3;
  letter-spacing: -0.28px;
`;

export const CareerDivider = styled.div`
  width: 1px;
  background: #d9d9d9;
`;

export const CareerLabel = styled.span`
  font-size: 14px;
  color: #b3b3b3;
  letter-spacing: -0.28px;
  white-space: nowrap;
  flex-shrink: 0;
`;



export const CareerValue = styled.span`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  opacity: 0.77;
`;

export const CareerInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  padding: 0;
  
  &::placeholder {
    color: #b3b3b3;
  }
  
  &:focus {
    outline: none;
  }
`;

export const SpecificPositionLabel = styled(CareerLabel)`
  width: 80px; /* 원하는 width로 변경 */
  flex: none;
`;

export const CareerFieldContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const IndustryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border-radius: 3px;
  margin-top: 4px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const IndustryDropdownItem = styled.div`
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

// Date Picker Styles
export const DatePickerPopover = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  background: white;
  border-radius: 3px;
  margin-top: 4px;
  padding: 20px;
  z-index: 100;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

export const DatePickerTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  margin-bottom: 16px;
`;

export const DateSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DateSelector = styled.div`
  position: relative;
  width: 100%;
`;

export const DateInput = styled.input<{ hasValue?: boolean; isDropdownOpen?: boolean }>`
  width: 100%;
  height: 51px;
  padding: 0 18px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background: ${({ hasValue, isDropdownOpen }) => 
    (hasValue || isDropdownOpen)
      ? 'rgba(255, 208, 0, 0.07)' // #FFD000 with 7% opacity
      : '#ffffff'};
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  
  &::placeholder {
    color: #b3b3b3;
  }
  
  &:focus {
    outline: none;
    border-color: #ffb700;
  }
`;

export const YearDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 3px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 101;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #d9d9d9;
`;

export const YearDropdownItem = styled.div`
  padding: 12px 18px;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:first-of-type {
    border-radius: 3px 3px 0 0;
  }
  
  &:last-of-type {
    border-radius: 0 0 3px 3px;
  }
`;

export const MonthDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 3px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 101;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #d9d9d9;
`;

export const MonthDropdownItem = styled.div`
  padding: 12px 18px;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:first-of-type {
    border-radius: 3px 3px 0 0;
  }
  
  &:last-of-type {
    border-radius: 0 0 3px 3px;
  }
`;

export const CareerFieldWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const DateErrorText = styled.div`
  font-size: 12px;
  color: #ff0000;
  letter-spacing: -0.24px;
  margin-top: 4px;
  padding: 0 18px;
`;

export const RequiredDot = styled.span`
  width: 4px;
  height: 4px;
  background: #ffb700;
  border-radius: 50%;
  flex-shrink: 0;
`;

export const CareerCheckboxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 8px;
`;

export const CheckboxLabel = styled.label<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ disabled }) => (disabled ? 'rgba(44, 44, 44, 0.5)' : '#2c2c2c')};
  letter-spacing: -0.28px;
`;

export const CheckboxBox = styled.div<{ checked?: boolean; disabled?: boolean }>`
  width: 22px;
  height: 22px;
  border: 1px solid ${({ checked }) => (checked ? '#ffb700' : '#d9d9d9')};
  border-radius: 3px;
  background: ${({ checked }) => (checked ? '#ffb700' : 'white')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  
  &::after {
    content: '✓';
    color: white;
    font-size: 14px;
    font-weight: bold;
    display: ${({ checked }) => (checked ? 'block' : 'none')};
  }
`;

// Buttons
export const ButtonWrapper = styled.div`
  // padding: 0 53px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const AddCareerButton = styled.button`
  width: calc(100% - 106px);
  height: 45px;
  display: block;
  border: 1px solid #ffb700;
  border-radius: 3px;
  background: white;
  font-size: 14px;
  font-weight: 500;
  color: #ffb700;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: background 0.2s;

  
  &:hover {
    background: #fff8e5;
  }
`;

export const SaveButton = styled.button`
  width: calc(100% - 106px);
  height: 45px;
  display: block;
  border: none;
  border-radius: 3px;
  background: #ffb700;
  font-size: 14px;
  font-weight: 600;
  color: white;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: background 0.2s;
  margin: 0 53px;
  
  &:hover {
    background: #e6a500;
  }
`;
