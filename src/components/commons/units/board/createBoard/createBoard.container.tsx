import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD, FETCH_LOGIN_USER, FETCH_ALL_BOARDS } from '../../../../../commons/apis/graphql-queries';
import MessageModal from '../../../modals/messageModal';
import * as S from './createBoard.style';

// react-quill을 dynamic import로 로드 (SSR 방지)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface FormData {
  category: string;
  title: string;
  content: string;
}

interface BoardCreateProps {
  isEdit?: boolean;
  boardId?: string;
}

export default function BoardCreate({ isEdit = false, boardId }: BoardCreateProps) {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      category: '',
      title: '',
      content: '',
    },
  });

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const category = watch('category');
  const content = watch('content');

  // 로그인한 유저 정보 조회
  const { data: userData } = useQuery(FETCH_LOGIN_USER);
  const userName = userData?.fetchLoginUser?.name || '';

  // 수정 모드일 때 기존 게시글 데이터 조회
  const { data: boardData, loading: boardLoading } = useQuery(FETCH_BOARD, {
    variables: { boardId: boardId || '' },
    skip: !isEdit || !boardId,
  });

  // 게시판 생성/수정 mutation
  const [createBoardMutation, { loading: isCreating }] = useMutation(CREATE_BOARD);
  const [updateBoardMutation, { loading: isUpdating }] = useMutation(UPDATE_BOARD);
  const isSubmitting = isCreating || isUpdating;

  const categories = ['학회 공지', '채용 공고', '기타'];

  // 카테고리 매핑 (프론트엔드 표시명 -> 백엔드 enum)
  const categoryMap: Record<string, string> = {
    '학회 공지': 'NOTICE',
    '채용 공고': 'RECRUITMENT',
    '기타': 'ETC',
  };

  // 역매핑 (백엔드 enum -> 프론트엔드 표시명)
  const reverseCategoryMap: Record<string, string> = {
    'NOTICE': '학회 공지',
    'RECRUITMENT': '채용 공고',
    'ETC': '기타',
  };

  const handleCategoryClick = (selectedCategory: string) => {
    setValue('category', selectedCategory);
    setIsCategoryDropdownOpen(false);
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 처리
    if (isEdit && boardId) {
      router.push(`/boardMain/boardView/${boardId}`);
    } else {
      window.history.back();
    }
  };

  // 수정 모드일 때 기존 데이터를 폼에 채우기
  useEffect(() => {
    if (isEdit && boardData?.fetchBoard) {
      const board = boardData.fetchBoard;
      setValue('title', board.title);
      setValue('content', board.content);
      setValue('category', reverseCategoryMap[board.category] || board.category);
    }
  }, [isEdit, boardData, setValue]);

  const onSubmit = async (data: FormData) => {
    // 카테고리 검증
    if (!data.category) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    // 제목 검증
    if (!data.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    // 내용 검증 (HTML 태그 제거한 순수 텍스트만 체크)
    const textContent = data.content.replace(/<[^>]*>/g, '').trim();
    if (!textContent) {
      alert('내용을 입력해주세요.');
      return;
    }

    try {
      if (isEdit && boardId) {
        // 수정 모드
        const result = await updateBoardMutation({
          variables: {
            boardId,
            updateBoardInput: {
              title: data.title.trim(),
              category: categoryMap[data.category],
              content: data.content,
            },
          },
          refetchQueries: [{ query: FETCH_ALL_BOARDS }, { query: FETCH_BOARD, variables: { boardId } }],
        });

        // GraphQL 에러 체크
        if (result.errors && result.errors.length > 0) {
          const errorMsg = result.errors[0]?.message || '게시물 수정에 실패했습니다.';
          setErrorMessage(errorMsg);
          setIsErrorModalOpen(true);
          return;
        }

        // 성공 시 게시글 상세 페이지로 이동
        router.push(`/boardMain/boardView/${boardId}`);
      } else {
        // 생성 모드
        const result = await createBoardMutation({
          variables: {
            createBoardInput: {
              title: data.title.trim(),
              category: categoryMap[data.category],
              content: data.content,
            },
          },
          refetchQueries: [{ query: FETCH_ALL_BOARDS }],
        });

        // GraphQL 에러 체크
        if (result.errors && result.errors.length > 0) {
          const errorMsg = result.errors[0]?.message || '게시물 작성에 실패했습니다.';
          setErrorMessage(errorMsg);
          setIsErrorModalOpen(true);
          return;
        }

        // 성공 시 게시판 목록으로 이동
        router.push('/boardMain');
      }
    } catch (error: any) {
      console.error(isEdit ? '게시물 수정 실패:' : '게시물 작성 실패:', error);
      // GraphQL 에러 메시지 추출
      let errorMsg = isEdit ? '게시물 수정에 실패했습니다.' : '게시물 작성에 실패했습니다.';
      
      if (error?.graphQLErrors && error.graphQLErrors.length > 0) {
        errorMsg = error.graphQLErrors[0]?.message || errorMsg;
      } else if (error?.networkError) {
        errorMsg = '네트워크 오류가 발생했습니다. 다시 시도해주세요.';
      } else if (error?.message) {
        errorMsg = error.message;
      }
      
      setErrorMessage(errorMsg);
      setIsErrorModalOpen(true);
    }
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      const isDropdownElement = 
        target.closest('[data-dropdown-container]') ||
        target.closest('[data-dropdown-item]') ||
        target.closest('[data-dropdown-field]');
      
      if (!isDropdownElement) {
        if (isCategoryDropdownOpen) {
          setIsCategoryDropdownOpen(false);
        }
      }
    };

    if (isCategoryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoryDropdownOpen]);

  // 수정 모드일 때 로딩 중
  if (isEdit && boardLoading) {
    return (
      <S.Container>
        <div>로딩 중...</div>
      </S.Container>
    );
  }

  return (
    <>
      <MessageModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />
      <S.Container>


        {/* Breadcrumb */}
        <S.Breadcrumb>
          <S.BreadcrumbItem>자유 게시판</S.BreadcrumbItem>
          <S.BreadcrumbSeparator />
          <S.BreadcrumbItem>{isEdit ? '게시물 수정' : '게시물 작성'}</S.BreadcrumbItem>
        </S.Breadcrumb>

        {/* Content */}
        <S.ContentSection>
          {/* User Info */}
          <S.UserInfo>
          <S.Avatar>
                    <img
                      src="data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23E5E5E5'/%3E%3Cpath d='M24 24C27.3137 24 30 21.3137 30 18C30 14.6863 27.3137 12 24 12C20.6863 12 18 14.6863 18 18C18 21.3137 20.6863 24 24 24Z' fill='%23999'/%3E%3Cpath d='M24 27C17.3726 27 12 29.6863 12 33V36H36V33C36 29.6863 30.6274 27 24 27Z' fill='%23999'/%3E%3C/svg%3E"
                      alt="Profile"
                    />
                  </S.Avatar>
            <S.UserName>{userName || ''}</S.UserName>
          </S.UserInfo>

          {/* Form Fields */}
          <S.FormRow>
            <S.CategoryFieldWrapper>
              <S.CategoryField
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                }}
                data-dropdown-field
              >
                {category || '카테고리'}
                <input
                  type="hidden"
                  {...register('category')}
                />
                <S.DropdownArrow>
                  <svg viewBox="0 0 6.9282 5.25" fill="none">
                    <path d="M0 0L6.9282 0L3.4641 5.25Z" fill="#5F5F5F" />
                  </svg>
                </S.DropdownArrow>
              </S.CategoryField>
              {isCategoryDropdownOpen && (
                <S.CategoryDropdown data-dropdown-container>
                  {categories.map((cat) => (
                    <S.CategoryDropdownItem
                      key={cat}
                      data-dropdown-item
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(cat);
                      }}
                    >
                      {cat}
                    </S.CategoryDropdownItem>
                  ))}
                </S.CategoryDropdown>
              )}
            </S.CategoryFieldWrapper>
            <S.TitleInput
              type="text"
              placeholder="제목"
              {...register('title')}
            />
          </S.FormRow>

          {/* Rich Text Editor */}
          <S.EditorWrapper>
            <ReactQuill
              value={content}
              onChange={(value) => setValue('content', value)}
              placeholder="내용을 입력해주세요"
              theme="snow"
            />
          </S.EditorWrapper>

          {/* Action Buttons */}
          <S.ButtonRow>
            <S.CancelButton onClick={handleCancel} disabled={isSubmitting}>취소</S.CancelButton>
            <S.SubmitButton onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
              {isSubmitting 
                ? (isEdit ? '수정 중...' : '작성 중...') 
                : (isEdit ? '수정' : '작성')}
            </S.SubmitButton>
          </S.ButtonRow>
        </S.ContentSection>
      </S.Container>
    </>
  );
}
