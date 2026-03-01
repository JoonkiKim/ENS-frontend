
import styled from '@emotion/styled';




// Alert Overlay
const AlertOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// Alert Container
const AlertContainer = styled.div`
  width: 364px;
  height: 90px;
  background: white;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  position: relative;
`;

// Alert Message
const AlertMessage = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #2c2c2c;
  letter-spacing: -0.24px;
  line-height: 1.2;
  margin: 0;
  padding: 19px 25px 12px 25px;
`;

// Divider
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #d9d9d9;
  margin: 0;
`;

// Button Container
const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 25px;
`;

// Close Button
const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #ffb700;
  letter-spacing: -0.28px;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: #e6a500;
  }
  
  &:active {
    color: #cc9400;
  }
`;

// Types
interface SignUpAlertProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SignUpAlert({ isOpen, onClose, message }: SignUpAlertProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>

      <AlertOverlay onClick={handleOverlayClick}>
        <AlertContainer>
          <AlertMessage>
            {message}
          </AlertMessage>
          <Divider />
          <ButtonContainer>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ButtonContainer>
        </AlertContainer>
      </AlertOverlay>
    </>
  );
}
