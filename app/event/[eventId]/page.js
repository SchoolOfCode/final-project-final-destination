"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import "bootstrap-icons/font/bootstrap-icons.css";
import dayjs from "dayjs";

export default function EventPage({ params }) {
  let [eventData, setEventData] = useState({});
  let [attendeeData, setAttendeeData] = useState([]);

  const getEventData = async () => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/event/${params.eventId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const event_data = await response.json();
      setEventData(event_data[0]);
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  };

  const getAttendeeData = async () => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/attendees/${params.eventId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const attendeeDataRes = await response.json();
      setAttendeeData(attendeeDataRes);
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  };

  const attendMatch = async () => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/attendees/${params.eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "user_id": 2,
            "meetup_id": parseInt(params.eventId),
            "status": "confirmed"
        }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      getAttendeeData();
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  }

  const loadAllData = async () => {
    await getEventData();
    await getAttendeeData();
  }

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <div className={styles.container}>
      {/* Column 1: Title, Host Info, Image, Description */}
      <div className={styles.column}>
        {/* Event Title */}
        <div className={styles.title}>
          <h2>{eventData.title}</h2>
        </div>

        {/* Host Info */}
        <div className={styles.hostInfo}>
          <Image
            className={styles.coachImg}
            src="/coach.jpg"
            alt="Football-coach"
            width={100}
            height={90}
          />
          <div className={styles.hostText}>
            <h4>John Doe</h4>
            <p>
              I am an experienced football coach, fully DBS-checked and first
              aid trained. With years of experience working with children, I
              hope to bring a combination of skill and enthusiasm to every
              session. I am also dedicated to creating a safe and enjoyable
              environment where your child can learn, improve, and have fun
              playing football.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className={styles.image}>
          <Image
            src="/meetup-image.jpg"
            alt="Event"
            width={300}
            height={200}
            objectFit="cover"
            className={styles.imageResize}
          />
        </div>

        {/* Description of Event */}
        <div className={styles.description}>
          <h4>Description of Event</h4>
          <p>{eventData.description}</p>
          <p>Skill level required: {eventData.skill_level}</p>
          <p>Is there parking: {eventData.parking}</p>
        </div>
      </div>

      {/* Column 2: Time, Date, Location, Button */}
      <div className={styles.column}>
        {/* Date/Time/Address */}
        <div className={styles.timeDate}>
          <h4>Date & Time</h4>
          <p>
            <i className="bi bi-calendar-heart"></i>{" "}
            {dayjs(eventData.date).format("MMMM D, YYYY h:mm A")}
          </p>
          <p>
            <i className="bi bi-clock"></i> Time of day: {eventData.time_period}
          </p>
          <p>
            <i className="bi bi-geo-alt"></i> Meetup Location:{" "}
            {eventData.location}
          </p>
          <p>
            <i className="bi bi-pin-map"></i> Within {eventData.borough}
          </p>
        </div>

        {/* Placeholder for map */}
        <div className={styles.map}>
          <h1>Attendees</h1>
          {attendeeData.length > 0 &&
            attendeeData.map((attendee) => (
              <div className={styles.parentAndChild} key={attendee.id}>
                <p>👫 {attendee.parents_name}</p>
                <p>👩‍👦 {attendee.child_name}</p>
              </div>
            ))}
          {attendeeData.length === 0 && <p>No attendees yet</p>}
        </div>

        {/* Button */}
        <div className={styles.btnContainer}>
          <button onClick={attendMatch} className={styles.button}>Join Event</button>
        </div>
      </div>

      {/* Comments Section */}
      <div className={styles.comments}>
        <h3>Comments</h3>
        <p>Please write a comment below</p>
        <div>
          <input
            className={styles.commentBox}
            type="text"
            name="comment"
            value=""
            placeholder="please write here ...."
          />
        </div>
      </div>
    </div>
  );
}
