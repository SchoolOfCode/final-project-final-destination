import React from "react";
import styles from "./page.module.css";
import Hero from "./src/components/Hero/Hero";
import Main from "./src/components/Main/Main";
import { Fredoka } from "next/font/google";

const font = Fredoka({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${styles.container} ${font.className}`}>
      <Hero />
      <Main />
    </div>
  );
}
