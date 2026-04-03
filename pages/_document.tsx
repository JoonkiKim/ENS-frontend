import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const defaultTitle = "ENS Intranet | 서울대학교 ENS 학회";
  const defaultDescription = "서울대학교 ENS 학회원 전용 서비스입니다.";

  return (
    <Html lang="ko">
      <Head>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content="/images/header-logo.png" />

        <meta property="og:site_name" content="ENS Intranet" />
        <meta property="og:locale" content="ko_KR" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" type="image/png" href="/images/ENS-logo.png" />
        <link rel="apple-touch-icon" href="/images/ENS-logo.png" />

        {/* 이미지 preload - 페이지 로드 전에 미리 로드 */}

        <link rel="preload" href="/images/log-in-bg.png" as="image" />
        <link
          rel="preload"
          href="/images/findalumni-background-real.png"
          as="image"
        />
        <link rel="preload" href="/images/mypage-bg.png" as="image" />
        <link rel="preload" href="/images/free-board-bg.png" as="image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
