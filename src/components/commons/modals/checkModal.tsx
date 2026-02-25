{
  /* <CheckModal
isOpen={showModal}
onClose={handleClose}
onConfirm={handleConfirm}
title="삭제 확인"
message="정말로 삭제하시겠습니까?"
confirmText="삭제"
cancelText="취소"
isLoading={isLoading}
type="danger"
/> */
}

interface CheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  type?: "warning" | "info" | "danger";
  theme?: {
    accentBg: string;
    accentText: string;
    button: string;
    buttonHover: string;
  };
}

const CheckModal: React.FC<CheckModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  isLoading = false,
  type = "warning",
  theme,
}) => {
  if (!isOpen) return null;

  // 타입별 아이콘과 색상 설정
  const getTypeConfig = () => {
    switch (type) {
      case "danger":
        return {
          icon: "⚠️",
          iconBg: "#fef2f2",
          confirmBg: "#ef4444",
          confirmHover: "#dc2626",
        };
      case "info":
        return {
          icon: "ℹ️",
          iconBg: "#eff6ff",
          confirmBg: "#3b82f6",
          confirmHover: "#2563eb",
        };
      case "warning":
      default:
        return {
          icon: "⚠️",
          iconBg: "#fffbeb",
          confirmBg: "#f59e0b",
          confirmHover: "#d97706",
        };
    }
  };

  const typeConfig = getTypeConfig();

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "fadeIn 0.3s ease-out",
        }}
        onClick={onClose}
      >
        {/* 모달 컨텐츠 */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "32px",
            maxWidth: "400px",
            width: "90%",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            animation: "slideInFromTop 0.3s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 모달 아이콘 */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: typeConfig.iconBg,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                marginBottom: "16px",
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                  fontSize: "inherit",
                  transform: "translateY(-2px)",
                }}
              >
                {typeConfig.icon}
              </span>
            </div>
          </div>

          {/* 모달 제목 */}
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#1f2937",
              textAlign: "center",
              margin: "0 0 12px 0",
            }}
          >
            {title}
          </h2>

          {/* 모달 내용 */}
          <p
            style={{
              fontSize: "16px",
              color: "#6b7280",
              textAlign: "center",
              margin: "0 0 24px 0",
              lineHeight: "1.5",
            }}
          >
            {message}
          </p>

          {/* 모달 버튼들 */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <button
              onClick={onClose}
              disabled={isLoading}
              style={{
                padding: "12px 24px",
                borderRadius: "12px",
                border: "2px solid #e5e7eb",
                backgroundColor: "white",
                color: "#6b7280",
                fontSize: "16px",
                fontWeight: "500",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.6 : 1,
                transition: "all 0.2s ease",
                minWidth: "100px",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }
              }}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              style={{
                padding: "12px 24px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: typeConfig.confirmBg,
                color: "white",
                fontSize: "16px",
                fontWeight: "500",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.6 : 1,
                transition: "all 0.2s ease",
                minWidth: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor =
                    typeConfig.confirmHover;
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = typeConfig.confirmBg;
                }
              }}
            >
              {isLoading ? (
                <>
                  <span>⏳</span>
                  처리 중...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CSS 애니메이션 */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slideInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default CheckModal;
