import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import * as S from './createBoard.style';

// react-quill을 dynamic import로 로드 (SSR 방지)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface FormData {
  category: string;
  title: string;
  content: string;
}

export default function BoardCreate() {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      category: '',
      title: '',
      content: '',
    },
  });

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const category = watch('category');
  const content = watch('content');

  const categories = ['학회 공지', '채용 공고', '기타'];

  const handleCategoryClick = (selectedCategory: string) => {
    setValue('category', selectedCategory);
    setIsCategoryDropdownOpen(false);
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 처리
    window.history.back();
  };

  const onSubmit = (data: FormData) => {
    // 작성 버튼 클릭 시 처리
    console.log('게시물 작성:', data);
    // TODO: API 호출로 게시물 저장
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

  return (
    <>
   
      <S.Container>


        {/* Breadcrumb */}
        <S.Breadcrumb>
          <S.BreadcrumbItem>자유 게시판</S.BreadcrumbItem>
          <S.BreadcrumbSeparator />
          <S.BreadcrumbItem>게시물 작성</S.BreadcrumbItem>
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
            <S.UserName>정예진</S.UserName>
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
            <S.CancelButton onClick={handleCancel}>취소</S.CancelButton>
            <S.SubmitButton onClick={handleSubmit(onSubmit)}>작성</S.SubmitButton>
          </S.ButtonRow>
        </S.ContentSection>
      </S.Container>
    </>
  );
}
