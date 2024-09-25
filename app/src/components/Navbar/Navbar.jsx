import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <a href="#home">Home</a>
      <a href="#events">Events</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  );
}
