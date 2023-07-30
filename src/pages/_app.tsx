import "../styles/globals.scss";

import type { AppProps } from "next/app";
import Head from "next/head";

import { Analytics } from "@vercel/analytics/react";

import ModalsContext from "../components/contexts/Modals";

function AppDoc({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        {router.pathname.startsWith("/notes") ? (
          <link rel="icon" href="/favicon-notes.png" />
        ) : (
          <>
            <title>AutiOne</title>
            <meta name="description" content="This is AutiOne's personal website. Includes stuff about me, wacky blog posts, projects and fun easter eggs!" />
            <link rel="icon" href="/favicon.png" />
          </>
        )}
      </Head>
      <ModalsContext>
        <Component {...pageProps} />
        <Analytics />
      </ModalsContext>
    </>
  );
}

export default AppDoc;
