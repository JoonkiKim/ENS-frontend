import  { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import * as S from './boardMain.style';



interface Post {
  id: number;
  category: string;
  title: string;
  date: string;
  author: string;
}

const posts: Post[] = [
  {
    id: 103,
    category: '채용 공고',
    title: '네이버웹툰에서 채용 연계형 인턴을 모집합니다',
    date: '2026.02.07',
    author: '정예진',
  },
  {
    id: 102,
    category: '기타',
    title: '20XX.XX.XX 서울대학교 인문대학에서 주최하는 학술동아리 활동 공유...',
    date: '2026.02.07',
    author: '정예진',
  },
  {
    id: 101,
    category: '채용 공고',
    title: '네이버웹툰에서 채용 연계형 인턴을 모집합니다',
    date: '2026.02.07',
    author: '정예진',
  },
  {
    id: 100,
    category: '채용 공고',
    title: '네이버웹툰에서 채용 연계형 인턴을 모집합니다',
    date: '2026.02.07',
    author: '정예진',
  },
  {
    id: 100,
    category: '채용 공고',
    title: '네이버웹툰에서 채용 연계형 인턴을 모집합니다',
    date: '2026.02.07',
    author: '정예진',
  },
  {
    id: 99,
    category: '학회 공지',
    title: '2026 홈커밍 파티를 개최합니다',
    date: '2026.02.07',
    author: '정예진',
  },
  {
    id: 98,
    category: '채용 공고',
    title: '네이버웹툰에서 채용 연계형 인턴을 모집합니다',
    date: '2026.02.07',
    author: '정예진',
  },
  {
    id: 97,
    category: '기타',
    title: '20XX.XX.XX 서울대학교 인문대학에서 주최하는 학술동아리 활동 공유...',
    date: '2026.02.07',
    author: '정예진',
  },
  {
    id: 96,
    category: '학회 공지',
    title: '2025 홈커밍 파티를 개최합니다',
    date: '2025.06.30',
    author: '정예진',
  },
];

export default function FreeBoard() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9;
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['전체', '학회 공지', '채용 공고', '기타'];

  // 선택된 카테고리에 따라 게시물 필터링
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;



  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryClick = (category: string) => {
    if (category === '전체') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    setIsCategoryDropdownOpen(false);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 리셋
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

 

        {/* Hero Section */}
        <S.HeroSection>
          <S.HeroTitle>자유 게시판</S.HeroTitle>
          <S.HeroDescription>
            <p>
              ENS 구성원 간의 <strong>정보 공유와 네트워킹을 위한 자유 게시판</strong>입니다.
            </p>
            <p>학회 공지, 채용 공고, 기타 소식을 카테고리별로 확인하고 자유롭게 소통할 수 있습니다.</p>
          </S.HeroDescription>

          <S.CategoryBox>
            <S.CategoryItem>
              <strong>학회 공지 |</strong> ENS의 공식 일정과 주요 소식 공유
            </S.CategoryItem>
            <S.CategoryItem>
              <strong>채용 공고 |</strong> 운영진 및 알럼나이가 공유하는 채용·커리어 관련 공고 확인
            </S.CategoryItem>
            <S.CategoryItem>
              <strong>기타 |</strong> 학회원 누구나 자유롭게 의견과 정보 공유
            </S.CategoryItem>
          </S.CategoryBox>
        </S.HeroSection>

        {/* Board Section */}
        <S.BoardSection>
          <S.TableContainer>
            {/* Table Header */}
            <S.TableHeader>
              <S.TableHeaderCell>No.</S.TableHeaderCell>
              <S.CategoryHeaderCell
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                }}
                data-dropdown-field
              >
                <S.TableHeaderCell style={{ margin: 0 }}>
                  카테고리
                  <S.SortIcon>
                    <svg viewBox="0 0 6.9282 5.25" fill="none">
                      <path d="M3.4641 0L6.9282 5.25H0L3.4641 0Z" fill="#5F5F5F" />
                    </svg>
                  </S.SortIcon>
                </S.TableHeaderCell>
                {isCategoryDropdownOpen && (
                  <S.CategoryDropdown data-dropdown-container>
                    {categories.map((category) => (
                      <S.CategoryDropdownItem
                        key={category}
                        data-dropdown-item
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(category);
                        }}
                      >
                        {category}
                      </S.CategoryDropdownItem>
                    ))}
                  </S.CategoryDropdown>
                )}
              </S.CategoryHeaderCell>
              <S.TableHeaderCell>제목</S.TableHeaderCell>
              <S.TableHeaderCell>작성일</S.TableHeaderCell>
              <S.TableHeaderCell>글쓴이</S.TableHeaderCell>
            </S.TableHeader>

            {/* Table Rows */}
            {filteredPosts.map((post, index) => (
              <S.TableRow 
                key={`${post.id}-${index}`} 
                clickable 
                onClick={() => router.push('/boardMain/boardView')}
              >
                <S.TableCell>{post.id}</S.TableCell>
                <S.TableCell>
                  <S.CategoryBadge>{post.category}</S.CategoryBadge>
                </S.TableCell>
                <S.TitleCell>{post.title}</S.TitleCell>
                <S.TableCell>{post.date}</S.TableCell>
                <S.TableCell>{post.author}</S.TableCell>
              </S.TableRow>
            ))}
          </S.TableContainer>

          {/* Pagination */}
          <S.Pagination>
            <S.PageButton onClick={() => handlePageClick(Math.max(1, currentPage - 1))}>{'<'}</S.PageButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <S.PageButton key={page} active={currentPage === page} onClick={() => handlePageClick(page)}>
                {page}
              </S.PageButton>
            ))}
            <S.PageButton onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}>{'>'}</S.PageButton>
          </S.Pagination>

          {/* Write Button */}
          <Link href="/boardWrite">
            <a>
              <S.WriteButton>글쓰기</S.WriteButton>
            </a>
          </Link>
        </S.BoardSection>
      </S.Container>
    </>
  );
}
