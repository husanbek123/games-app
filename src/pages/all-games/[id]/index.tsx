import React from "react";
import styles from "./index.module.scss";
import GET, { api_key } from "@/hooks/getData";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import Image from "next/image";
import parse from "html-react-parser";

type Props = {};

export default function GameDetailed({
  name,
  background_image_additional,
  platforms,
  ...data
}: MyInterfaces.GameDetailed) {
  console.log(platforms);

  return (
    <div className={styles.container}>
      <div className={styles.showcase}>
        <Image
          className={styles.banner_img}
          src={background_image_additional}
          alt="banner image"
          width={500}
          height={400}
        />
        <div className={styles.image_box}>
          <Image
            src={data.background_image}
            alt="Image"
            width={300}
            height={190}
            className={styles.img}
          />
        </div>
      </div>
      <div className={styles.info}>
        <br />
        <h1>{name}</h1>
        <br />
        <p className="description">
          {data?.description ? parse(data.description) : ""}
        </p>
        <br />
        {platforms ? (
          <>
            <h2>Available Platforms:</h2>
            <br />
            <div className={styles.platforms}>
              {platforms?.map((platform) => {
                if (platform.requirements) {
                  return <p>{platform.platform.name}</p>;
                } else return <p>Not Available</p>;
              })}
            </div>
            <br />
            <h2>Requirements:</h2>
            <div>
              <br />
              <br />
              <h3>Minimal:</h3>
              <br />
              {platforms?.find((i) => i.requirements.minimum) ? (
                platforms?.map((platform) => (
                  <p>{platform.requirements.minimum}</p>
                ))
              ) : (
                <p>Information Not Awailable</p>
              )}
              <br />
              <h3>Recommended:</h3>
              <br />
              {platforms?.find((i) => i.requirements.recommended) ? (
                platforms?.map((platform) => (
                  <p>{platform.requirements.recommended}</p>
                ))
              ) : (
                <p>Information Not Awailable</p>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

// export async function getServerSideProps({
//   params,
// }: GetServerSidePropsContext) {
//   let data = await GET(`/games/${params!.id}?key=${api_key}`);

//   return {
//     props: data,
//   };
// }

export async function getStaticProps({ params }: GetStaticPropsContext) {
  let data = await GET(`/games/${params!.id}?key=${api_key}`);

  return {
    props: data,
  };
}

export async function getStaticPaths() {
  let data = await GET(`/games?key=${api_key}`, 10);
  let paths = data?.results.map(
    (game: MyInterfaces.Game) => `/all-games/${game.id}`
  );
  return {
    paths,
    fallback: true,
  };
}
