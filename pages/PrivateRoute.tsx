import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/routeReducer";

const PrivateRoute = ({
  component: Component,
  pageProps,
  children,
}: {
  component: React.ComponentType<any>;
  pageProps: any;
  children: React.ReactNode;
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  useEffect(() => {
    if (!isLoggedIn && !isLoginPage) {
      router.replace("/login");
    }
  }, [isLoggedIn, router, isLoginPage]);

  if (isLoginPage || !isLoggedIn) {
    return <Component {...pageProps} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
