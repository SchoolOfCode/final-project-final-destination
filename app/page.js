import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>Hello World!</header>
      <main>
        <p>boiler plate - test deploy</p>
      </main>
      <footer>team FD</footer>
    </div>
  );
}
