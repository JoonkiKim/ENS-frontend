import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
   
   <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        
        {/* 이미지 preload - 페이지 로드 전에 미리 로드 */}
 
           <link
          rel="preload"
          href="/images/log-in-bg.png"
          as="image"
        />
        <link
          rel="preload"
          href="/images/findalumni-background-real.png"
          as="image"
        />
        <link
          rel="preload"
          href="/images/mypage-bg.png"
          as="image"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
