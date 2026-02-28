import React from 'react';
import styled from '@emotion/styled';

interface ForceWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount?: number;
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90vw;
  padding: 24px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #09090b;
  margin: 0;
  letter-spacing: -0.32px;
`;

const ModalMessage = styled.p`
  font-size: 14px;
  color: #71717a;
  margin: 0;
  letter-spacing: -0.28px;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  height: 36px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #e4e4e7;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #18181b;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  
  &:hover {
    background: #f4f4f5;
  }
  
  &:active {
    background: #e4e4e7;
  }
`;

const ConfirmButton = styled.button`
  height: 36px;
  padding: 8px 16px;
  background: #ffb700;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  
  &:hover {
    background: #e6a500;
  }
  
  &:active {
    background: #cc9400;
  }
`;

const ForceWithdrawModal: React.FC<ForceWithdrawModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedCount = 0,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>
          선택한 회원을 강제로 탈퇴시키시겠습니까?
        </ModalTitle>
        <ModalMessage>
          이 작업은 되돌릴 수 없습니다.
        </ModalMessage>
        <ButtonGroup>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ForceWithdrawModal;
