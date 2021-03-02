import "../styles/globals.css";
import Head from "next/head";
import { AppProps } from "next/app";

import { data } from "autoprefixer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Voting App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
