import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/logo.png"
          alt="Footie Friends Logo"
          width={150}
          height={150}
        />
        <h1>Footie Friends</h1>
        <button className={styles.signOut}>Sign out</button>
      </header>
    </div>
  );
}
