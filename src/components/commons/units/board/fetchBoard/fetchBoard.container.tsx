import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FETCH_BOARD, FETCH_LOGIN_USER, DELETE_BOARD, FETCH_ALL_BOARDS } from '../../../../../commons/apis/graphql-queries';
import MessageModal from '../../../modals/messageModal';
import * as S from './fetchBoard.style';

interface BoardViewProps {
  boardId: string;
}

export default function BoardView({ boardId }: BoardViewProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery(FETCH_BOARD, {
    variables: { boardId },
  });
  const { data: loginUserData } = useQuery(FETCH_LOGIN_USER);
  const [deleteBoardMutation] = useMutation(DELETE_BOARD);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  // 카테고리 매핑
  const categoryMap: Record<string, string> = {
    'NOTICE': '학회 공지',
    'RECRUITMENT': '채용 공고',
    'ETC': '기타',
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  if (loading) {
    return (
      <S.Container>
        <div>로딩 중...</div>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <div>에러가 발생했습니다: {error.message}</div>
      </S.Container>
    );
  }

  if (!data?.fetchBoard) {
    return (
      <S.Container>
        <div>게시글을 찾을 수 없습니다.</div>
      </S.Container>
    );
  }

  const board = data.fetchBoard;
  const loginUser = loginUserData?.fetchLoginUser;
  const isAuthor = loginUser?.id === board.user?.id;
  const isAdmin = loginUser?.role === 'ADMIN';
  const canEditOrDelete = isAuthor || isAdmin;

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteBoardMutation({
        variables: { boardId },
        refetchQueries: [{ query: FETCH_ALL_BOARDS }],
      });
      router.push('/boardMain');
    } catch (error: any) {
      console.error('게시글 삭제 실패:', error);
      const errorMsg = error?.graphQLErrors?.[0]?.message || error?.message || '게시글 삭제에 실패했습니다.';
      setDeleteErrorMessage(errorMsg);
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <>
      <MessageModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        message={deleteErrorMessage}
      />
      <S.Container>
        {/* Breadcrumb */}
        <S.Breadcrumb>
          <S.BreadcrumbItem>자유 게시판</S.BreadcrumbItem>
          <S.BreadcrumbSeparator />
          <S.BreadcrumbItem>게시물 열람</S.BreadcrumbItem>
        </S.Breadcrumb>

        {/* Content */}
        <S.ContentSection>
          <S.PostHeader>
          <S.PostMetaWrapper>
            <S.TitleWrapper>
              <S.CategoryBadge>{categoryMap[board.category] || board.category}</S.CategoryBadge>
              <S.PostTitle>{board.title}</S.PostTitle>
            </S.TitleWrapper>
           
              <S.PostMeta>
                <S.PostDate>{formatDate(board.createdAt)}</S.PostDate>
                <S.PostAuthor>작성자: {board.user?.name || ''}</S.PostAuthor>
              </S.PostMeta>
              </S.PostMetaWrapper>
              {canEditOrDelete && (
                <S.ActionButtons>
                  <Link href={`/boardMain/boardView/${boardId}/edit`}>
                    <S.EditButton>수정</S.EditButton>
                  </Link>
                  <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
                </S.ActionButtons>
              )}

            
          </S.PostHeader>
        

          <S.PostBody>
            <div dangerouslySetInnerHTML={{ __html: board.content }} />
          </S.PostBody>

          {/* 이미지가 있으면 표시 */}
          {board.imageUrl && (
            <S.PostImage>
              <img src={board.imageUrl} alt={board.title} />
            </S.PostImage>
          )}

          <Link href="/boardMain">
            <S.BackButton>목록으로</S.BackButton>
          </Link>
        </S.ContentSection>
      </S.Container>
    </>
  );
}
