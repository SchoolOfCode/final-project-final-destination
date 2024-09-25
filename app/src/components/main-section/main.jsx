"use client";
import React from "react";
import Image from "next/image";
import styles from "./Main.module.css";

export default function Main() {
  return (
    <div className={styles.main}>
      <section className={styles.filter}>
        <button>Distance</button>
        <button>Time</button>
        <button>Date</button>
        <button>Facilities</button>
        <button>Age Group</button>
      </section>
      <section className={styles.events}>
        <h3>Upcoming Football Events</h3>
        <div className={styles.eventList}>
          {[1, 2, 3].map((event) => (
            <div key={event} className={styles.eventCard}>
              <div className={styles.eventImage}></div>
              <div className={styles.eventInfo}>
                <h4>Event Title</h4>
                <p>Location: Local Park</p>
                <p>Date: June 1, 2023</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
