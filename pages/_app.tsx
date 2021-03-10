import "../styles/globals.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/apollo";

import { data } from "autoprefixer";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo();
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Voting App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
