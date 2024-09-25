import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "./src/components/Header/Header";
import Hero from "./src/components/Hero-section/Hero";
import Main from "./src/components/Main-section/Main";
import Footer from "./src/components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Hero />
      <Main />
      <Footer />
    </div>
  );
}
