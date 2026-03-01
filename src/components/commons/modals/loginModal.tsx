import  { useState } from 'react';
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
  height: 356px;
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

// Modal Body
const ModalBody = styled.div`
  padding: 26px 26px 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

// Input Field
const InputField = styled.input`
  width: 100%;
  height: 55px;
  padding: 0 18px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  margin-bottom: 6px;
  
  &::placeholder {
    color: #b3b3b3;
  }
  
  &:focus {
    outline: none;
    border-color: #ffb700;
  }
`;

// Checkbox Container
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  margin-bottom: 18px;
`;

const CheckboxWrapper = styled.div`
  position: relative;
  width: 22px;
  height: 22px;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin: 0;
  
  &:checked + div {
    background: #ffb700;
    border-color: #ffb700;
    
    &::after {
      opacity: 1;
    }
  }
`;

const CheckboxCustom = styled.div`
  width: 22px;
  height: 22px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background: white;
  position: relative;
  pointer-events: none;
  transition: all 0.2s;
  
  &::after {
    content: '';
    position: absolute;
    left: 7px;
    top: 3px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.2s;
  }
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  user-select: none;
`;

// Login Button
const LoginButton = styled.button`
  width: 100%;
  height: 45px;
  background: #ffb700;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 12px;
  
  &:hover {
    background: #e6a500;
  }
  
  &:active {
    background: #cc9400;
  }
`;

// Footer Links
const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterLink = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: #ffb700;
    text-decoration: underline;
  }
`;

// Types
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (username: string, password: string, keepLoggedIn: boolean) => void;
  onSignUp?: () => void;
  onForgotPassword?: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSignUp,
  onForgotPassword,
}: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin(username, password, keepLoggedIn);
    }
    // 실제로는 여기서 로그인 처리
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>

      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContainer>
          {/* Header */}
          <ModalHeader>
            <ModalTitle>로그인</ModalTitle>
            <CloseButton onClick={onClose} aria-label="Close" />
          </ModalHeader>

          {/* Body */}
          <ModalBody>
            <InputField
              type="text"
              placeholder="아이디 (ex. 00기_홍길동)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <InputField
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            
            <CheckboxContainer>
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="keepLoggedIn"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                />
                <CheckboxCustom />
              </CheckboxWrapper>
              <CheckboxLabel htmlFor="keepLoggedIn">
                로그인 상태 유지
              </CheckboxLabel>
            </CheckboxContainer>

            <LoginButton onClick={handleLogin}>로그인</LoginButton>

            <FooterLinks>
              <FooterLink onClick={onSignUp}>회원가입</FooterLink>
              <FooterLink onClick={onForgotPassword}>비밀번호 찾기</FooterLink>
            </FooterLinks>
          </ModalBody>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
}
