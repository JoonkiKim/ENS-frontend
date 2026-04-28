import { useRouter } from 'next/router';
import BoardView from "../../../../src/components/commons/units/board/fetchBoard/fetchBoard.container";
import AuthGate from "../../../../src/commons/hooks/authGate";

export default function BoardViewPage() {
  const router = useRouter();
  const { boardId } = router.query;

  if (!boardId || typeof boardId !== 'string') {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <AuthGate>
      <BoardView boardId={boardId} />
    </AuthGate>
  );
}
