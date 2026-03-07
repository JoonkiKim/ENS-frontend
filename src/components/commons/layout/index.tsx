import { useRouter } from "next/router";
import styled from "@emotion/styled";
import LayoutNavigation from "./navigation";
import LayoutHeader from "./header";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  background-color: white;
`;

interface ILayoutProps {
  children: JSX.Element;
  nav?: "entry" | "todo" | "pavlov" | "daily" | "infusion" | "my";
  setNav?: (
    nav: "entry" | "todo" | "pavlov" | "daily" | "infusion" | "my"
  ) => void;
  theme?: any;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  const { pathname } = useRouter();

  console.log(router.asPath);

  // admin 경로인지 확인
  const isAdminPath = pathname?.startsWith('/admin');

  // 기본값 설정
  // const defaultNav = "entry";
  // const defaultSetNav = () => {};
  // const defaultTheme = {
  //   accentText: "#166534",
  //   button: "#16a34a",
  //   buttonHover: "#15803d",
  // };

  return (
    <LayoutWrapper>
      {!isAdminPath && <LayoutHeader />}
      <ContentWrapper>
        {props.children}
      </ContentWrapper>
      {!isAdminPath && <LayoutNavigation />}
    </LayoutWrapper>
  );
}
