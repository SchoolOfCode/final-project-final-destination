import React from "react";
import styles from "./page.module.css";
import Header from "./src/components/Header/Header";
import Hero from "./src/components/Hero/Hero";
import Main from "./src/components/Main/Main";
import Footer from "./src/components/Footer/Footer";
import Navbar from "./src/components/Navbar/Navbar";
import { Fredoka } from "next/font/google";

const font = Fredoka({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${styles.container} ${font.className}`}>
      <Header />
      <Navbar />
      <Hero />
      <Main />
      <Footer />
    </div>
  );
}
