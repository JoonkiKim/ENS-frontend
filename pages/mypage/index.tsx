import MyPageContainer from "../../src/components/commons/units/mypage/mypage.container";
import AuthGate from "../../src/commons/hooks/authGate";

export default function MyPage() {
  return (
    <AuthGate>
      <MyPageContainer />
    </AuthGate>
  );
}
