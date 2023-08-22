// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";
import GlobalStyles from "@/styles/GlobalStyles";
import Navbar from "@/components/navbar";
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Navbar />
      <div className="flex">
        <GlobalStyles />
        <div className="flex-grow pl-4">
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
};

export default App;
