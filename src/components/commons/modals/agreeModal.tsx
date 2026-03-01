import  { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import SignUpAlert from './signUpAlert';



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
  height: 591px;
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
  background: #e4e4e7;
`;

// Section Title
const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffb700;
  letter-spacing: -0.32px;
  margin: 0 0 24px 0;
  padding: 0 22px;
`;

// Modal Body
const ModalBody = styled.div`
  padding: 0 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  overflow-y: auto;
  flex: 1;
`;

// Checkbox Container
const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const CheckboxWrapper = styled.div`
  position: relative;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  margin-top: 1px;
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

const CheckboxLabel = styled.div`
  font-size: 12px;
  color: #2c2c2c;
  letter-spacing: -0.28px;
//   cursor: pointer;
  user-select: none;

  display: flex;
  flex-direction: row;
  align-items: center;

`;

const RequiredMark = styled.span`
  color: #ff0408;
`;

// Scrollable Text Box
const TextBoxWrapper = styled.div`
  position: relative;
  margin-top: 8px;
`;

const TextBox = styled.div`
  width: 100%;
  height: 70px;
  padding: 11px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background: white;
  font-size: 11px;
  color: rgba(44, 44, 44, 0.8);
  letter-spacing: -0.26px;
  line-height: 1.4;
  overflow-y: auto;
  position: relative;
  
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
`;

const ScrollIcon = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 8px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid #b3b3b3;
  }
`;

// Agreement Section
const AgreementSection = styled.div`
  display: flex;
  flex-direction: column;
`;

// Buttons
const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 22px 30px;
`;

const CancelButton = styled.button`
  flex: 1;
  height: 45px;
  background: white;
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  color: #b3b3b3;
  letter-spacing: -0.28px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
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

// Types
interface AgreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export default function AgreeModal({
  isOpen,
  onClose,
  onSubmit,
}: AgreeModalProps) {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeAge, setAgreeAge] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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

  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
    setAgreeAge(checked);
  };

  const handleIndividualChange = () => {
    // 개별 체크박스 변경 시 전체 동의 체크박스 업데이트
    const allChecked = agreeTerms && agreePrivacy && agreeAge;
    setAgreeAll(allChecked);
  };

  const handleTermsChange = (checked: boolean) => {
    setAgreeTerms(checked);
    setTimeout(handleIndividualChange, 0);
  };

  const handlePrivacyChange = (checked: boolean) => {
    setAgreePrivacy(checked);
    setTimeout(handleIndividualChange, 0);
  };

  const handleAgeChange = (checked: boolean) => {
    setAgreeAge(checked);
    setTimeout(handleIndividualChange, 0);
  };

  const canSubmit = agreeTerms && agreePrivacy && agreeAge;

  const handleSubmit = () => {
    // 만 14세 이상 체크 안 했으면 alert 표시
    if (!agreeAge) {
      setAlertMessage('만 14세 미만은 가입이 불가합니다. 만 14세 이상임을 확인해주세요.');
      setIsAlertOpen(true);
      return;
    }
    
    // 이용약관 동의와 개인정보 수집 및 이용 동의 중 하나라도 체크 안 했으면 alert 표시
    if (!agreeTerms || !agreePrivacy) {
      setAlertMessage('이용약관 및 개인정보 처리방침에 동의하셔야 가입이 가능합니다.');
      setIsAlertOpen(true);
      return;
    }
    
    if (canSubmit && onSubmit) {
      onSubmit();
    }
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
                <StepIndicator />
              </StepIndicatorWrapper>
            </StepIndicatorConnectorWrapper>
      
          </ProgressContainer>

          {/* Section Title */}
          <SectionTitle>약관동의</SectionTitle>

          {/* Body */}
          <ModalBody>
            {/* 전체 동의 */}
            <CheckboxContainer>
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="agreeAll"
                  checked={agreeAll}
                  onChange={(e) => handleAgreeAll(e.target.checked)}
                />
                <CheckboxCustom />
              </CheckboxWrapper>
              <CheckboxLabel>
                이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
              </CheckboxLabel>
            </CheckboxContainer>

            {/* 이용약관 동의 */}
            <AgreementSection>
              <CheckboxContainer>
                <CheckboxWrapper>
                  <CheckboxInput
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={(e) => handleTermsChange(e.target.checked)}
                  />
                  <CheckboxCustom />
                </CheckboxWrapper>
                <CheckboxLabel>
                  이용약관 동의 <RequiredMark>(필수)</RequiredMark>
                </CheckboxLabel>
              </CheckboxContainer>
              <TextBoxWrapper>
                <TextBox>
                  <p style={{ margin: '0 0 8px 0' }}>제1조 목적</p>
                  <p style={{ margin: 0 }}>
                    본 이용 약관은 "ENS Intranet"의 서비스 이용조건과 절차, 회원과 "ENS Intranet"의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                  </p>
                </TextBox>
                <ScrollIcon />
              </TextBoxWrapper>
            </AgreementSection>

            {/* 개인정보 수집 및 이용 동의 */}
            <AgreementSection>
              <CheckboxContainer>
                <CheckboxWrapper>
                  <CheckboxInput
                    type="checkbox"
                    id="agreePrivacy"
                    checked={agreePrivacy}
                    onChange={(e) => handlePrivacyChange(e.target.checked)}
                  />
                  <CheckboxCustom />
                </CheckboxWrapper>
                <CheckboxLabel>
                  개인정보 수집 및 이용 동의 <RequiredMark>(필수)</RequiredMark>
                </CheckboxLabel>
              </CheckboxContainer>
              <TextBoxWrapper>
                <TextBox>
                  <ol style={{ margin: 0, paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '8px' }}>개인정보 수집목적 및 이용목적</li>
                  </ol>
                  <p style={{ margin: 0 }}>
                    (1) 홈페이지 회원 가입 및 관리
                  </p>
                </TextBox>
                <ScrollIcon />
              </TextBoxWrapper>
            </AgreementSection>

            {/* 만 14세 이상 */}
            <CheckboxContainer>
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="agreeAge"
                  checked={agreeAge}
                  onChange={(e) => handleAgeChange(e.target.checked)}
                />
                <CheckboxCustom />
              </CheckboxWrapper>
              <CheckboxLabel>
                만 14세 이상입니다. <RequiredMark>(필수)</RequiredMark>
              </CheckboxLabel>
            </CheckboxContainer>
          </ModalBody>

          {/* Buttons */}
          <ButtonContainer>
            <CancelButton onClick={onClose}>취소</CancelButton>
            <SubmitButton disabled={!canSubmit} onClick={handleSubmit}>
              다음
            </SubmitButton>
          </ButtonContainer>
        </ModalContainer>
      </ModalOverlay>

      <SignUpAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        message={alertMessage}
      />
    </>
  );
}
