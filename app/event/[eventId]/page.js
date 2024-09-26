"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import "bootstrap-icons/font/bootstrap-icons.css";
export default function EventPage({ params }) {
  let [eventData, setEventData] = useState({});
  const getData = async () => {
    const data = await fetch(
      `http://localhost:3000/api/event/${params.eventId}`
    );
    const event_data = await data.json();
    setEventData(event_data[0]);
  };

  useEffect(() => {
    getData();
    console.log(eventData);
  }, []);

  return (
    <div className={styles.container}>
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
            I am an experienced football coach, fully DBS-checked and first aid
            trained. With years of experience working with children, I hope to
            brings a combination of skill and enthusiasm to every session. I am
            also dedicated to creating a safe and enjoyable environment where
            your child can learn, improve, and have fun playing football.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className={styles.imageSection}>
        <Image
          src="/meetup-image.jpg"
          alt="Event"
          width={600}
          height={300}
          className={styles.imageResize}
        />
      </div>

      {/* Date/Time/Address */}
      <div className={styles.details}>
        <h4>Date & Time</h4>
        <p>
          <i class="bi bi-calendar-heart"></i> {eventData.date}
        </p>
        <p>
          <i class="bi bi-stopwatch"></i> Time of day: {eventData.time_period}
        </p>
        <p>
          <i class="bi bi-geo-alt"></i> Meetup Location: {eventData.location}
        </p>
        <p>
          {" "}
          <i class="bi bi-pin-map"></i> Within {eventData.borough}
        </p>
      </div>

      {/* Description of Event */}
      <div className={styles.description}>
        <h4>Description of Event</h4>
        <p>{eventData.description}</p>
        <p>Skill level required: {eventData.skill_level}</p>
        <p>Is there parking: {eventData.parking}</p>
      </div>

      <section className={styles.comments}>
        <h3>Comments</h3>
        <p>Please write a comment below</p>
        <div>
          <input
            className={styles.commentBox}
            type="text"
            name="comment"
            value=""
            placeholder="please write here ...."
          ></input>
        </div>
      </section>
      <div className="joinBtn">
        <button className={styles.joinButton}>Join Event</button>
      </div>
    </div>
  );
}

{
  /* <p>
<strong>Age Group:</strong> {eventData.age_group}
</p>
<p>{eventData.description}</p>
<p>
<strong>Parking:</strong> {eventData.parking}
</p> */
}

{
  /* <section className={styles.image}>
          <Image
            src={eventData.imageUrl}
            alt="Event Image"
            width={300}
            height={300}
          />
        </section> */
}

//   <div className={styles.eventInfo}>
//   <section className={styles.details}>
//     <h2>{eventData.title}</h2>
//   </section>

//   <section className={styles.hostInfo}>
//     <Image
//       src={eventData.hostImageUrl}
//       alt="Host Image"
//       width={100}
//       height={100}
//     />
//     <p>{eventData.hostName}</p>
//   </section>

//   <section className={styles.dateVenue}>
//     <p>
//       <strong>Date:</strong> {eventData.date}
//     </p>
//     <p>
//       <strong>Time:</strong> {eventData.time_period}
//     </p>
//     <p>
//       <strong>Location:</strong> {eventData.location}
//     </p>
//   </section>
// </div>

// <section className={styles.attendees}>
//   <h3>Attendees</h3>
//   <div className={styles.attendeesList}>
//     {eventData.attendees.map((attendee, index) => (
//       <Image
//         key={index}
//         src={attendee.image}
//         alt={attendee.name}
//         width={50}
//         height={50}
//       />
//     ))}
//   </div>
// </section>
// <section className={styles.comments}>
//   <h3>Comments</h3>
//   <p>{eventData.comments}</p>
// </section>
