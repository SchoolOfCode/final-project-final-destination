import React from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2>Connect and Play Football</h2>
          <p>Join local football meetups for children aged 7-12</p>
          <section className={styles.about}>
            <h3>About Footie Friends</h3>
            <p>
              Footie Friends is a community of parents and children who love
              playing football. We organise local meetups for children aged 7-12
              years old. Our coaches are DBS certified and first aid trained.
            </p>
          </section>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/kids-football.jpg"
            alt="Children playing football"
            width={500}
            height={300}
            className={styles.resizableImage}
          />
        </div>
      </section>
    </main>
  );
}
