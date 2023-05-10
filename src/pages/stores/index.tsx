import GET, { api_key } from "@/hooks/getData";
import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";

type Response = {
  count: number;
  next: string;
  previous: string;
  results: Store[];
};

type Store = {
  id: number;
  name: string;
  domain: string;
  slug: string;
  games_count: number;
  image_background: string;
};

type Props = { data: Response };

export default function Stores({ data }: Props) {
  console.log(data);

  return (
    <div>
      <h1>All Stores</h1>
      <br />
      <div className={styles.stores}>
        {data.results?.map((i) => (
          <a href={"https://" + i.domain}>
            <div className={styles.store}>
              <Image
                src={i.image_background}
                alt="store image"
                width={200}
                height={100}
              />
              <br />
              <h4>{i.name}</h4>
            </div>
          </a>
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

  let data = await GET(`/stores?key=${api_key}`, 30);
  return {
    props: {
      data,
    },
  };
}
