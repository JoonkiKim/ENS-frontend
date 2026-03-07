import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 50px 20px;

  font-family: 'Inter', 'Noto Sans KR', sans-serif;
`;

export const Card = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 0;
  padding: 35px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1e1e1e;
  margin: 0 0 8px 0;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 28px 0;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2c;
  letter-spacing: -0.28px;
`;

export const Input = styled.input`
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
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 12px;
  color: #e74c3c;
  margin: 0;
  min-height: 16px;
`;

export const SubmitButton = styled.button`
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
  margin-top: 6px;
  
  &:hover:not(:disabled) {
    background: #e6a500;
  }
  
  &:active:not(:disabled) {
    background: #cc9400;
  }
  
  &:disabled {
    background: #d9d9d9;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const SuccessMessage = styled.div`
  padding: 18px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 3px;
  text-align: center;
  margin-bottom: 20px;
`;

export const SuccessText = styled.p`
  font-size: 14px;
  color: #0369a1;
  margin: 0;
  line-height: 1.5;
`;

export const ErrorAlert = styled.div`
  padding: 18px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 3px;
  text-align: center;
  margin-bottom: 20px;
`;

export const ErrorText = styled.p`
  font-size: 14px;
  color: #dc2626;
  margin: 0;
  line-height: 1.5;
`;
