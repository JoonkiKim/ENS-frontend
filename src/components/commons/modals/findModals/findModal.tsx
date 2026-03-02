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

// Tabs
const TabContainer = styled.div`
  display: flex;
  margin-top: 26px;
  margin-left: 25px;
  margin-right: 26px;
`;

const Tab = styled.button<{ active?: boolean }>`
  flex: 1;
  height: 48px;
  background: ${({ active }) => (active ? 'white' : 'rgba(217, 217, 217, 0.4)')};
  border: 0.5px solid ${({ active }) => (active ? '#ffb700' : '#b3b3b3')};
  border-bottom: ${({ active }) => (active ? '0.5px solid #ffb700' : 'none')};
  border-top: 0.5px solid ${({ active }) => (active ? '#ffb700' : '#b3b3b3')};
  font-size: 14px;
  color: ${({ active }) => (active ? '#ffb700' : '#b3b3b3')};
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  &:first-of-type {
    border-left: 0.5px solid ${({ active }) => (active ? '#ffb700' : '#b3b3b3')};
    border-right: ${({ active }) => (active ? '0.5px solid #ffb700' : 'none')};
  }
  
  &:last-of-type {
    border-right: 0.5px solid ${({ active }) => (active ? '#ffb700' : '#b3b3b3')};
    border-left: ${({ active }) => (active ? '0.5px solid #ffb700' : 'none')};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5px;
    left: 0;
    right: 0;
    height: 0.5px;
    background: ${({ active }) => (active ? '#ffb700' : 'transparent')};
  }
  
  &:hover {
    color: ${({ active }) => (active ? '#ffb700' : '#999')};
  }
`;

// Form Content
const FormContent = styled.div`
  padding: 21px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 21px;
`;

// Input Field
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

// Submit Button
const SubmitButton = styled.button`
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
  
  &:hover {
    background: #e6a500;
  }
  
  &:active {
    background: #cc9400;
  }
`;

// Types
interface FindModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (type: 'id' | 'password', value: string) => void;
  onFindIdModalOpen?: () => void;
  onFindPasswordModalOpen?: () => void;
}

export default function FindModal({ isOpen, onClose, onSubmit, onFindIdModalOpen, onFindPasswordModalOpen }: FindModalProps) {
  const [activeTab, setActiveTab] = useState<'id' | 'password'>('password');
  const [inputValue, setInputValue] = useState('');

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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTabChange = (tab: 'id' | 'password') => {
    setActiveTab(tab);
    setInputValue('');
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(activeTab, inputValue);
    }
    console.log(`${activeTab === 'id' ? '아이디' : '비밀번호'} 찾기:`, inputValue);
    
    if (activeTab === 'id') {
      if (onFindIdModalOpen) {
        onFindIdModalOpen();
      }
      onClose(); // findModal 닫기
    } else if (activeTab === 'password') {
      if (onFindPasswordModalOpen) {
        onFindPasswordModalOpen();
      }
      onClose(); // findModal 닫기
    }
  };

  const getPlaceholder = () => {
    return activeTab === 'id' ? '이메일 또는 아이디' : '가입한 아이디';
  };

  const getButtonText = () => {
    return activeTab === 'id' ? '아이디 찾기' : '비밀번호 찾기';
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay onClick={handleOverlayClick}>
          <ModalContainer>
            {/* Header */}
            <ModalHeader>
              <ModalTitle>아이디/비밀번호 찾기</ModalTitle>
              <CloseButton onClick={onClose} aria-label="Close" />
            </ModalHeader>

            {/* Tabs */}
            <TabContainer>
              <Tab active={activeTab === 'id'} onClick={() => handleTabChange('id')}>
                아이디 찾기
              </Tab>
              <Tab active={activeTab === 'password'} onClick={() => handleTabChange('password')}>
                비밀번호 찾기
              </Tab>
            </TabContainer>

            {/* Form */}
            <FormContent>
              <InputField
                type="text"
                placeholder={getPlaceholder()}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <SubmitButton onClick={handleSubmit}>{getButtonText()}</SubmitButton>
            </FormContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
}
