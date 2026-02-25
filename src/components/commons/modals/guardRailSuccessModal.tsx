import React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

interface GuardRailSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: {
    button: string;
    buttonHover: string;
    chip: string;
    accentText: string;
    ring: string;
  };
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const SuccessIcon = styled.div<{ theme: any }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${(props) => props.theme.button};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 24px;
  color: white;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
`;

const ModalDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PrimaryButton = styled.button<{ theme: any }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: ${(props) => props.theme.button};
  color: white;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.buttonHover};
  }
`;

const SecondaryButton = styled.button<{ theme: any }>`
  padding: 10px 20px;
  font-size: 13px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: ${(props) => props.theme.chip};
  color: #374151;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.chip.replace("50", "100")};
  }
`;

export default function GuardRailSuccessModal({
  isOpen,
  onClose,
  theme,
}: GuardRailSuccessModalProps) {
  const router = useRouter();

  const handleTodoClick = () => {
    onClose();
    router.push("/todoList"); // to-do 페이지로 이동
  };

  const handleCloseModal = () => {
    onClose();
    router.push("/"); // 메인 페이지로 이동
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <SuccessIcon theme={theme}>✓</SuccessIcon>

        <ModalTitle>가드레일이 저장되었습니다</ModalTitle>

        <ModalDescription>
          오늘의 생각을 잘 정리하셨네요.
          <br />
          이제 할 일도 확인해보시겠어요?
        </ModalDescription>

        <ButtonContainer>
          <PrimaryButton theme={theme} onClick={handleTodoClick}>
            📝 To-Do 보러가기
          </PrimaryButton>

          <SecondaryButton theme={theme} onClick={handleCloseModal}>
            나중에 하기
          </SecondaryButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}
