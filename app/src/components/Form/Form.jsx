"use client";

import React, { useState } from "react";

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
      value = parseInt(value);
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="age_group">Age Group:</label>
        <input
          type="text"
          id="age_group"
          name="age_group"
          value={formData.age_group}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="skill_level">Skill Level:</label>
        <select
          id="skill_level"
          name="skill_level"
          value={formData.skill_level}
          onChange={handleChange}
          required
        >
          <option value="">Select Skill Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label htmlFor="max_participants">Max Participants:</label>
        <select
          id="max_participants"
          name="max_participants"
          value={formData.max_participants}
          onChange={handleChange}
          required
        >
          {/* Create options for numbers 1 to 10 */}
          {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="borough">Borough:</label>
        <input
          type="text"
          id="borough"
          name="borough"
          value={formData.borough}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="parking">Parking:</label>
        <select
          id="parking"
          name="parking"
          value={formData.parking}
          onChange={handleChange}
          required
        >
          <option value="">Select Parking Option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label htmlFor="time_period">Time Period:</label>
        <select
          id="time_period"
          name="time_period"
          value={formData.time_period}
          onChange={handleChange}
          required
        >
          <option value="">Select Time Period</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
