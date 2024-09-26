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
            <h3>
              Footie Friends: Connecting Young Football Enthusiasts and Their
              Families
            </h3>
            <p>
              With Footie Friends, finding fun, safe, and age-appropriate
              football sessions has never been easier. Browse upcoming events,
              meet other football-loving families, and create lasting
              friendships on and off the pitch. Let’s bring the community
              together, one kick at a time!
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
