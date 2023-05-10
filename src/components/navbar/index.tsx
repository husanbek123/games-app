import React, { ReactNode, useEffect, useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

import { Select } from "antd";
import MyLink from "../myLink";
import { api_key } from "@/hooks/getData";

type Props = {};

type searchObj = {
  id: number | string;
  name: string;
};

export default function Navbar({}: Props) {
  let router = useRouter();
  let [searchText, setSearchText] = useState<string>("");
  let [arrData, setArrData] = useState([]);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${api_key}&search=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setArrData(
          data?.results.map((game: MyInterfaces.Game) => ({
            value: game.id,
            label: game.name,
          }))
        );
      });
  }, [searchText]);

  let arr = [
    {
      value: "1",
      label: "Not Identified",
    },
    {
      value: "2",
      label: "Closed",
    },
    {
      value: "3",
      label: "Communicated",
    },
    {
      value: "4",
      label: "Identified",
    },
    {
      value: "5",
      label: "Resolved",
    },
    {
      value: "6",
      label: "Cancelled",
    },
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.left_side}>
        <button
          onClick={router.asPath != "/" ? () => router.back() : () => {}}
          className={[
            router.asPath == "/" ? styles.inactiveBtn : "",
            styles.Btn,
          ].join(" ")}
        >
          {"<"}
        </button>
        <div>
          <Select
            onSearch={(e) => setSearchText(e)}
            onChange={(e) => router.push(`/all-games/${e}`)}
            className={styles.select}
            showSearch
            style={{ width: 180, color: "white" }}
            placeholder="Search"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            dropdownRender={(menu) => {
              return (
                <div
                  className={"dropdown"}
                  style={{
                    padding: "6px",
                    borderRadius: "12px",
                    backgroundColor: "rgb(32, 32, 32)",
                    color: "white",
                  }}
                >
                  {menu}
                </div>
              );
            }}
            // options={arrData.map((game: MyInterfaces.Game) => ({
            //   value: game.id,
            //   label: game.name,
            // }))}
            options={arrData ? arrData : arr}
          />
        </div>
        <ul>
          <li>
            <MyLink href="/">Main</MyLink>
          </li>
          <li>
            <MyLink href="/all-games">All Games</MyLink>
          </li>
          <li>
            <MyLink href="/all-genres">All Genres</MyLink>
          </li>
          <li>
            <MyLink href="/stores">Stores</MyLink>
          </li>
          <li>
            <MyLink href="/news">News</MyLink>
          </li>
        </ul>
      </div>
      <div className={styles.right_side}>
        <ul>
          <li>
            <MyLink href="/wishlist">Wishlist</MyLink>
          </li>
          <li>
            <MyLink href="/cart">Cart</MyLink>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  );
}
