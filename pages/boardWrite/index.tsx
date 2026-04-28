import BoardCreate from "../../src/components/commons/units/board/createBoard/createBoard.container";
import AuthGate from "../../src/commons/hooks/authGate";


export default function BoardCreatePage() {
  return (
    <AuthGate>
      <BoardCreate />
    </AuthGate>
  );
}
