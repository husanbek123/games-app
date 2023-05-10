import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

type Props = {} & MyInterfaces.Game;

export default function GameCard({
  background_image,
  name,
  rating,
  metacritic,
  released,
  platforms,
}: Props) {
  return (
    <div className={styles.game_card}>
      <div className={styles.img_box}>
        <Image
          src={background_image ? background_image : ""}
          alt=""
          height={200}
          width={320}
          className={styles.img}
        />
      </div>
      <div className={styles.text_box}>
        <h5>{name}</h5>
      </div>
    </div>
  );
}
