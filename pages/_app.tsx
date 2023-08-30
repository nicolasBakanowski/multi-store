// _app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../redux/store";
import GlobalStyles from "@/styles/GlobalStyles";
import Navbar from "@/components/navbar";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        <Navbar />
        <div className="container mx-auto mt-10 p-4">
          <Component {...pageProps} />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
