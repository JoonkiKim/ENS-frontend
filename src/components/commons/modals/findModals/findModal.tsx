import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useMutation } from '@apollo/client';
import { SEND_PASSWORD_RESET_LINK } from '../../../../commons/apis/graphql-queries';



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

// Instruction Text
const InstructionText = styled.p`
  padding: 21px 24px 0;
  margin-top: 21px;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  line-height: 1.5;
`;

// Success Message
const SuccessMessage = styled.div`
  padding: 21px 24px;
  margin-top: 60px;
  font-size: 14px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
  line-height: 1.5;
  text-align: center;
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
  onSubmit?: (type: 'email' | 'password', value: string) => void;
  onFindEmailModalOpen?: () => void;
  onFindPasswordModalOpen?: () => void;
}

export default function FindModal({ isOpen, onClose, onSubmit, onFindEmailModalOpen, onFindPasswordModalOpen }: FindModalProps) {
  const [activeTab, setActiveTab] = useState<'email' | 'password'>('password');
  const [inputValue, setInputValue] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 최소 로딩 시간 제어용

  const [sendPasswordResetLink, { loading: sendingLink }] = useMutation(SEND_PASSWORD_RESET_LINK);

  // 모달이 열릴 때 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setInputValue('');
      setIsLoading(false);
    } else {
      // 모달이 닫힐 때도 상태 초기화 (깜빡임 방지)
      setIsSuccess(false);
      setInputValue('');
      setIsLoading(false);
    }
  }, [isOpen]);

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

  const handleTabChange = (tab: 'email' | 'password') => {
    setActiveTab(tab);
    setInputValue('');
  };

  const handleSubmit = async () => {
    if (activeTab === 'password') {
      // 이메일 입력 검증
      if (!inputValue.trim()) {
        alert('이메일을 입력해주세요.');
        return;
      }

      // 로딩 시작 시간 기록
      const startTime = Date.now();
      setIsLoading(true);

      try {
        // sendPasswordResetLink mutation 실행
        await sendPasswordResetLink({
          variables: {
            email: inputValue.trim(),
          },
        });
        
        // 최소 1.5초 대기 (이미 지난 시간 고려)
        const elapsedTime = Date.now() - startTime;
        const minLoadingTime = 1500; // 1.5초
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        
        // 성공 시 성공 메시지 표시
        setIsLoading(false);
        setIsSuccess(true);
      } catch (error: any) {
        // 에러 발생 시에도 최소 로딩 시간 유지
        const elapsedTime = Date.now() - startTime;
        const minLoadingTime = 1500; // 1.5초
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        
        setIsLoading(false);
        console.error('비밀번호 재설정 링크 전송 실패:', error);
        const errorMessage = error?.graphQLErrors?.[0]?.message || error?.message || '비밀번호 재설정 링크 전송에 실패했습니다.';
        alert(errorMessage);
      }
    } else if (activeTab === 'email') {
      if (onSubmit) {
        onSubmit(activeTab, inputValue);
      }
      console.log('이메일 찾기:', inputValue);
      
      if (onFindEmailModalOpen) {
        onFindEmailModalOpen();
      }
      onClose(); // findModal 닫기
    }
  };

  const getPlaceholder = () => {
    return activeTab === 'email' ? '이메일 또는 아이디' : '가입한 이메일';
  };

  const getButtonText = () => {
    return activeTab === 'email' ? '이메일 찾기' : '비밀번호 찾기';
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay onClick={handleOverlayClick}>
          <ModalContainer>
            {/* Header */}
            <ModalHeader>
              <ModalTitle>비밀번호 찾기</ModalTitle>
              <CloseButton onClick={onClose} aria-label="Close" />
            </ModalHeader>

            {/* Tabs */}
            {/* <TabContainer>
              <Tab active={activeTab === 'email'} onClick={() => handleTabChange('email')}>
                이메일 찾기
              </Tab>
              <Tab active={activeTab === 'password'} onClick={() => handleTabChange('password')}>
                비밀번호 찾기
              </Tab>
            </TabContainer> */}

            {/* Success Message or Form */}
            {isSuccess ? (
              <SuccessMessage>
                비밀번호 재설정 링크가 전송되었습니다. <br /> 메일함을 확인해주세요!
              </SuccessMessage>
            ) : (
              <>
                {/* Instruction Text */}
                <InstructionText>가입하신 이메일을 입력해주세요</InstructionText>

                {/* Form */}
                <FormContent>
                  <InputField
                    type="text"
                    placeholder={getPlaceholder()}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit();
                      }
                    }}
                  />
                  <SubmitButton 
                    onClick={handleSubmit}
                    disabled={isLoading || sendingLink}
                    style={{
                      opacity: (isLoading || sendingLink) ? 0.6 : 1,
                      cursor: (isLoading || sendingLink) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {(isLoading || sendingLink) ? '전송 중...' : getButtonText()}
                  </SubmitButton>
                </FormContent>
              </>
            )}
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
}
