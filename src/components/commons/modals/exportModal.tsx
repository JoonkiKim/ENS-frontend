import React, { useState } from 'react';
import styled from '@emotion/styled';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedColumns: string[]) => void;
  selectedCount: number;
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
  background: #f5f5f5;
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

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #71717a;
  margin: 0;
  letter-spacing: -0.28px;
`;

const SectionHeader = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #09090b;
  margin: 0 0 12px 0;
  letter-spacing: -0.28px;
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #09090b;
  letter-spacing: -0.28px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
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
  transition: all 0.2s;
  
  &:hover {
    background: #f4f4f5;
  }
`;

const DownloadButton = styled.button`
  height: 36px;
  padding: 8px 16px;
  background: #ffb700;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #e6a500;
  }
  
  &:disabled {
    background: #d4d4d8;
    cursor: not-allowed;
  }
`;

const columnOptions = [
  { value: 'generation', label: '그룹' },
  { value: 'name', label: '이름' },
  { value: 'phone', label: '연락처' },
  { value: 'email', label: '메일' },
  { value: 'memo', label: '메모' },
];

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedCount,
}) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['generation', 'name', 'phone', 'email', 'memo']);

  const handleToggleColumn = (value: string) => {
    setSelectedColumns(prev =>
      prev.includes(value)
        ? prev.filter(col => col !== value)
        : [...prev, value]
    );
  };

  const handleConfirm = () => {
    if (selectedColumns.length === 0) {
      return;
    }
    onConfirm(selectedColumns);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>회원 목록을 다운로드 할까요?</ModalTitle>
        <ModalSubtitle>선택된 항목이 파일에 포함됩니다.</ModalSubtitle>
        
        <div>
          <SectionHeader>포함 정보</SectionHeader>
          <CheckboxList>
            {columnOptions.map(option => (
              <CheckboxItem key={option.value}>
                <Checkbox
                  type="checkbox"
                  checked={selectedColumns.includes(option.value)}
                  onChange={() => handleToggleColumn(option.value)}
                />
                {option.label}
              </CheckboxItem>
            ))}
          </CheckboxList>
        </div>

        <ButtonGroup>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <DownloadButton
            onClick={handleConfirm}
            disabled={selectedColumns.length === 0}
          >
            다운로드
          </DownloadButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ExportModal;
