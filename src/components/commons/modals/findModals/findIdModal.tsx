import { useEffect } from 'react';
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
  height: 304px;
  background: white;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  position: relative;
//   border: 1px solid black;
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

// Content
const Content = styled.div`
  padding: 29px 27px 0 27px;
  display: flex;
  flex-direction: column;
`;

const Message = styled.p`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  margin: 0 0 8px 0;
`;

const FoundId = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  margin: 0 0 40px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 9px;
  margin-bottom: 14px;
`;

const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  height: 45px;
  background: white;
  border: 1px solid ${({ primary }) => (primary ? '#ffb700' : '#b3b3b3')};
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ primary }) => (primary ? '#2c2c2c' : '#b3b3b3')};
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ primary }) => (primary ? '#ffb700' : '#f5f5f5')};
    color: ${({ primary }) => (primary ? 'white' : '#2c2c2c')};
  }
`;

const HelpLink = styled.p`
  font-size: 14px;
  color: #ffb700;
  letter-spacing: -0.28px;
  margin: 0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Types
interface FindIdModalProps {
  isOpen: boolean;
  onClose: () => void;
  foundEmail?: string;
  onResetPassword?: (email?: string) => void;
  onLogin?: () => void;
  onHelp?: () => void;
}

export default function FindIdModal({
  isOpen,
  onClose,
  foundEmail = 'E**@snu.ac.kr',
  onResetPassword,
  onLogin,
  onHelp,
}: FindIdModalProps) {
  // 모달이 열릴 때 body 스크롤 막기 (스크롤바는 유지)
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      // 스크롤바는 유지하되 스크롤만 막기
      document.body.style.overflowY = 'scroll';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // 스크롤 이벤트 막기
      const preventScroll = (e: Event) => {
        e.preventDefault();
        window.scrollTo(0, scrollY);
      };
      
      window.addEventListener('scroll', preventScroll, { passive: false });
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
      
      return () => {
        // 모달이 닫힐 때 스크롤 복원
        window.removeEventListener('scroll', preventScroll);
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
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

  const handleResetPassword = () => {
    onClose(); // FindIdModal 닫기
    if (onResetPassword) {
      onResetPassword(foundEmail);
    }
    console.log('비밀번호 재설정 클릭');
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    }
    console.log('로그인 클릭');
  };

  const handleHelp = () => {
    if (onHelp) {
      onHelp();
    }
    console.log('정확한 아이디가 기억나지 않아요 클릭');
  };

  return (
    <>

      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContainer>
          {/* Header */}
          <ModalHeader>
            <ModalTitle>아이디 찾기</ModalTitle>
            <CloseButton onClick={onClose} aria-label="Close" />
          </ModalHeader>

          {/* Content */}
          <Content>
            <Message>입력하신 정보와 일치하는 계정을 발견했습니다.</Message>
            <FoundId>{foundEmail}</FoundId>

            <ButtonContainer>
              <Button onClick={handleResetPassword}>비밀번호 재설정</Button>
              <Button primary onClick={handleLogin}>
                로그인
              </Button>
            </ButtonContainer>

            <HelpLink onClick={handleHelp}>정확한 아이디가 기억나지 않아요!</HelpLink>
          </Content>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
}
