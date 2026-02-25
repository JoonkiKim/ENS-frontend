import React from "react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
  type?: "success" | "info" | "warning" | "error";
  theme?: {
    accentBg: string;
    accentText: string;
    button: string;
    buttonHover: string;
  };
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText = "확인",
  type = "success",
  theme,
}) => {
  if (!isOpen) return null;

  // 타입별 아이콘과 색상 설정
  const getTypeConfig = () => {
    switch (type) {
      case "error":
        return {
          icon: "❌",
          iconBg: "#fef2f2",
          buttonBg: "#ef4444",
          buttonHover: "#dc2626",
        };
      case "warning":
        return {
          icon: "⚠️",
          iconBg: "#fffbeb",
          buttonBg: "#f59e0b",
          buttonHover: "#d97706",
        };
      case "info":
        return {
          icon: "ℹ️",
          iconBg: "#eff6ff",
          buttonBg: "#3b82f6",
          buttonHover: "#2563eb",
        };
      case "success":
      default:
        return {
          icon: "✅",
          iconBg: "#f0fdf4",
          buttonBg: "#16a34a",
          buttonHover: "#15803d",
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

          {/* 모달 버튼 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: "12px 32px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: typeConfig.buttonBg,
                color: "white",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                minWidth: "120px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = typeConfig.buttonHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = typeConfig.buttonBg;
              }}
            >
              {buttonText}
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

export default AlertModal;
