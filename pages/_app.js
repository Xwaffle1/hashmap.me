import Head from "next/head";
import "../styles/globals.css";
import '../styles/prism-vs.css'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hashmap.me/" />
        <meta property="og:title" content="Hashmap.me" />
        <meta property="og:description" content="Explore Hashmap.me - the effortless way to store and access your data through HTTP. Simplify data management with our user-friendly hashmap interface, integrated seamlessly with MongoDB collections. No database setup required." />
        <meta property="og:image" content="https://hashmap.me/preview.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hashmap.me/" />
        <meta property="twitter:title" content="Hashmap.me" />
        <meta property="twitter:description" content="Explore Hashmap.me - the effortless way to store and access your data through HTTP. Simplify data management with our user-friendly hashmap interface, integrated seamlessly with MongoDB collections. No database setup required." />
        <meta property="twitter:image" content="https://hashmap.me/preview.png" />
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
