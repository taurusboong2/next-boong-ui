import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'semantic-ui-css/semantic.min.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ArticleList | TauBoong</title>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
