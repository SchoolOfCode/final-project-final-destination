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
