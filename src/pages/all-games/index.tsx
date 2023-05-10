import GameCard from "@/components/game_card";
import GET, { api_key } from "@/hooks/getData";
import React from "react";

import styles from "./index.module.scss";
import Link from "next/link";

type Response = {
  count: number;
  next: string;
  previous: string;
  results: MyInterfaces.Game[];
};

type Props = { data: Response };

export default function All({ data }: Props) {

  return (
    <div>
      <h1>All games page</h1>
      <br />
      <div className={styles.games}>
        {data.results?.map((game) => (
          <Link href={`/all-games/${game.id}`}>
            <GameCard {...game} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // let res = await fetch(
  //   "https://api.rawg.io/api/publishers?key=57e85b9f545c4fc187b3a66543b4a480&page_size=100",
  //   {
  //     headers: {},
  //   }
  //
  // let data = await res.json();

  let data = await GET(`/games?key=${api_key}`, 100);
  console.log(data);

  return {
    props: {
      data,
    },
  };
}
