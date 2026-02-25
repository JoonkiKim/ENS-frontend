// _app.tsx
import { Global, css } from "@emotion/react";
import { RecoilRoot } from "recoil";
import Layout from "../src/components/commons/layout";
import "../styles/globals.css";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

import TokenInitializer from "../src/commons/libraries/TokenInitializer";
import {
  LoadingIcon,
  LoadingOverlay,
} from "../src/commons/libraries/loadingOverlay";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../src/commons/apis/apollo-client";
function MyApp({ Component, pageProps }) {


  // console.log("분기 합침 테스트");

  /* --------- Service Worker 등록 --------- */
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     const onLoad = () =>
  //       navigator.serviceWorker.register("/sw.js").catch(console.error); // 등록 실패 시 콘솔 확인
  //     window.addEventListener("load", onLoad);
  //     return () => window.removeEventListener("load", onLoad);
  //   }
  // }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator && typeof window !== "undefined") {
      // 환경 변수가 없으면 서비스 워커를 등록하지 않음
      const frontendOrigin = process.env.NEXT_PUBLIC_FRONTEND_URL;

      if (!frontendOrigin) {
        console.warn(
          "NEXT_PUBLIC_FRONTEND_URL이 설정되지 않아 서비스 워커를 등록하지 않습니다."
        );
        return;
      }

      // 현재 origin이 프론트엔드 origin과 다르면 등록하지 않음
      if (window.location.origin !== frontendOrigin) {
        console.warn("서비스 워커는 프론트엔드 origin에서만 등록됩니다!");
        return;
      }

      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker 등록 성공:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker 등록 실패:", error);
        });
    }
  }, []);

  /* ---------------------------------------- */

  useEffect(() => {
    function setRealVh() {
      const h = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
    }

    setRealVh(); // 초기 1회

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", setRealVh);
      vv.addEventListener("scroll", setRealVh);
      return () => {
        vv.removeEventListener("resize", setRealVh);
        vv.removeEventListener("scroll", setRealVh);
      };
    } else {
      window.addEventListener("resize", setRealVh);
      return () => window.removeEventListener("resize", setRealVh);
    }
  }, []);
// Global Styles
const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;700;800&family=Pretendard:wght@400;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: white;
    color: #2c2c2c;
  }
`;

  const [loadingRoute, setLoadingRoute] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoadingRoute(true);
    const handleComplete = () => setLoadingRoute(false);
    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);
    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <title>GDR</title>
        <meta name="description" content="가드레일 다이어리" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/GDR.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
    
      </Head>
      <Global styles={globalStyles} />
      <RecoilRoot>
        <ApolloProvider client={apolloClient}>
          <TokenInitializer />
          <LoadingOverlay visible={loadingRoute}>
            <LoadingIcon spin fontSize={48} />
          </LoadingOverlay>

          <Layout>
            {/* 페이지 컴포넌트에도 필요하다면 mobileOnly 전달 */}
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
