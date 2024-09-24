import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./src/components/Header/Header";
import Hero from "./src/components/Hero-section/Hero";
export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Hero />
      <footer className={styles.footer}>
        <div className={styles.socialMedia}>
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#instagram">Instagram</a>
        </div>
        <a href="#report" className={styles.report}>
          Report an Issue
        </a>
        <a href="#faq" className={styles.faq}>
          FAQ
        </a>
      </footer>
    </div>
  );
}
