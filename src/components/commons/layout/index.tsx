import { useRouter } from "next/router";
import LayoutNavigation from "./navigation";
import LayoutHeader from "./header";

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
    <>
      {!isAdminPath && <LayoutHeader />}
      <div
        style={{
          backgroundColor: "white",
        }}
      >
        {props.children}
      </div>
      {!isAdminPath && <LayoutNavigation />}
    </>
  );
}
