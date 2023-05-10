import Link from "next/link";
import styles from "./index.module.scss";
import GameCard from "@/components/game_card";

type Props = {
  data: MyInterfaces.Game[];
};

export default function GameSection({ data }: Props) {
  console.log(data);

  return (
    <>
      <div className={styles.games}>
        {data?.map((game) => (
          <Link href={`/all-games/${game.id}`}>
            <GameCard {...game} />
          </Link>
        ))}
      </div>
    </>
  );
}
