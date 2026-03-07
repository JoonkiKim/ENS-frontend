import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../../../../commons/apis/graphql-queries';
import * as S from './resetPassword.style';

export default function ResetPasswordContainer() {
  const router = useRouter();
  const { token } = router.query;
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const [resetPasswordMutation, { loading: mutationLoading }] = useMutation(RESET_PASSWORD);

  // 토큰이 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (router.isReady && !token) {
      router.push('/');
    }
  }, [router.isReady, token, router]);

  // 성공 시 카운트다운 시작
  useEffect(() => {
    if (!isSuccess) return;

    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [isSuccess, router]);

  const validatePassword = (password: string): string | null => {
    if (!password) {
      return '비밀번호를 입력해주세요.';
    }
    
    // 8자 이상 체크
    if (password.length < 8) {
      return '8자리 이상의 대소문자, 숫자, 특수문자를 사용해 주세요.';
    }
    
    // 대소문자, 숫자, 특수문자 포함 체크
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    
    if (!hasLowerCase || !hasUpperCase || !hasNumber || !hasSpecialChar) {
      return '8자리 이상의 대소문자, 숫자, 특수문자를 사용해 주세요.';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 비밀번호 유효성 검사
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // 비밀번호 확인 일치 검사
    if (newPassword !== confirmPassword) {
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!token || typeof token !== 'string') {
      setError('유효하지 않은 토큰입니다.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, errors } = await resetPasswordMutation({
        variables: {
          token: token,
          newPassword: newPassword,
        },
      });

      // GraphQL errors 배열 확인
      if (errors && errors.length > 0) {
        const errorMessage = errors[0]?.message || '비밀번호 재설정에 실패했습니다.';
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      // 성공한 경우에만 성공 메시지 표시
      setIsSuccess(true);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage = error?.graphQLErrors?.[0]?.message || error?.message || '비밀번호 재설정에 실패했습니다.';
      setError(errorMessage);
    }
  };

  if (!router.isReady) {
    return (
      <S.Container>
        <S.Card>
          <S.Title>로딩 중...</S.Title>
        </S.Card>
      </S.Container>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <S.Container>
      <S.Card>
        <S.Title>비밀번호 재설정</S.Title>
        <S.Subtitle>새로운 비밀번호를 입력해주세요</S.Subtitle>

        {isSuccess ? (
          <S.SuccessMessage>
            <S.SuccessText>
              비밀번호가 성공적으로 재설정되었습니다.<br />
              {countdown}초 후 홈 화면으로 이동합니다.
            </S.SuccessText>
          </S.SuccessMessage>
        ) : (
          <>
            {error && (
              <S.ErrorAlert>
                <S.ErrorText>{error}</S.ErrorText>
              </S.ErrorAlert>
            )}

            <S.Form onSubmit={handleSubmit}>
              <S.FormGroup>
                <S.Label htmlFor="newPassword">새 비밀번호</S.Label>
                <S.Input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="최소 8자 이상 입력해주세요"
                  disabled={isLoading || mutationLoading}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="confirmPassword">비밀번호 확인</S.Label>
                <S.Input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호를 다시 입력해주세요"
                  disabled={isLoading || mutationLoading}
                />
              </S.FormGroup>

              <S.SubmitButton
                type="submit"
                disabled={isLoading || mutationLoading || !newPassword || !confirmPassword}
              >
                {isLoading || mutationLoading ? '처리 중...' : '비밀번호 재설정'}
              </S.SubmitButton>
            </S.Form>
          </>
        )}
      </S.Card>
    </S.Container>
  );
}
