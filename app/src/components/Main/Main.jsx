"use client";

import { useEffect, useState } from "react";
import Filter from "./Filter/Filter";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

export default function Main() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(3);

  const photos = [
    "/homepage-images/Camps-Playing-1.jpg",
    "/homepage-images/football-3.jpg",
    "/homepage-images/football-older-kids.jpg",
    "/homepage-images/girl-football-2.jpg",
    "/homepage-images/indoor-football-2.jpg",
    "/homepage-images/indoor-football-3.jpg",
    "/homepage-images/indoor-girls-football-2.jpg",
    "/homepage-images/outdoor-football-5.jpg",
    "/homepage-images/youthfootball-1.jpg"
  ];

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
      filtered = filtered.filter((event) => event.place_borough === filters.borough);
    }
  
    if (filters.timePeriod) {
      filtered = filtered.filter((event) => event.time_period === filters.timePeriod);
    }
  
    if (filters.date) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date).toISOString().split("T")[0];
        return eventDate === filters.date;
      });
    }
  
    if (filters.ageGroup) {
      filtered = filtered.filter((event) => event.age_group === filters.ageGroup);
    }
  
    setFilteredEvents(filtered);
    setCurrentPage(1);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPaginationNumbers = () => {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    const maxButtons = 5;
    const half = Math.floor(maxButtons / 2);

    let startPage = currentPage - half;
    let endPage = currentPage + half;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxButtons > totalPages ? totalPages : maxButtons;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxButtons + 1 > 0 ? totalPages - maxButtons + 1 : 1;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div id="event-list" className="space-y-8 px-4 py-2">
      <section className="mb-6">
        <Filter onFilterChange={applyFilters} events={events} />
      </section>

      {filteredEvents.length > 0 ? (
        <section className="flex flex-col space-y-6 text-center">
          <div className="lg:flex lg:justify-between lg:items-center">
            <h3 className="text-2xl font-semibold mb-2">Upcoming Football Events</h3>
            <div className="mb-4">
              <select
                value={eventsPerPage}
                onChange={(e) => {
                  setEventsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="select select-bordered w-full max-w-xs"
              >
                <option value="3">3 per page</option>
                <option value="6">6 per page</option>
                <option value="9">9 per page</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.map((event, index) => {
              const randomImage = photos[Math.floor(Math.random() * photos.length)];

              return (
                <Link key={event.id} href={`/event/${event.id}`} className="block">
                  <div className="card bg-base-100 shadow-lg rounded-lg overflow-hidden">
                    <Image
                      height={100}
                      width={200}
                      src={randomImage}
                      alt={event.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-xl font-bold">{event.title}</h4>
                      <p className="text-gray-600">{event.location}</p>
                      <p className="text-sm text-gray-500">
                        {dayjs(event.date).format("MMMM D, YYYY h:mm A")}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-center gap-2 mt-6 overflow-x-auto">
            {getPaginationNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                className={`btn btn-outline text-sm px-3 py-1 ${pageNumber === currentPage ? "btn-active" : ""}`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <p>No events found matching your filters.</p>
      )}
    </div>
  );
}
