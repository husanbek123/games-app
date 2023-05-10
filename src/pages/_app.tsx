import Layout from "@/components/layout";
import Loading from "@/components/loading";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      if (url != router.asPath) {
        setIsLoading(true);
      }
    });
    router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <Layout state={isLoading} className={roboto.className}>
      {isLoading && <Loading />}
      <Component {...pageProps} />
    </Layout>
  );
}
