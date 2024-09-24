"use Client";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/football.png"
          alt="Footie Friends Logo"
          width={100}
          height={50}
        />
        <h1>Footie Friends</h1>
        <button className={styles.signOut}>Sign out</button>
      </header>
      <nav className={styles.nav}>
        <a href="#home">Home</a>
        <a href="#events">Events</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  );
}
