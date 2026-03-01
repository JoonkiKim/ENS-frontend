import Link from 'next/link';
import * as S from './fetchBoard.style';


interface BoardViewProps {
  category?: string;
  title?: string;
  date?: string;
  author?: string;
  content?: string;
  onBack?: () => void;
}

export default function BoardView({
  category = '학회 공지',
  title = '2025 홈커밍 파티를 개최합니다',
  date = '2025.06.30',
  author = '정예진',
  content = `안녕하세요,
2025 홈커밍 파티를 개최하게 되었습니다. 

다음 링크에서 상세사항을 확인하실 수 있습니다.

http://enshomecoming_`,
  onBack,
}: BoardViewProps) {
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const renderContent = (text: string) => {
    // URL을 찾아서 링크로 변환
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <>
   
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
            <S.TitleWrapper>  
                <S.CategoryBadge>{category}</S.CategoryBadge>
            <S.PostTitle>{title}</S.PostTitle>
            </S.TitleWrapper>
          
            <S.PostMeta>
              <S.PostDate>{date}</S.PostDate>
              <S.PostAuthor>작성자: {author}</S.PostAuthor>
            </S.PostMeta>
          </S.PostHeader>

          <S.PostBody>
            <p>{renderContent(content)}</p>
          </S.PostBody>

          {/* 홈커밍 파티 이미지 (SVG로 대체) */}
          <S.PostImage>
            <svg viewBox="0 0 700 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#8B7355', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#5C4A35', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              
              {/* Background */}
              <rect width="700" height="400" fill="url(#goldGradient)" />
              
              {/* Gold ribbon decoration */}
              <path
                d="M 50 50 Q 150 80 200 50 T 350 50 T 500 50 T 650 50"
                stroke="#D4AF37"
                strokeWidth="3"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M 50 100 Q 150 130 200 100 T 350 100 T 500 100 T 650 100"
                stroke="#D4AF37"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
              />
              
              {/* Stars */}
              <circle cx="440" cy="80" r="2" fill="#D4AF37" opacity="0.8" />
              <circle cx="530" cy="90" r="1.5" fill="#D4AF37" opacity="0.6" />
              <circle cx="560" cy="120" r="2" fill="#D4AF37" opacity="0.7" />
              <circle cx="595" cy="100" r="1" fill="#D4AF37" opacity="0.5" />
              <circle cx="690" cy="115" r="1.5" fill="#D4AF37" opacity="0.6" />
              
              {/* Frame */}
              <rect
                x="110"
                y="120"
                width="480"
                height="250"
                rx="8"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
                opacity="0.8"
              />
              <rect
                x="115"
                y="125"
                width="470"
                height="240"
                rx="6"
                fill="rgba(0, 0, 0, 0.7)"
              />
              
              {/* Title */}
              <text
                x="350"
                y="170"
                fontFamily="Georgia, serif"
                fontSize="20"
                fill="#D4AF37"
                textAnchor="middle"
                fontStyle="italic"
              >
                2025 ENS
              </text>
              <text
                x="350"
                y="220"
                fontFamily="Georgia, serif"
                fontSize="36"
                fill="#D4AF37"
                textAnchor="middle"
                fontStyle="italic"
              >
                Homecoming Day
              </text>
              
              {/* Subtitle */}
              <text
                x="350"
                y="280"
                fontFamily="Noto Sans KR, sans-serif"
                fontSize="14"
                fill="#D4AF37"
                textAnchor="middle"
                opacity="0.9"
              >
                ENS 졸업생 여러분을 초대합니다.
              </text>
              
              {/* Decorative underline */}
              <line
                x1="250"
                y1="240"
                x2="450"
                y2="240"
                stroke="#D4AF37"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
          </S.PostImage>

          <Link href="/boardMain">
            <S.BackButton>목록으로</S.BackButton>
          </Link>
        </S.ContentSection>
      </S.Container>
    </>
  );
}
