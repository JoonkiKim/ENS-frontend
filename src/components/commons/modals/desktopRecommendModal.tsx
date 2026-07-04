import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useMediaQuery } from "../../../commons/hooks/useMediaQuery";

const STORAGE_KEY = "ens-intranet-desktop-recommend-dismissed";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 3vh 4vw;
`;

const Modal = styled.div`
  width: 92%;
  max-width: 92vw;
  background: white;
  border-radius: 3.2vmin;
  overflow: hidden;
  font-family: "Inter", "Noto Sans KR", sans-serif;
  box-shadow: 0 2vmin 8vmin rgba(0, 0, 0, 0.18);
`;

const ModalHeader = styled.div`
  padding: 5vh 6vw 0;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 14vmin;
  height: 14vmin;
  margin: 0 auto 2.5vh;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff8e1 0%, #ffe082 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7vmin;
`;

const Title = styled.h2`
  margin: 0 0 1.8vh;
  font-size: 4.8vw;
  font-weight: 700;
  color: #2c2c2c;
  letter-spacing: -0.02em;
  line-height: 1.4;
`;

const Description = styled.p`
  margin: 0;
  font-size: 3.5vw;
  font-weight: 400;
  color: #4e4e4e;
  line-height: 1.6;
  letter-spacing: -0.02em;
`;

const ModalBody = styled.div`
  padding: 4vh 6vw 5vh;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
`;

const PrimaryButton = styled.button`
  width: 100%;
  height: calc(var(--vh, 1vh) * 6.5);
  border: none;
  border-radius: 2vmin;
  background: #ffb700;
  color: #2c2c2c;
  font-size: 4vw;
  font-weight: 600;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #e6a500;
  }

  &:active {
    background: #cc9200;
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  height: calc(var(--vh, 1vh) * 6.5);
  border: 1px solid #d9d9d9;
  border-radius: 2vmin;
  background: white;
  color: #2c2c2c;
  font-size: 4vw;
  font-weight: 500;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #fafafa;
  }

  &:active {
    background: #f0f0f0;
  }
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  margin-top: 0.8vh;
  font-size: 3.4vw;
  color: #757575;
  cursor: pointer;
  user-select: none;

  input {
    width: 4vmin;
    height: 4vmin;
    accent-color: #ffb700;
    cursor: pointer;
  }
`;

function isDismissedPermanently(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export default function DesktopRecommendModal() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [visible, setVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    if (isMobile && !isDismissedPermanently()) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isMobile]);

  const handleCopyLink = useCallback(async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setCopyFeedback(true);
      window.setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      window.prompt("아래 주소를 PC 브라우저에 붙여넣어 주세요.", url);
    }
  }, []);

  const handleContinueOnMobile = useCallback(() => {
    if (dontShowAgain) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    setVisible(false);
  }, [dontShowAgain]);

  if (!visible) return null;

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="desktop-recommend-title"
    >
      <Modal>
        <ModalHeader>
          <IconWrapper aria-hidden="true">💻</IconWrapper>
          <Title id="desktop-recommend-title">PC 접속을 권장합니다</Title>
          <Description>
            ENS 인트라넷은 PC 환경에 최적화되어 있습니다. 원활한 이용을 위해
            <br />
            PC 브라우저에서 접속해 주세요.
          </Description>
        </ModalHeader>

        <ModalBody>
          <PrimaryButton type="button" onClick={handleCopyLink}>
            {copyFeedback ? "링크가 복사되었습니다" : "링크 복사하기"}
          </PrimaryButton>
          <SecondaryButton type="button" onClick={handleContinueOnMobile}>
            모바일로 계속 보기
          </SecondaryButton>
          <CheckboxRow>
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            다시 보지 않기
          </CheckboxRow>
        </ModalBody>
      </Modal>
    </Overlay>
  );
}
