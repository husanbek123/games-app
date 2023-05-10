import Image from "next/image";
import styles from "./index.module.scss";
import loading from "../../assets/Blocks.svg";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <Image
        className={styles.img}
        src={loading}
        height={200}
        width={200}
        alt="Loading Icon"
      />
    </div>
  );
}
