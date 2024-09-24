import React from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}></div>
      <Image src="/images/kids-football.jpg" width="100" height="100"></Image>
      <div className={styles.certified}>
        <h2>Certified</h2>
        <p>Our coaches are DBS certified and first aid trained</p>
      </div>
    </div>
  );
}
