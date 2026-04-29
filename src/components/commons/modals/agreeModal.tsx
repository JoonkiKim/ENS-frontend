import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import SignUpAlert from "./signUpAlert";

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
  font-family: "Inter", "Noto Sans KR", sans-serif;
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
    content: "";
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
  width: 20%;
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
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepIndicator = styled.div<{ active?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid ${({ active }) => (active ? "#ffb700" : "#e4e4e7")};
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
    content: "";
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

  &::-webkit-scrollbar-button {
    display: none;
    height: 0;
    width: 0;
  }

  &::-webkit-scrollbar-button:vertical:start:decrement,
  &::-webkit-scrollbar-button:vertical:end:increment {
    display: none;
    height: 0;
    width: 0;
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
    content: "";
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
  background: ${({ disabled }) => (disabled ? "#e4e4e7" : "#ffb700")};
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  letter-spacing: -0.28px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
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
  const modalRootRef = useRef<HTMLDivElement>(null);
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeAge, setAgreeAge] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // 모달이 열릴 때 body 스크롤 막기 (스크롤바는 유지)
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      // 스크롤바는 유지하되 스크롤만 막기
      document.body.style.overflowY = "scroll";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // 배경 페이지 스크롤만 막기 (모달 안 스크롤·휠은 허용)
      const preventScroll = (e: Event) => {
        const target = e.target;
        if (target instanceof Node && modalRootRef.current?.contains(target)) {
          return;
        }
        e.preventDefault();
        window.scrollTo(0, scrollY);
      };

      window.addEventListener("scroll", preventScroll, { passive: false });
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        // 모달이 닫힐 때 스크롤 복원
        window.removeEventListener("scroll", preventScroll);
        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("touchmove", preventScroll);
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflowY = "";
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
      setAlertMessage(
        "만 14세 미만은 가입이 불가합니다. 만 14세 이상임을 확인해주세요."
      );
      setIsAlertOpen(true);
      return;
    }

    // 이용약관 동의와 개인정보 수집 및 이용 동의 중 하나라도 체크 안 했으면 alert 표시
    if (!agreeTerms || !agreePrivacy) {
      setAlertMessage(
        "이용약관 및 개인정보 처리방침에 동의하셔야 가입이 가능합니다."
      );
      setIsAlertOpen(true);
      return;
    }

    if (canSubmit && onSubmit) {
      onSubmit();
    }
  };

  return (
    <>
      <ModalOverlay ref={modalRootRef} onClick={handleOverlayClick}>
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
                  <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{`제1조 목적

본 이용약관은 "ENS Intranet"(이하 "사이트")의 서비스의 이용조건과 운영에 관한 제반 사항 규정을 목적으로 합니다.

제2조 용어의 정의

본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.
① 회원 : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다.
② 이용계약 : 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약을 말합니다.
③ 회원 아이디(이하 "ID") : 회원의 식별과 회원의 서비스 이용을 위하여 회원별로 부여하는 고유한 문자와 숫자의 조합을 말합니다.
④ 비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의 권익 보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말합니다.
⑤ 운영자 : 서비스에 홈페이지를 개설하여 운영하는 운영자를 말합니다.
⑥ 해지 : 회원이 이용계약을 해약하는 것을 말합니다.
제3조 약관 외 준칙운영자는 필요한 경우 별도로 운영정책을 공지 안내할 수 있으며, 본 약관과 운영정책이 중첩될 경우 운영정책이 우선 적용됩니다.

제4조 이용계약 체결

① 이용계약은 회원으로 등록하여 사이트를 이용하려는 자의 본 약관 내용에 대한 동의와 가입신청에 대하여 운영자의 이용승낙으로 성립합니다.
② 회원으로 등록하여 서비스를 이용하려는 자는 사이트 가입신청 시 본 약관을 읽고 아래에 있는 "동의합니다"를 선택하는 것으로 본 약관에 대한 동의 의사 표시를 합니다.

제5조 서비스 이용 신청

① 회원으로 등록하여 사이트를 이용하려는 이용자는 사이트에서 요청하는 제반정보(이용자ID,비밀번호, 닉네임 등)를 제공해야 합니다.
② 타인의 정보를 도용하거나 허위의 정보를 등록하는 등 본인의 진정한 정보를 등록하지 않은 회원은 사이트 이용과 관련하여 아무런 권리를 주장할 수 없으며, 관계 법령에 따라 처벌받을 수 있습니다.

제6조 개인정보처리방침

사이트 및 운영자는 회원가입 시 제공한 개인정보 중 비밀번호를 가지고 있지 않으며 이와 관련된 부분은 사이트의 개인정보처리방침을 따릅니다.
운영자는 관계 법령이 정하는 바에 따라 회원등록정보를 포함한 회원의 개인정보를 보호하기 위하여 노력합니다.
회원의 개인정보보호에 관하여 관계법령 및 사이트가 정하는 개인정보처리방침에 정한 바에 따릅니다.
단, 회원의 귀책 사유로 인해 노출된 정보에 대해 운영자는 일체의 책임을 지지 않습니다.운영자는 회원이 미풍양속에 저해되거나 국가안보에 위배되는 게시물 등 위법한 게시물을 등록 · 배포할 경우 관련 기관의 요청이 있을 시 회원의 자료를 열람 및 해당 자료를 관련 기관에 제출할 수 있습니다.

제7조 운영자의 의무

① 운영자는 이용회원으로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는 가급적 빨리 처리하여야 합니다. 다만, 개인적인 사정으로 신속한 처리가 곤란한 경우에는 사후에 공지 또는 이용회원에게 쪽지, 전자우편 등을 보내는 등 최선을 다합니다.
② 운영자는 계속적이고 안정적인 사이트 제공을 위하여 설비에 장애가 생기거나 유실된 때에는 이를 지체 없이 수리 또는 복구할 수 있도록 사이트에 요구할 수 있습니다. 다만, 천재지변 또는 사이트나 운영자에 부득이한 사유가 있는 경우, 사이트 운영을 일시 정지할 수 있습니다.

제8조 회원의 의무

① 회원은 본 약관에서 규정하는 사항과 운영자가 정한 제반 규정, 공지사항 및 운영정책 등 사이트가 공지하는 사항 및 관계 법령을 준수하여야 하며, 기타 사이트의 업무에 방해가 되는 행위, 사이트의 명예를 손상하는 행위를 해서는 안 됩니다.
② 회원은 사이트의 명시적 동의가 없는 한 서비스의 이용 권한, 기타 이용계약상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.
③ 이용고객은 아이디 및 비밀번호 관리에 상당한 주의를 기울여야 하며, 운영자나 사이트의 동의 없이 제3자에게 아이디를 제공하여 이용하게 할 수 없습니다.
④ 회원은 운영자와 사이트 및 제3자의 지적 재산권을 침해해서는 안 됩니다.

제9조 서비스 이용 시간

① 서비스 이용 시간은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 단, 사이트는 시스템 정기점검, 증설 및 교체를 위해 사이트가 정한 날이나 시간에 서비스를 일시중단 할 수 있으며 예정된 작업으로 인한 서비스 일시 중단은 사이트의 홈페이지에 사전에 공지하오니 수시로 참고하시길 바랍니다.
② 단, 사이트는 다음 경우에 대하여 사전 공지나 예고 없이 서비스를 일시적 혹은 영구적으로 중단할 수 있습니다.- 긴급한 시스템 점검, 증설, 교체, 고장 혹은 오동작을 일으키는 경우- 국가비상사태, 정전, 천재지변 등의 불가항력적인 사유가 있는 경우- 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지한 경우- 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우
③ 전항에 의한 서비스 중단의 경우 사이트는 사전에 공지사항 등을 통하여 회원에게 통지합니다. 단, 사이트가 통제할 수 없는 사유로 발생한 서비스의 중단에 대하여 사전공지가 불가능한 경우에는 사후공지로 대신합니다.

제10조 서비스 이용 해지

① 회원이 사이트와의 이용계약을 해지하고자 하는 경우에는 회원 본인이 온라인을 통하여 등록해지 신청을 하여야 합니다. 한편, 사이트 이용 해지와 별개로 사이트에 대한 이용계약 해지는 별도로 하셔야 합니다.
② 해지 신청과 동시에 사이트가 제공하는 사이트 관련 프로그램이 회원 관리 화면에서 자동적으로 삭제됨으로 운영자는 더 이상 해지신청자의 정보를 볼 수 없습니다.

제11조 서비스 이용 제한

회원은 다음 각호에 해당하는 행위를 하여서는 아니 되며 해당 행위를 한 경우에 사이트는 회원의 서비스 이용 제한 및 적법한 조치를 할 수 있으며 이용계약을 해지하거나 기간을 정하여 서비스를 중지할 수 있습니다.
① 회원 가입시 혹은 가입 후 정보 변경 시 허위 내용을 등록하는 행위
② 타인의 사이트 이용을 방해하거나 정보를 도용하는 행위
③ 사이트의 운영진, 직원 또는 관계자를 사칭하는 행위
④ 사이트, 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를 방해하는 행위
⑤ 다른 회원의 ID를 부정하게 사용하는 행위
⑥ 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위
⑦ 범죄와 결부된다고 객관적으로 판단되는 행위
⑧ 기타 관련 법령에 위배되는 행위

제12조 게시물의 관리

① 사이트의 게시물과 자료의 관리 및 운영의 책임은 운영자에게 있습니다. 운영자는 항상 불량 게시물 및 자료에 대하여 모니터링을 하여야 하며, 불량 게시물 및 자료를 발견하거나 신고를 받으면 해당 게시물 및 자료를 삭제하고 이를 등록한 회원에게 주의를 주어야 합니다.한편, 이용회원이 올린 게시물에 대해서는 게시자 본인에게 책임이 있으니 회원 스스로 본 이용약관에서 위배되는 게시물은 게재해서는 안 됩니다.
② 정보통신윤리위원회 등 공공기관의 시정요구가 있는 경우 운영자는 회원의 사전동의 없이 게시물을 삭제하거나 이동 할 수 있습니다.
③ 불량게시물의 판단기준은 다음과 같습니다.- 다른 회원 또는 제3자에게 심한 모욕을 주거나 명예를 손상하는 내용인 경우- 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크 시키는 경우- 불법 복제 또는 해킹을 조장하는 내용인 경우- 영리를 목적으로 하는 광고일 경우- 범죄와 결부된다고 객관적으로 인정되는 내용일 경우- 다른 이용자 또는 제3자와 저작권 등 기타 권리를 침해하는 경우- 기타 관계 법령에 위배된다고 판단되는 경우
④ 사이트 및 운영자는 게시물 등에 대하여 제3자로부터 명예훼손, 지적재산권 등의 권리 침해를 이유로 게시중단 요청을 받은 경우 이를 임시로 게시 중단(전송중단)할 수 있으며, 게시중단 요청자와 게시물 등록자 간에 소송, 합의 기타 이에 준하는 관련 기관의 결정 등이 이루어져 사이트에 접수된 경우 이에 따릅니다.

제13조 게시물의 보관

사이트 운영자가 불가피한 사정으로 본 사이트를 중단하게 될 경우, 회원에게 사전 공지를 하고 게시물의 이전이 쉽도록 모든 조치를 하기 위해 노력합니다.

제14조 게시물에 대한 저작권

① 회원이 사이트 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 또한 사이트는 게시자의 동의 없이 게시물을 상업적으로 이용할 수 없습니다. 다만 비영리 목적인 경우는 그러하지 아니하며, 또한 서비스 내의 게재권을 갖습니다.
② 회원은 서비스를 이용하여 취득한 정보를 임의 가공, 판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다.
③ 운영자는 회원이 게시하거나 등록하는 사이트 내의 내용물, 게시 내용에 대해 제12조 각호에 해당한다고 판단되는 경우 사전통지 없이 삭제하거나 이동 또는 등록 거부할 수 있습니다.

제15조 손해배상

① 본 사이트의 발생한 모든 민, 형법상 책임은 회원 본인에게 1차적으로 있습니다.
② 본 사이트로부터 회원이 받은 손해가 천재지변 등 불가항력적이거나 회원의 고의 또는 과실로 인하여 발생한 때에는 손해배상을 하지 않습니다.

제16조 면책

① 운영자는 회원이 사이트의 서비스 제공으로부터 기대되는 이익을 얻지 못하였거나 서비스 자료에 대한 취사선택 또는 이용으로 발생하는 손해 등에 대해서는 책임이 면제됩니다.
② 운영자는 본 사이트의 서비스 기반 및 타 통신업자가 제공하는 전기통신 서비스의 장애로 인한 경우에는 책임이 면제되며 본 사이트의 서비스 기반과 관련되어 발생한 손해에 대해서는 사이트의 이용약관에 준합니다
③ 운영자는 회원이 저장, 게시 또는 전송한 자료와 관련하여 일체의 책임을 지지 않습니다.
④ 운영자는 회원의 귀책 사유로 인하여 서비스 이용의 장애가 발생한 경우에는 책임지지 아니합니다.
⑤ 운영자는 회원 상호 간 또는 회원과 제3자 상호 간, 기타 회원의 본 서비스 내외를 불문한 일체의 활동(데이터 전송, 기타 커뮤니티 활동 포함)에 대하여 책임을 지지 않습니다.
⑥ 운영자는 회원이 게시 또는 전송한 자료 및 본 사이트로 회원이 제공받을 수 있는 모든 자료들의 진위, 신뢰도, 정확성 등 그 내용에 대해서는 책임지지 아니합니다.
⑦ 운영자는 회원 상호 간 또는 회원과 제3자 상호 간에 서비스를 매개로 하여 물품거래 등을 한 경우에 그로부터 발생하는 일체의 손해에 대하여 책임지지 아니합니다.
⑧ 운영자는 운영자의 귀책 사유 없이 회원간 또는 회원과 제3자간에 발생한 일체의 분쟁에 대하여 책임지지 아니합니다.
⑨ 운영자는 서버 등 설비의 관리, 점검, 보수, 교체 과정 또는 소프트웨어의 운용 과정에서 고의 또는 고의에 준하는 중대한 과실 없이 발생할 수 있는 시스템의 장애, 제3자의 공격으로 인한 시스템의 장애, 국내외의 저명한 연구기관이나 보안 관련 업체에 의해 대응 방법이 개발되지 아니한 컴퓨터 바이러스 등의 유포나 기타 운영자가 통제할 수 없는 불가항력적 사유로 인한 회원의 손해에 대하여 책임지지 않습니다.

부칙

이 약관은 2026.4.29부터 시행합니다.`}</p>
                </TextBox>
                {/* <ScrollIcon /> */}
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
                  <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{`1. 개인정보 수집목적 및 이용목적

(1) 홈페이지 회원 가입 및 관리
회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증, 회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정 이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의 여부 확인, 각종 고지․통지, 고충 처리 등의 목적

(2) 재화 또는 서비스 제공
물품 배송, 서비스 제공, 계약서․청구서 발송, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 연령인증, 요금 결제 및 정산, 채권추심 등의 목적

(3) 고충 처리
민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리 결과 통보 등

2. 수집하는 개인정보 항목
ID, 성명, 비밀번호, 주소, 휴대폰 번호, 이메일, 14세 미만 가입자의 경우 법정대리인 정보

3. 개인정보 보유 및 이용기간
회원탈퇴 시까지 (단, 관계 법령에 보존 근거가 있는 경우 해당 기간 시까지 보유, 개인정보처리방침에서 확인 가능)`}</p>
                </TextBox>
                {/* <ScrollIcon /> */}
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
