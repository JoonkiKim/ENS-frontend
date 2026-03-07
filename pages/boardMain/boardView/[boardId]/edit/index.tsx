import { useRouter } from 'next/router';
import BoardCreate from "../../../../../src/components/commons/units/board/createBoard/createBoard.container";

export default function BoardEditPage() {
  const router = useRouter();
  const { boardId } = router.query;

  if (!boardId || typeof boardId !== 'string') {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return <BoardCreate isEdit={true} boardId={boardId} />;
}
