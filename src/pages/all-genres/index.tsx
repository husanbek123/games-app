import React from "react";
import GET, { api_key } from "@/hooks/getData";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";

type Props = {
  data: any;
};

type Response = {
  results: MyInterfaces.GameGenre[];
} & MyInterfaces.Response;

export default function AllGames({ results }: MyInterfaces.GameGanreResponse) {
  return (
    <div className={styles.genres}>
      {results?.map((genre) => (
        <Link href={`/all-genres/${genre.name.toLowerCase()}`}>
          <div className={styles.genre}>
            <Image
              src={genre.image_background}
              alt="Genre Image"
              height={180}
              width={200}
            />
            {genre.name}
          </div>
        </Link>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  let data = await GET(`/genres?key=${api_key}`, 30);

  return {
    props: data,
  };
}
