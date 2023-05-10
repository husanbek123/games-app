import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode | string;
  href: string;
};

export default function MyLink({ children, href }: Props) {
  let router = useRouter();
  return (
    <Link
      href={href}
      className={[router.asPath == href ? styles.active : styles.inactive].join(
        " "
      )}
    >
      {children}
    </Link>
  );
}
