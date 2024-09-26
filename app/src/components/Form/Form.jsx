"use client";

import React, { useState } from "react";
import styles from "./Form.module.css";

export default function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    age_group: "",
    skill_level: "",
    max_participants: 0,
    borough: "",
    parking: "",
    time_period: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "max_participants") {
      value = parseInt(value) ;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    res = await res.json();
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className={styles.textarea}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="location" className={styles.label}>Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date" className={styles.label}>Date:</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="age_group" className={styles.label}>Age Group:</label>
        <select
          id="age_group"
          name="age_group"
          value={formData.age_group}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">Select Age Group</option>
          <option value="7-8">7-8</option>
          <option value="8-9">8-9</option>
          <option value="9-10">9-10</option>
          <option value="9-11">9-11</option>
          <option value="10-12">10-12</option>
          <option value="7-10">7-10</option>
          <option value="7-12">7-12</option>
          <option value="8-12">8-12</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="skill_level" className={styles.label}>Skill Level:</label>
        <select
          id="skill_level"
          name="skill_level"
          value={formData.skill_level}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">Select Skill Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="max_participants" className={styles.label}>Max Participants:</label>
        <select
          id="max_participants"
          name="max_participants"
          value={formData.max_participants}
          onChange={handleChange}
          required
          className={styles.select}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="borough" className={styles.label}>Borough:</label>
        <input
          type="text"
          id="borough"
          name="borough"
          value={formData.borough}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="parking" className={styles.label}>Parking:</label>
        <select
          id="parking"
          name="parking"
          value={formData.parking}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">Select Parking Option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="time_period" className={styles.label}>Time Period:</label>
        <select
          id="time_period"
          name="time_period"
          value={formData.time_period}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">Select Time Period</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      <button type="submit" className={styles.button}>Submit</button>
    </form>
  );
}