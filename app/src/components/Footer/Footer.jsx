import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
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
  );
}
