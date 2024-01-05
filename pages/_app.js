"use client";
import "../styles/globals.css";
import '../styles/prism-vs.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
