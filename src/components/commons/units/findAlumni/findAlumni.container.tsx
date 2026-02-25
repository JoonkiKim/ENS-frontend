
import * as S from './findAlumni.style';
import Head from 'next/head';



export default function AlumniSearch() {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/images/findalumni-background-real.png"
          as="image"
        />
      </Head>

      <S.Container>
    


        {/* Hero Section */}
        <S.Hero>
  
          
          <S.HeroTitle>알럼나이 찾기</S.HeroTitle>
          <S.HeroDescription>
            기수, 전공, 직무, 기업 등으로 알럼나이를 찾아보세요.<br />
            원하는 학회 구성원의 정보를 한눈에 확인할 수 있습니다.
          </S.HeroDescription>

          
          <S.SearchSection>
          <S.SearchContainer>
            <S.SearchLabelWrapper>
              <S.SearchLabel>FIND</S.SearchLabel>
              <S.SearchHelper>검색 필터를 이용해 상세한 검색이 가능합니다.</S.SearchHelper>
            </S.SearchLabelWrapper>
            
            <S.SearchBox>
              <S.SearchInput 
                type="text" 
                placeholder="이름, 기수, 재직 기업 등을 입력하세요"
              />
              <S.SearchDivider />
              <S.SearchFilter>
                <S.FilterLabel>
                  <S.FilterTitle>검색 필터 지정</S.FilterTitle>
                  <S.FilterSubtitle>기수, 산업군, 직무</S.FilterSubtitle>
                </S.FilterLabel>
              </S.SearchFilter>
              <S.SearchButton>
                <S.SearchIcon viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7.25" stroke="white" strokeWidth="1.5"/>
                  <line x1="13.5" y1="13.5" x2="15.5" y2="15.5" stroke="white" strokeWidth="1.5"/>
                </S.SearchIcon>
              </S.SearchButton>
            </S.SearchBox>
          </S.SearchContainer>
        </S.SearchSection>
        </S.Hero>

        {/* Search Section */}
  

        {/* Results Section */}
        <S.ResultsSection>
          <S.ResultsCount>
            총 <S.CountNumber>450</S.CountNumber>명
          </S.ResultsCount>

          {/* Table Header */}
          <S.TableHeader>
            <div>기수</div>
            <div>성명</div>
            <div>전화번호</div>
            <div>이메일</div>
            <div>현 직장</div>
            <div>소속/직무</div>
            <div>프로필</div>
          </S.TableHeader>

          {/* Table Rows */}
          {[...Array(9)].map((_, index) => (
            <S.TableRow key={index}>
              <S.TableCell>1</S.TableCell>
              <S.TableCell>이상혁</S.TableCell>
              <S.TableCell>010-1111-1111</S.TableCell>
              <S.TableCell>
                <S.EmailLink href="mailto:faker@gmail.com">faker@gmail.com</S.EmailLink>
              </S.TableCell>
              <S.TableCell>T1</S.TableCell>
              <S.TableCell>미드라이너</S.TableCell>
              <S.TableCell>
                <S.ProfileLink href="#">더보기</S.ProfileLink>
              </S.TableCell>
            </S.TableRow>
          ))}

          {/* Pagination */}
          <S.Pagination>
            <S.PageNav>&lt;</S.PageNav>
            <S.PageNumber active>1</S.PageNumber>
            <S.PageNumber>2</S.PageNumber>
            <S.PageNumber>3</S.PageNumber>
            <S.PageNumber>4</S.PageNumber>
            <S.PageNumber>5</S.PageNumber>
            <S.PageNumber>6</S.PageNumber>
            <S.PageNumber>7</S.PageNumber>
            <S.PageNumber>8</S.PageNumber>
            <S.PageNumber>9</S.PageNumber>
            <S.PageNav>&gt;</S.PageNav>
          </S.Pagination>
        </S.ResultsSection>

    
      </S.Container>
    </>
  );
}
