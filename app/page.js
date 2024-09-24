import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import Header from "./src/components/Header/Header";


export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <p>boiler plate - test deploy</p>
      </main>
      <footer>team FD</footer>
    </div>
  );
}
