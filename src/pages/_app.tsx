import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import ModalsContext from "../components/contexts/Modals";

function AppDoc({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AutiOne</title>
        <meta name="description" content="Personal website of AutiOne!" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ModalsContext>
        <Component {...pageProps} />
      </ModalsContext>
    </>
  );
}

export default AppDoc;
