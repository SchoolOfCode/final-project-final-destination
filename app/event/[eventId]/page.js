"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function EventPage({ params }) {
  let [eventData, setEventData] = useState({});
  const getData = async (eventId) => {
    const data = await fetch(
      `http://localhost:3000/api/event/${eventId}`
    );
    const event_data = await data.json();
    setEventData(event_data[0]);
  };

  useEffect(() => {
    getData(params.eventId);
  }, [params.eventId]);
  return (
    <>
      <div className={styles.eventInfo}>
        <section className={styles.details}>
          <h2>{eventData.title}</h2>
          <p>
            <strong>Age Group:</strong> {eventData.age_group}
          </p>
          <p>{eventData.description}</p>
          <p>
            <strong>Parking:</strong> {eventData.parking}
          </p>
        </section>

        <section className={styles.image}>
          <Image
            src={eventData.imageUrl}
            alt="Event Image"
            width={300}
            height={300}
          />
        </section>

        <section className={styles.hostInfo}>
          <Image
            src={eventData.hostImageUrl}
            alt="Host Image"
            width={100}
            height={100}
          />
          <p>{eventData.hostName}</p>
        </section>

        <section className={styles.dateVenue}>
          <p>
            <strong>Date:</strong> {eventData.date}
          </p>
          <p>
            <strong>Time:</strong> {eventData.time_period}
          </p>
          <p>
            <strong>Location:</strong> {eventData.location}
          </p>
        </section>
      </div>
      {/* 
      <section className={styles.attendees}>
        <h3>Attendees</h3>
        <div className={styles.attendeesList}>
          {eventData.attendees.map((attendee, index) => (
            <Image
              key={index}
              src={attendee.image}
              alt={attendee.name}
              width={50}
              height={50}
            />
          ))}
        </div>
      </section> */}

      <section className={styles.comments}>
        <h3>Comments</h3>
        <p>{eventData.comments}</p>
      </section>
    </>
  );
}
