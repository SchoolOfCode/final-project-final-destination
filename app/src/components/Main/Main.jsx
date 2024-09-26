"use client";

import { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Filter from "./Filter/Filter";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

export default function Main() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(8);
  const [filters, setFilters] = useState({
    borough: "",
    time: "",
    date: "",
    age: "",
  });

  const photos = [
    "/homepage-images/Camps-Playing-1.jpg",
    "/homepage-images/football-3.jpg",
    "/homepage-images/football-older-kids.jpg",
    "/homepage-images/girl-football-2.jpg",
    "/homepage-images/indoor-football-2.jpg",
    "/homepage-images/indoor-football-3.jpg",
    "/homepage-images/indoor-girls-football-2.jpg",
    "/homepage-images/outdoor-football-5.jpg",
    "/homepage-images/youthfootball-1.jpg",
  ];

  const getData = async () => {
    const data = await fetch("http://localhost:3000/api/events");
    const event_data = await data.json();
    setEvents(event_data);
    setFilteredEvents(event_data);
  };

  useEffect(() => {
    getData();
  }, []);

  const applyFilters = (filters) => {
    let filtered = events;

    if (filters.borough) {
      filtered = filtered.filter((event) => event.borough === filters.borough);
    }

    if (filters.timePeriod) {
      filtered = filtered.filter((event) => event.time_period === filters.timePeriod);
    }

    if (filters.date) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date).toISOString().split('T')[0];
        return eventDate === filters.date;
      });
    }

    if (filters.ageGroup) {
      filtered = filtered.filter((event) => {
        const [eventMin, eventMax] = event.age_group.split('-').map(Number);
        const [filterMin, filterMax] = filters.ageGroup.split('-').map(Number);
        return eventMin >= filterMin && eventMax <= filterMax;
      });
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
    <div id="event-list" className={styles.main}>
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
            {currentEvents.map((event, index) => (
              <Link href={`/event/${event.id}`}>
                <div key={event.id} className={styles.eventCard}>
                  <Image
                    height={100}
                    width={200}
                    src={photos[index % photos.length]}
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
                <button
                  className={styles.pageBtn}
                  key={i}
                  onClick={() => paginate(i + 1)}
                >
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
