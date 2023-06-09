import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import styles from "./index.module.scss";
import GET, { api_key } from "@/hooks/getData";
import GameSection from "@/components/games";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  data: MyInterfaces.Response;
};

export default function Home({ data }: Props) {
  console.log(data);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <GameSection data={data?.results} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  // let res = await fetch(
  //   "https://api.rawg.io/api/games?key=57e85b9f545c4fc187b3a66543b4a480&page_size=25&ordering=rating"
  // );
  // let data = await res.json();

  let data = await GET(`/games?key=${api_key}`, 40);
  console.log(data);

  return {
    props: {
      data,
    },
  };
}
