import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "../styles/globals.css";
import { useEffect } from "react";
import { AppPropsWithLayout } from "../types/types";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const setAppHeight = () =>
    document.documentElement.style.setProperty(
      "--app-height",
      `${window.innerHeight - 1}px`
    );

  useEffect(() => {
    setAppHeight();
    window.addEventListener("resize", setAppHeight);
    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

  return (
    <>
      <Head>
        <title>Moala</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
