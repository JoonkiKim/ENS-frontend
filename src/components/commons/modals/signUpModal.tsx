import { useState, useEffect } from 'react';
import styled from '@emotion/styled';



// Modal Overlay
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// Modal Container
const ModalContainer = styled.div`
  width: 364px;
  max-height: 90vh;
  background: white;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  position: relative;
`;

// Modal Header
const ModalHeader = styled.div`
  height: 50px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1e1e1e;
  letter-spacing: -0.32px;
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 1px;
    background: #d9d9d9;
    top: 50%;
    left: 0;
  }
  
  &::before {
    transform: rotate(45deg);
  }
  
  &::after {
    transform: rotate(-45deg);
  }
  
  &:hover::before,
  &:hover::after {
    background: #999;
  }
`;

// Progress Steps
const ProgressContainer = styled.div`
  padding: 16px 0px;
  align-self: center;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;

const StepWrapper = styled.div`
width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex: 1;
`;

const StepLabel = styled.div`
width:20%;
text-align: center;
  font-size: 12px;
  color: #b3b3b3;
  letter-spacing: -0.24px;
  margin-bottom: 10px;
`;

const StepIndicatorConnectorWrapper = styled.div`
    width: 100%;
display: flex;
  align-items: center;
  gap: 0;
  flex: 1;
`;

const StepIndicatorWrapper = styled.div`
 width:20%;
 display: flex;
 align-items: center;
 justify-content: center;
`;

const StepIndicator = styled.div<{ active?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid ${({ active }) => (active ? '#ffb700' : '#e4e4e7')};
  background: white;
  flex-shrink: 0;
`;

const StepConnector = styled.div`
  flex: 1;
  height: 2px;
  background: #ffb700;
`;

// Section Title
const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffb700;
  letter-spacing: -0.32px;
  margin: 0 0 24px 0;
  padding: 0 26px;
`;

// Modal Body
const ModalBody = styled.div`
  padding: 0 26px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  flex: 1;

  /* (중요) 혹시 전역으로 scrollbar-width/color를 써서 webkit 커스텀이 덮이는 경우 방지 */
  scrollbar-width: auto;
  scrollbar-color: auto;

  /* Chrome / Edge / Safari */
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

  /* ✅ 위/아래 ▲▼ 버튼 제거 */
  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  /* Firefox에서만 (원하면) 얇게/색 적용 */
  @supports (-moz-appearance: none) {
    scrollbar-width: thin;
    scrollbar-color: #d9d9d9 transparent;
  }
`;

// Profile Upload
const ProfileUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 77px;
  height: 77px;
  background: transparent;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfilePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const CameraButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background: white;
  border: 0.5px solid rgba(217, 217, 217, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  
  &:hover {
    background: #f5f5f5;
  }
  
  svg {
    opacity: 0.4;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

// Form Field
const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FieldLabel = styled.label`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RequiredMark = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ffb700;
`;

const InputField = styled.input`
  width: 100%;
  height: 51px;
  padding: 0 18px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  
  &::placeholder {
    color: #b3b3b3;
  }
  
  &:focus {
    outline: none;
    border-color: #ffb700;
  }
`;

const HelpText = styled.p`
  font-size: 11px;
  color: #b3b3b3;
  letter-spacing: -0.22px;
  margin: -4px 0 0 9px;
`;

// Email Field
const EmailFieldWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const EmailInput = styled(InputField)`
  width: 135px;
`;

const EmailAt = styled.span`
  font-size: 14px;
  color: #b3b3b3;
`;

const EmailDomainWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const EmailDomainSelectField = styled.div<{ isClickable?: boolean }>`
  width: 100%;
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

const EmailDomainDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border-radius: 3px;
  margin-top: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
  }
`;

const EmailDomainDropdownItem = styled.div`
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

// Select Field
const StudentIdSelectField = styled.div<{ isClickable?: boolean }>`
  width: 100%;
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

const SelectValue = styled.span`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
`;

const SelectPlaceholder = styled.span`
  font-size: 14px;
  color: #b3b3b3;
  letter-spacing: -0.28px;
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const StudentIdDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border-radius: 3px;
  margin-top: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
  }
`;

const StudentIdDropdownItem = styled.div`
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

// Submit Button
const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
//   padding: 0 22px 30px;
margin-top: 18px;
`;



const SubmitButton = styled.button<{ disabled?: boolean }>`
  flex: 1;
  height: 45px;
  background: ${({ disabled }) => (disabled ? '#e4e4e7' : '#ffb700')};
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  letter-spacing: -0.28px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.2s;
  
  &:hover:not(:disabled) {
    background: #e6a500;
  }
`;

const Avatar = styled.div`
  width: 100%;
  height: 100%;
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

export const MultiInputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MajorInputWrapper = styled.div`
  width: 100%; /* auto에서 100%로 변경 */
  display: flex;
  align-items: center;
  gap: 8px;
  
  input {
    flex: 1; /* flex-shrink: 0 대신 flex: 1 사용 */
    min-width: 0; /* flex item이 축소될 수 있도록 */
  }
`;

export const FormInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.input<{ active?: boolean }>`
  width: 100%; /* auto에서 100%로 변경 */
  height: 51px;
  padding: 0 18px;
  border: 1px solid ${({ active }) => (active ? '#ffb700' : '#d9d9d9')};
  border-radius: 3px;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  outline: none;
  background: white;
  box-sizing: border-box; /* padding 포함한 너비 계산 */
  
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

// Types
interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: SignUpFormData) => void;
}

interface SignUpFormData {
  username: string;
  password: string;
  passwordConfirm: string;
  name: string;
  generation: string;
  authCode: string;
  phone: string;
  emailLocal: string;
  emailDomain: string;
  studentId: string;
  major: string;
  profileImage?: string;
}

export default function SignUpModal({
  isOpen,
  onClose,
  onSubmit,
}: SignUpModalProps) {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    generation: '',
    authCode: '',
    phone: '',
    emailLocal: '',
    emailDomain: '',
    studentId: '',
    major: '',
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isStudentIdDropdownOpen, setIsStudentIdDropdownOpen] = useState(false);
  const [isEmailDomainDropdownOpen, setIsEmailDomainDropdownOpen] = useState(false);
  
  // 전공 필드 상태 관리
  const [majors, setMajors] = useState([
    {
      id: 1,
      value: '',
    },
  ]);

  // 학번 목록 생성 (25학번부터 10학번까지 역순)
  const studentIds = Array.from({ length: 16 }, (_, i) => String(25 - i));

  // 이메일 도메인 목록
  const emailDomains = ['gmail.com', 'naver.com'];

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      const isDropdownElement = 
        target.closest('[data-dropdown-container]') ||
        target.closest('[data-dropdown-item]') ||
        target.closest('[data-dropdown-field]');
      
      if (!isDropdownElement) {
        if (isStudentIdDropdownOpen) {
          setIsStudentIdDropdownOpen(false);
        }
        if (isEmailDomainDropdownOpen) {
          setIsEmailDomainDropdownOpen(false);
        }
      }
    };

    if (isStudentIdDropdownOpen || isEmailDomainDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isStudentIdDropdownOpen, isEmailDomainDropdownOpen, isOpen]);

  // 모달이 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      // body에 스크롤 방지 스타일 적용
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // 모달이 닫힐 때 스크롤 복원
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (field: keyof SignUpFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ ...formData, profileImage: profileImage || undefined });
    }
    onClose();
  };

  const handleToggleStudentIdDropdown = () => {
    setIsStudentIdDropdownOpen(!isStudentIdDropdownOpen);
  };

  const handleSelectStudentId = (id: string) => {
    handleInputChange('studentId', id);
    setIsStudentIdDropdownOpen(false);
  };

  const handleToggleEmailDomainDropdown = () => {
    setIsEmailDomainDropdownOpen(!isEmailDomainDropdownOpen);
    setIsStudentIdDropdownOpen(false);
  };

  const handleSelectEmailDomain = (domain: string) => {
    handleInputChange('emailDomain', domain);
    setIsEmailDomainDropdownOpen(false);
  };

  // 전공 필드 추가 함수
  const handleAddMajor = () => {
    console.log('handleAddMajor called', majors);
    const newId = majors.length > 0 ? Math.max(...majors.map(m => m.id)) + 1 : 1;
    setMajors([
      ...majors,
      {
        id: newId,
        value: '',
      },
    ]);
  };

  return (
    <>

      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContainer>
          {/* Header */}
          <ModalHeader>
            <ModalTitle>회원가입</ModalTitle>
            <CloseButton onClick={onClose} aria-label="Close" />
          </ModalHeader>

          {/* Progress Steps */}
          <ProgressContainer>
            <StepWrapper>
              <StepLabel>STEP 1</StepLabel>
              <StepLabel>STEP 2</StepLabel>
            </StepWrapper>
            <StepIndicatorConnectorWrapper>
              <StepIndicatorWrapper>
                <StepIndicator active />
              </StepIndicatorWrapper>
              <StepConnector />
              <StepIndicatorWrapper>
                <StepIndicator active />
              </StepIndicatorWrapper>
            </StepIndicatorConnectorWrapper>
      
          </ProgressContainer>

          {/* Section Title */}
          <SectionTitle>계정 생성</SectionTitle>

          {/* Body */}
          <ModalBody>
            {/* Profile Upload */}
            <ProfileUpload>
              <ProfileImageWrapper>
                {profileImage ? (
                  <ProfileImage src={profileImage} alt="Profile" />
                ) : (
                  <Avatar>
                    <img
                      src="data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23E5E5E5'/%3E%3Cpath d='M24 24C27.3137 24 30 21.3137 30 18C30 14.6863 27.3137 12 24 12C20.6863 12 18 14.6863 18 18C18 21.3137 20.6863 24 24 24Z' fill='%23999'/%3E%3Cpath d='M24 27C17.3726 27 12 29.6863 12 33V36H36V33C36 29.6863 30.6274 27 24 27Z' fill='%23999'/%3E%3C/svg%3E"
                      alt="Profile"
                    />
                  </Avatar>
                )}
                <CameraButton as="label" htmlFor="profile-upload">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M11 9.5C11 9.89782 10.842 10.2794 10.5607 10.5607C10.2794 10.842 9.89782 11 9.5 11H2.5C2.10218 11 1.72064 10.842 1.43934 10.5607C1.15804 10.2794 1 9.89782 1 9.5V4.5C1 4.10218 1.15804 3.72064 1.43934 3.43934C1.72064 3.15804 2.10218 3 2.5 3H4L5 1.5H7L8 3H9.5C9.89782 3 10.2794 3.15804 10.5607 3.43934C10.842 3.72064 11 4.10218 11 4.5V9.5Z"
                      stroke="#999"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <circle cx="6" cy="7" r="1.5" stroke="#999" strokeWidth="1" fill="none" />
                  </svg>
                  <HiddenFileInput
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </CameraButton>
              </ProfileImageWrapper>
            </ProfileUpload>

            {/* 아이디 */}
            <FormField>
              <InputField
                type="text"
                placeholder="아이디 (ex. 00기_홍길동)"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
              />
            </FormField>

            {/* 비밀번호 */}
            <FormField>
              <InputField
                type="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </FormField>

            {/* 비밀번호 확인 */}
            <FormField>
              <InputField
                type="password"
                placeholder="비밀번호 확인"
                value={formData.passwordConfirm}
                onChange={(e) => handleInputChange('passwordConfirm', e.target.value)}
              />
              <HelpText>8자리 이상의 대소문자, 숫자, 특수문자를 사용해 주세요.</HelpText>
            </FormField>

            {/* 이름 */}
            <FormField>
              <FieldLabel>
                이름
                <RequiredMark />
              </FieldLabel>
              <InputField
                type="text"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </FormField>

            {/* 기수 */}
            <FormField>
              <FieldLabel>
                기수
                <RequiredMark />
              </FieldLabel>
              <InputField
                type="text"
                placeholder="ENS 기수를 입력하세요"
                value={formData.generation}
                onChange={(e) => handleInputChange('generation', e.target.value)}
              />
            </FormField>

            {/* 인증번호 */}
            <FormField>
              <FieldLabel>
                인증번호
                <RequiredMark />
              </FieldLabel>
              <InputField
                type="text"
                placeholder="부여된 인증번호를 입력하세요"
                value={formData.authCode}
                onChange={(e) => handleInputChange('authCode', e.target.value)}
              />
            </FormField>

            {/* 전화번호 */}
            <FormField>
              <FieldLabel>
                전화번호
                <RequiredMark />
              </FieldLabel>
              <InputField
                type="tel"
                placeholder="전화번호를 입력하세요"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </FormField>

            {/* 이메일 */}
            <FormField>
              <FieldLabel>
                이메일
                <RequiredMark />
              </FieldLabel>
              <EmailFieldWrapper>
                <EmailInput
                  type="text"
                  placeholder=""
                  value={formData.emailLocal}
                  onChange={(e) => handleInputChange('emailLocal', e.target.value)}
                />
                <EmailAt>@</EmailAt>
                <EmailDomainWrapper>
                  <EmailDomainSelectField 
                    isClickable={true}
                    onClick={handleToggleEmailDomainDropdown}
                    data-dropdown-field
                  >
                    {formData.emailDomain ? (
                      <SelectValue>{formData.emailDomain}</SelectValue>
                    ) : (
                      <SelectPlaceholder></SelectPlaceholder>
                    )}
                    <DropdownIcon style={{ position: 'absolute', right: '10px' }}>
                      <svg viewBox="0 0 15 11" fill="none">
                        <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                      </svg>
                    </DropdownIcon>
                    {isEmailDomainDropdownOpen && (
                      <EmailDomainDropdown data-dropdown-container>
                        {emailDomains.map((domain) => (
                          <EmailDomainDropdownItem
                            key={domain}
                            data-dropdown-item
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectEmailDomain(domain);
                            }}
                          >
                            {domain}
                          </EmailDomainDropdownItem>
                        ))}
                      </EmailDomainDropdown>
                    )}
                  </EmailDomainSelectField>
                </EmailDomainWrapper>
              </EmailFieldWrapper>
            </FormField>

            {/* 학번 */}
            <FormField>
              <FieldLabel>
                학번
                <RequiredMark />
              </FieldLabel>
              <SelectWrapper>
                <StudentIdSelectField 
                  isClickable={true}
                  onClick={handleToggleStudentIdDropdown}
                  data-dropdown-field
                >
                  {formData.studentId ? (
                    <SelectValue>{formData.studentId}학번</SelectValue>
                  ) : (
                    <SelectPlaceholder>학번을 선택하세요</SelectPlaceholder>
                  )}
                  <DropdownIcon style={{ position: 'absolute', right: '10px' }}>
                    <svg viewBox="0 0 15 11" fill="none">
                      <path d="M1 1L7.5 9L14 1" stroke="#999999" strokeWidth="2" />
                    </svg>
                  </DropdownIcon>
                  {isStudentIdDropdownOpen && (
                    <StudentIdDropdown data-dropdown-container>
                      {studentIds.map((id) => (
                        <StudentIdDropdownItem
                          key={id}
                          data-dropdown-item
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectStudentId(id);
                          }}
                        >
                          {id}학번
                        </StudentIdDropdownItem>
                      ))}
                    </StudentIdDropdown>
                  )}
                </StudentIdSelectField>
              </SelectWrapper>
            </FormField>

            {/* 전공 */}
            <FormField>
              <FieldLabel>
                전공
                <RequiredMark />
              </FieldLabel>
              <FormInputWrapper>
              <MultiInputField>
                {majors.map((major, index) => (
                  <MajorInputWrapper key={major.id}>
                    <Input type="text" placeholder="전공을 입력하세요" />
                    {index === majors.length - 1 && (
                      <AddButton 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddMajor();
                        }}
                      >
                        <svg viewBox="0 0 20 20" fill="none">
                          <path d="M10 5V15M5 9.90196H15" stroke="#FFB700" strokeWidth="1.5" />
                          <circle cx="10" cy="10" r="9.5" stroke="#FFB700" />
                        </svg>
                      </AddButton>
                    )}
                  </MajorInputWrapper>
                ))}
              </MultiInputField>
            </FormInputWrapper>
            </FormField>

            {/* Submit Button */}
            <ButtonContainer>
              <SubmitButton onClick={handleSubmit}>가입하기</SubmitButton>
            </ButtonContainer>
          </ModalBody>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
}