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
			distance: 5,
			age: "11-12"
		},
		{
			id: 2,
			icon: "👥",
			title: "Sunday Skills Session",
			date: "2024-09-29",
			time: "afternoon",
			location: "Local Park",
			distance: 10,
			age: "7-10"
		},
		{
			id: 3,
			icon: "⚽",
			title: "After-school Football",
			date: "2024-09-30",
			time: "afternoon",
			location: "School Grounds",
			distance: 20,
			age: "Under 7"
		},
		{
			id: 4,
			icon: "⚽",
			title: "Capture the flag Football",
			date: "2024-09-30",
			time: "morning",
			location: "park",
			distance: 5,
			age: "Under 7"
		}
	]);

	const applyFilters = (filters) => {
    let filtered = events;

    // Filter by distance
    if (filters.distance) {
      filtered = filtered.filter(
        (event) => event.distance <= parseInt(filters.distance)
      );
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
				<Filter onFilterChange={applyFilters}/>
			</section>
			<section className={styles.events}>
				<h3>Upcoming Football Events</h3>
				<div className={styles.eventList}>
					{events.map((events) => (
						<div key={events} className={styles.eventCard}>
							<Image height="100" width="200" src="/pitch.jpg" />
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
