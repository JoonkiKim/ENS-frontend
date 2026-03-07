import { useEffect, useState } from 'react';
import MainPage from "../src/components/commons/units/mainPage.container";
import MessageModal from "../src/components/commons/modals/messageModal";

export default function Home() {
  const [showUnauthorizedMessage, setShowUnauthorizedMessage] = useState(false);

  useEffect(() => {
    // Session Storage 확인
    const unauthorized = sessionStorage.getItem('unauthorized');
    if (unauthorized === 'true') {
      setShowUnauthorizedMessage(true);
      sessionStorage.removeItem('unauthorized');
    }
  }, []);

  return (
    <>
      <div>
        <MainPage />
      </div>
      
      {/* 권한 없음 메시지 모달 */}
      {showUnauthorizedMessage && (
        <MessageModal
          isOpen={showUnauthorizedMessage}
          onClose={() => setShowUnauthorizedMessage(false)}
          message="운영진만 접근가능합니다"
        />
      )}
    </>
  );
}
