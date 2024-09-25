"use client"

import { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Filter from "./Filter/Filter";
import Image from "next/image";

export default function Main() {
	let [events, setFilteredEvents] = useState([])

	const getData = async () => {
		const data = await fetch("https://3000.fais.al/api/events");
		const event_data = await data.json();
		setFilteredEvents(event_data);
	};

	useEffect(() => {
		getData();
	}, []);

	const applyFilters = (filters) => {
    let filtered = events;

    // Filter by distance
    if (filters.borough) {
    filtered = filtered.filter((event) => event.borough === filters.borough);
    }

    // Filter by time
    if (filters.time) {
      filtered = filtered.filter((event) => event.time === filters.time);
    }

    // Filter by date
    if (filters.date) {
      filtered = filtered.filter((event) => event.date === filters.date);
    }

    // Filter by age
    if (filters.age) {
      filtered = filtered.filter((event) => event.age === filters.age);
    }

    setFilteredEvents(filtered);
  };

	return (
    <div className={styles.main}>
      <section className={styles.filter}>
        <Filter onFilterChange={applyFilters} />
      </section>

      {events.length > 0 ? (
        <section className={styles.events}>
          <h3>Upcoming Football Events</h3>
          <div className={styles.eventList}>
            {events.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                {/* Ensure correct use of next/image with alt attribute */}
                <Image
                  height={100}
                  width={200}
                  src="/pitch.jpg"
                  alt={event.title}
                />
                <div className={styles.eventInfo}>
                  <h4>{event.title}</h4>
                  <p>{event.location}</p>
                  <p>{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p>No events found matching your filters.</p>
      )}
    </div>
  );
}
