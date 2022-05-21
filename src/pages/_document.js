import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

function Home() {
  return (
    <Html>
      <Head>
        <title>ArticleList | TauBoong</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Nanum+Gothic:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Home;