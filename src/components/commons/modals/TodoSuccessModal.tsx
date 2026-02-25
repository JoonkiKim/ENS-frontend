import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

interface TodoSuccessModalProps {
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

export default function TodoSuccessModal({
  isOpen,
  onClose,
  theme,
}: TodoSuccessModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // 1초 후에 투두 리스트로 이동
      const timer = setTimeout(() => {
        onClose();
        router.push("/todoList");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, router]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <SuccessIcon theme={theme}>✓</SuccessIcon>

        <ModalTitle>투두가 저장되었습니다</ModalTitle>

        <ModalDescription>
          새로운 할 일을 성공적으로 추가했습니다.
          <br />
          잠시 후 투두 리스트로 이동합니다...
        </ModalDescription>
      </ModalContent>
    </ModalOverlay>
  );
}
