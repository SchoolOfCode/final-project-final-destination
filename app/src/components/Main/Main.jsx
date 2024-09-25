"use client";
import React from "react";
import Image from "next/image";
import styles from "./Main.module.css";

export default function Main() {

  const events = [
    {
      id: 1,
      icon: '🏆',
      title: 'Saturday Kickabout',
      date: '2024-09-28',
      time: 'morning',
      location: 'Local Park',
      distance: 5,
      age: '11-12',
    },
    {
      id: 2,
      icon: '👥',
      title: 'Sunday Skills Session',
      date: '2024-09-29',
      time: 'afternoon',
      location: 'Local Park',
      distance: 10,
      age: '7-10',
    },
    {
      id: 3,
      icon: '⚽',
      title: 'After-school Football',
      date: '2024-09-30',
      time: 'afternoon',
      location: 'School Grounds',
      distance: 20,
      age: 'Under 7',
    },
    {
      id: 4,
      icon: '⚽',
      title: 'Capture the flag Football',
      date: '2024-09-30',
      time: 'morning',
      location: 'park',
      distance: 5,
      age: 'Under 7',
    },
  ];

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
          {events.map((events) => (
            <div key={events} className={styles.eventCard}>
              <div className={styles.eventImage}></div>
              <div className={styles.eventInfo}>
                <h4>{events.title}</h4>
                <p>{events.location}</p>
                <p>{events.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
