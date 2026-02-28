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
  z-index: 2000;
`;

// Modal Container
const ModalContainer = styled.div`
  width: 400px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
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
    width: 14px;
    height: 1.5px;
    background: #b3b3b3;
    border-radius: 1px;
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
  padding: 40px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  line-height: 1.5;
  margin: 0;
`;

// Modal Footer
const ModalFooter = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  padding: 10px 24px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f5f5f5;
    border-color: #b3b3b3;
  }
  
  &:active {
    background: #e5e5e5;
  }
`;

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function MessageModal({ isOpen, onClose, message }: MessageModalProps) {
  // 모달이 열릴 때 body 스크롤 막기 (스크롤바 유지)
  useEffect(() => {
    if (isOpen) {
      // 스크롤바 너비 계산
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // body에 padding을 추가해서 스크롤바 너비만큼 공간 확보
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close" />
        <ModalBody>
          <Message>{message}</Message>
        </ModalBody>
        <ModalFooter>
          <ConfirmButton onClick={onClose}>확인</ConfirmButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}
