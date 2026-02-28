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
  text-align: center;
  gap: 12px;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  line-height: 1.5;
  margin: 0;
`;

const ErrorSubMessage = styled.p`
  font-size: 16px;
  color: #2c2c2c;
  letter-spacing: -0.32px;
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
`;

// Modal Footer
const ModalFooter = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const CancelButton = styled.button`
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

const ConfirmButton = styled.button`
  padding: 10px 24px;
  background: white;
  border: 1px solid #ffb700;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #fff8e5;
    border-color: #e6a500;
  }
  
  &:active {
    background: #fff0cc;
  }
`;

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function ErrorModal({ isOpen, onClose, message }: ErrorModalProps) {
  // 모달이 열릴 때 body 스크롤 막기 (스크롤바 유지)
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
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
          <ErrorMessage>변경사항이 저장되지 않았습니다.</ErrorMessage>
          <ErrorSubMessage>{message}</ErrorSubMessage>
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={onClose}>작성 취소</CancelButton>
          <ConfirmButton onClick={onClose}>변경사항 저장</ConfirmButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}
