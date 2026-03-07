import  { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useMutation, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import FindModal from './findModals/findModal';
import FindIdModal from './findModals/findIdModal';
import FindPasswordModal from './findModals/findPasswordModal';
import ResetPasswordModal from './findModals/resetPasswordModal';
import AgreeModal from './agreeModal';
import SignUpModal from './signUpModal';
import { LOGIN, FETCH_LOGIN_USER } from '../../../commons/apis/graphql-queries';
import { setAccessToken } from '../../../commons/libraries/token';



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
  // margin-bottom: 18px;
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
  const [customId, setCustomId] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isFindModalOpen, setIsFindModalOpen] = useState(false);
  const [isFindIdModalOpen, setIsFindIdModalOpen] = useState(false);
  const [isFindPasswordModalOpen, setIsFindPasswordModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('E**@snu.ac.kr');
  const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();
  const apolloClient = useApolloClient();

  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN);

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

  const handleLogin = async () => {
    // 입력값 검증
    if (!customId.trim()) {
      setLoginError('아이디를 입력해주세요.');
      return;
    }
    if (!password.trim()) {
      setLoginError('비밀번호를 입력해주세요.');
      return;
    }

    setLoginError(null);

    try {
      const { data, errors } = await loginMutation({
        variables: {
          customId: customId.trim(),
          password: password,
          keepLoggedIn: keepLoggedIn,
        },
      });

      // GraphQL errors 배열이 있는 경우 처리 (200 응답이지만 errors 포함)
      if (errors && errors.length > 0) {
        const errorMessage = errors[0]?.message || '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
        // 스택 트레이스 제거 (메시지에서 \n\nStack: 이후 부분 제거)
        const cleanMessage = errorMessage.split('\n\nStack:')[0].trim();
        setLoginError(cleanMessage);
        return;
      }

      if (data?.login) {
        // 액세스 토큰 저장
        setAccessToken(data.login);
        
        // 사용자 정보 조회하여 이메일 확인
        try {
          const { data: userData } = await apolloClient.query({
            query: FETCH_LOGIN_USER,
            fetchPolicy: 'network-only', // 캐시 무시하고 최신 데이터 가져오기
          });
          
          const user = userData?.fetchLoginUser;
          
          // 이메일이 없으면 마이페이지로 리다이렉트
          if (user && !user.email) {
            onClose();
            setCustomId('');
            setPassword('');
            setKeepLoggedIn(false);
            router.push('/mypage');
            return;
          }
        } catch (error) {
          console.error('사용자 정보 조회 실패:', error);
        }
        
        // 로그인 성공 시 콜백 호출
        if (onLogin) {
          onLogin(customId, password, keepLoggedIn);
        }
        
        // 모달 닫기
        onClose();
        
        // 입력 필드 초기화
        setCustomId('');
        setPassword('');
        setKeepLoggedIn(false);
      }
    } catch (error: any) {
      console.error('로그인 실패:', error);
      
      // 에러 메시지 처리
      let errorMessage = '';
      
      // GraphQL 에러가 있는 경우
      if (error?.graphQLErrors && error.graphQLErrors.length > 0) {
        errorMessage = error.graphQLErrors[0]?.message || '';
      } else if (error?.message) {
        errorMessage = error.message;
      } else {
        errorMessage = '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
      }
      
      // 스택 트레이스 제거 (메시지에서 \n\nStack: 이후 부분 제거)
      const cleanMessage = errorMessage.split('\n\nStack:')[0].trim();
      setLoginError(cleanMessage || '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleForgotPasswordClick = () => {
    setIsFindModalOpen(true);
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  const handleFindModalClose = () => {
    setIsFindModalOpen(false);
  };

  const handleFindIdModalOpen = () => {
    setIsFindIdModalOpen(true);
  };

  const handleFindIdModalClose = () => {
    setIsFindIdModalOpen(false);
  };

  const handleFindPasswordModalOpen = () => {
    setIsFindPasswordModalOpen(true);
  };

  const handleFindPasswordModalClose = () => {
    setIsFindPasswordModalOpen(false);
  };

  const handleResetPasswordModalOpen = (email?: string) => {
    if (email) {
      setResetPasswordEmail(email);
    }
    setIsResetPasswordModalOpen(true);
  };

  const handleResetPasswordModalClose = () => {
    setIsResetPasswordModalOpen(false);
  };

  const handleSignUpClick = () => {
    setIsAgreeModalOpen(true);
    onClose(); // loginModal 닫기
    if (onSignUp) {
      onSignUp();
    }
  };

  const handleAgreeModalClose = () => {
    setIsAgreeModalOpen(false);
  };

  const handleAgreeModalSubmit = () => {
    setIsAgreeModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleSignUpModalClose = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay>
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
                value={customId}
                onChange={(e) => {
                  setCustomId(e.target.value);
                  setLoginError(null);
                }}
                onKeyPress={handleKeyPress}
              />
              <InputField
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError(null);
                }}
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

              <div style={{ 
                color: '#ff4444', 
                fontSize: '12px', 
                marginTop: '5px', 
                marginBottom: '5px',
                paddingLeft: '4px',
                minHeight: '16px',
                lineHeight: '16px'
              }}>
                {loginError || '\u00A0'}
              </div>

              <LoginButton 
                onClick={handleLogin}
                disabled={loginLoading}
                style={{ 
                  opacity: loginLoading ? 0.6 : 1,
                  cursor: loginLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {loginLoading ? '로그인 중...' : '로그인'}
              </LoginButton>

              <FooterLinks>
                <FooterLink onClick={handleSignUpClick}>회원가입</FooterLink>
                <FooterLink onClick={handleForgotPasswordClick}>비밀번호 찾기</FooterLink>
              </FooterLinks>
            </ModalBody>
          </ModalContainer>
        </ModalOverlay>
      )}
      <FindModal 
        isOpen={isFindModalOpen} 
        onClose={handleFindModalClose}
        onFindEmailModalOpen={handleFindIdModalOpen}
        onFindPasswordModalOpen={handleFindPasswordModalOpen}
      />
      <FindIdModal 
        isOpen={isFindIdModalOpen} 
        onClose={handleFindIdModalClose}
        onResetPassword={(email) => handleResetPasswordModalOpen(email)}
      />
      <FindPasswordModal 
        isOpen={isFindPasswordModalOpen} 
        onClose={handleFindPasswordModalClose}
        onResetPassword={(email) => handleResetPasswordModalOpen(email)}
      />
      <ResetPasswordModal 
        isOpen={isResetPasswordModalOpen} 
        onClose={handleResetPasswordModalClose}
        email={resetPasswordEmail}
      />
      <AgreeModal 
        isOpen={isAgreeModalOpen} 
        onClose={handleAgreeModalClose}
        onSubmit={handleAgreeModalSubmit}
      />
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={handleSignUpModalClose}
      />
    </>
  );
}
