"use client"

import { useState } from "react";
import styles from "./Main.module.css";
import Filter from "./Filter/Filter";
import Image from "next/image";

export default function Main() {
	let [events, setFilteredEvents] = useState([
		{
			id: 1,
			icon: "🏆",
			title: "Saturday Kickabout",
			date: "2024-09-28",
			time: "morning",
			location: "Local Park",
			borough: "Lambeth",
			age: "11-12"
		},
		{
			id: 2,
			icon: "👥",
			title: "Sunday Skills Session",
			date: "2024-09-29",
			time: "afternoon",
			location: "Local Park",
			borough: "Croydon",
			age: "7-10"
		},
		{
			id: 3,
			icon: "⚽",
			title: "After-school Football",
			date: "2024-09-30",
			time: "afternoon",
			location: "School Grounds",
			borough: "Hackney",
			age: "Under 7"
		},
		{
			id: 4,
			icon: "⚽",
			title: "Capture the flag Football",
			date: "2024-09-30",
			time: "morning",
			location: "park",
			borough: "Camden",
			age: "Under 7"
		}
	]);

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
