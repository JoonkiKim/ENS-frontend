import { useEffect } from 'react';
import styled from '@emotion/styled';


// Modal Overlay
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
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
  padding: 15px 27px 0;
  display: flex;
  flex-direction: column;
`;

const TopMessage = styled.div`
  font-size: 12px;
  color: #757575;
  letter-spacing: -0.24px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 28px;
  
  p {
    margin: 0;
  }
`;

const SectionTitle = styled.p`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  margin: 0 0 30px 0;
`;

const SectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
`;

const CheckButton = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #ffb700;
  border-radius: 50%;
  background: #ffb700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    top: 3px;
    left: 6px;
  }
  
  &:hover {
    border-color: #ffb700;
  }
`;

const SectionTitleText = styled.p`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  margin: 0;
`;
const ExplanationText = styled.p`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  line-height: 1.5;
  margin: 0 0 11px 0;
`;

const EmailDisplay = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  margin: 0 0 30px 0;
`;

const ContinueButton = styled.button`
  width: 100%;
  height: 45px;
  background: white;
  border: 1px solid #ffb700;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 10px;
  
  &:hover {
    background: #ffb700;
    color: white;
  }
`;

const RedNote = styled.p`
  font-size: 12px;
  color: red;
  line-height: 15px;
  letter-spacing: -0.3px;
  margin: 0;
  white-space: pre-wrap;
`;

// Types
interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  onContinue?: () => void;
}

export default function ResetPasswordModal({
  isOpen,
  onClose,
  email = 'E**@snu.ac.kr',
  onContinue,
}: ResetPasswordModalProps) {
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

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
    console.log('비밀번호 재설정 계속 클릭');
  };

  return (
    <>

      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContainer>
          {/* Header */}
          <ModalHeader>
            <ModalTitle>비밀번호 재설정</ModalTitle>
            <CloseButton onClick={onClose} aria-label="Close" />
          </ModalHeader>

          {/* Content */}
          <Content>
            <TopMessage>
              <p>입력하신 정보와 일치하는 계정을 발견했습니다.</p>
              <p>비밀번호를 재설정할 방법을 선택해주세요.</p>
            </TopMessage>

            <SectionTitleContainer>
              <CheckButton />
              <SectionTitleText>가입한 이메일로 재설정</SectionTitleText>
            </SectionTitleContainer>

            <ExplanationText>
              회원정보에 등록된 아래의 이메일 주소로
              <br />
              정확한 계정 정보를 전송하시겠습니까?
            </ExplanationText>

            <EmailDisplay>{email}</EmailDisplay>

            <ContinueButton onClick={handleContinue}>계속</ContinueButton>

        
          </Content>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
}
