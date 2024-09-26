import styles from "./Navbar.module.css"; 
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="#event-list">Events</Link>
      <Link href="/create">Create Event</Link>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  );
}
