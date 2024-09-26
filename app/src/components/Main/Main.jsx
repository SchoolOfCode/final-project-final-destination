"use client";

import { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Filter from "./Filter/Filter";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(8);

  const getData = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/events`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const event_data = await response.json();
      setEvents(event_data);
      setFilteredEvents(event_data);
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const applyFilters = (filters) => {
    let filtered = events;

    if (filters.borough) {
      filtered = filtered.filter((event) => event.borough === filters.borough);
    }

    if (filters.time) {
      filtered = filtered.filter((event) => event.time === filters.time);
    }

    if (filters.date) {
      filtered = filtered.filter((event) => event.date === filters.date);
    }

    if (filters.age) {
      filtered = filtered.filter((event) => event.age === filters.age);
    }

    setFilteredEvents(filtered);
    setCurrentPage(1);
  };

  // Get current events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.main}>
      <section className={styles.filter}>
        <Filter onFilterChange={applyFilters} />
      </section>

      {filteredEvents.length > 0 ? (
        <section className={styles.events}>
          <h3>Upcoming Football Events</h3>
          <div className={styles.paginationControls}>
            <select
              value={eventsPerPage}
              onChange={(e) => {
                setEventsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="4">4 per page</option>
              <option value="8">8 per page</option>
              <option value="12">12 per page</option>
            </select>
          </div>
          <div className={styles.eventList}>
            {currentEvents.map((event) => (
              <Link key={event.id} href={`/event/${event.id}`}>
                <div className={styles.eventCard}>
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
              </Link>
            ))}
          </div>
          <div className={styles.pagination}>
            {Array.from(
              { length: Math.ceil(filteredEvents.length / eventsPerPage) },
              (_, i) => (
                <button key={i} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              )
            )}
          </div>
        </section>
      ) : (
        <p>No events found matching your filters.</p>
      )}
    </div>
  );
}
