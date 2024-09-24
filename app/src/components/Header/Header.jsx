"use Client";

import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {

  return (
    <div className={styles.header}>
      <header className={styles.headerContainer}>
        <h1>Footie Friends</h1>
        <Image
          src="/images\football.png"
          width="100"
          height="100"
          alt="logo"
        />
        <button>Sign out</button>
      </header>
    </div>
  );
}