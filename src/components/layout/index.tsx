import React, { ReactNode } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import Navbar from "../navbar";

type Props = {
  children: ReactNode;
  className: string;
  state: boolean;
};

export default function Layout({ children, className, state }: Props) {
  return (
    <div
  
      className={[styles.layout, className, state && styles.inactive].join(" ")}
    >
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link href="/store"></Link>
          </li>
          <li>
            <Link href="/library"></Link>
          </li>
        </ul>
      </div>
      <main>
        <Navbar />
        <div className={styles.children}>{children}</div>
      </main>
    </div>
  );
}
