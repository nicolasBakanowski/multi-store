import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import store from "../redux/store";
import PrivateRoute from "./PrivateRoute";
import FolderPage from "./folder/[folderName]"; // Importa la página FolderPage
import SidebarMenu from "../components/sideBarMenu";
import NewDocument from "./file/new";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isNewDocumentPage = router.pathname.includes("/file");

  let content = null;

  if (isNewDocumentPage) {
    content = <NewDocument />;
  } else {
    content = <FolderPage />;
  }

  return (
    <Provider store={store}>
      <PrivateRoute component={Component} pageProps={pageProps}>
        <div className="flex">
          <div className="w-48">
            <SidebarMenu />
          </div>
          <div className="flex-grow pl-4">{content}</div>
        </div>
      </PrivateRoute>
    </Provider>
  );
};

export default App;
