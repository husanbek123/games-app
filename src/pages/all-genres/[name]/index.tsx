import GET, { api_key } from "@/hooks/getData";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import React from "react";
import parse from "html-react-parser";
import Image from "next/image";
import GameSection from "@/components/games";
import styles from "./index.module.scss";

type Props = {
  data: MyInterfaces.GameGenre;
  games: MyInterfaces.Game[];
};

export default function GenreDetailed({ data, games }: Props) {
  return (
    <div className={styles.genre_page}>
      <h2>{data?.name}</h2>
      <br />
      <Image
        className={styles.img}
        src={data?.image_background}
        alt="Game ganre banner"
        width={600}
        height={550}
      />
      <p className="description">
        {data?.description ? parse(data?.description) : ""}
      </p>
      <br />
      <p>All games of this genre: {data?.games_count}</p>
      <br />
      <h2>Games of this genre:</h2>
      <br />
      <GameSection data={games} />
    </div>
  );
}

// export async function getServerSideProps({
//   params,
// }: GetServerSidePropsContext) {
//   let genres = await GET(`/genres?key=${api_key}`);
//   let current = genres?.results?.find(
//     (genre: MyInterfaces.GameGenre) => genre.name.toLowerCase() == params?.name
//   );
//   let data = await GET(`/genres/${current.id}?key=${api_key}`, 30);
//   let gamesRes = await GET(`/games?key=${api_key}&genres=${params?.name}`, 20);
//   return {
//     props: {
//       data,
//       games: gamesRes.results,
//     },
//   };
// }

export async function getStaticProps({ params }: GetStaticPropsContext) {
  let genres = await GET(`/genres?key=${api_key}`);
  let current = genres?.results?.find(
    (genre: MyInterfaces.GameGenre) => genre.name.toLowerCase() == params?.name
  );
  let data = await GET(`/genres/${current.id}?key=${api_key}`, 30);
  let gamesRes = await GET(`/games?key=${api_key}&genres=${params?.name}`, 20);
  return {
    props: {
      data,
      games: gamesRes?.results,
    },
  };
}
export async function getStaticPaths() {
  let data = await GET(`/genres?key=${api_key}`, 10);
  let paths = data?.results.map(
    (genre: MyInterfaces.GameGenre) => "/all-genres/" + genre.name.toLowerCase()
  );
  return {
    paths,
    fallback: true,
  };
}
