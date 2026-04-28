import BoardMain from "../../src/components/commons/units/board/boardMain/boardMain.container";
import AuthGate from "../../src/commons/hooks/authGate";

export default function BoardMainPage() {
  return (
    <AuthGate>
      <BoardMain />
    </AuthGate>
  );
}
