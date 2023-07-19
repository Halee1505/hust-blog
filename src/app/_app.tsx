import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Header from "@/components/Header";
type AppOwnProps = { example: string };

export default function MyApp({ Component, pageProps }: AppProps & AppOwnProps) {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
