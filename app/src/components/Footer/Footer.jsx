import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.account}>
        <h3>Your Account</h3>
        <a href="#">Settings</a>
        <a href="#">Log Out</a>
        <a href="#">Help</a>
      </div>
      <div className={styles.socialMedia}>
        <h3>Social Media</h3>
        <a href="#facebook">Facebook</a>
        <a href="#twitter">Twitter</a>
        <a href="#instagram">Instagram</a>
      </div>
      <div className={styles.report}>
        <h3>Report an Issue</h3>
        <a href="#report" >How to report an issue</a>
        <a href="#">Contact Us</a>
        <a href="#faq" className={styles.faq}>FAQ</a>
      </div>
      
    </footer>
  );
}
