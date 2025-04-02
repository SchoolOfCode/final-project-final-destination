"use client";

import React, { useState } from "react";

export default function EventForm({ submitForm, session, places, boroughs, selectedBorough, onBoroughChange }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    place_id: "",
    date: "",
    age_group: "",
    skill_level: "",
    max_participants: "",
    time_period: "",
    organizer_id: session?.user?.id
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
    
    try {
      const eventData = {
        ...formData,
        place_id: parseInt(formData.place_id),
        organizer_id: parseInt(session.user.id),
        max_participants: parseInt(formData.max_participants)
      };
  
      console.log("Submitting event data:", eventData);
  
      const response = await fetch(`${window.location.origin}/api/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        throw new Error(errorData.error || "Failed to create event");
      }
  
      const data = await response.json();
      console.log("Event created successfully:", data);
      submitForm();
    } catch (error) {
      console.error("Error creating event:", error);
      alert(`Failed to create event: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <div className="form-control">
        <label htmlFor="title" className="label">
          <span className="label-text">Title:</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label htmlFor="description" className="label">
          <span className="label-text">Description:</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="textarea textarea-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label htmlFor="borough" className="label">
          <span className="label-text">Filter by Borough:</span>
        </label>
        <select
          id="borough"
          value={selectedBorough}
          onChange={(e) => onBoroughChange(e.target.value)}
          className="select select-bordered w-full"
        >
          {boroughs.map((borough) => (
            <option key={borough} value={borough}>
              {borough}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="place_id" className="label">
          <span className="label-text">Location:</span>
        </label>
        <select
          id="place_id"
          name="place_id"
          value={formData.place_id}
          onChange={handleChange}
          required
          className="select select-bordered w-full"
        >
          <option value="">Select Location</option>
          {places.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name} ({place.parking ? "Parking Available" : "No Parking"})
              {place.toilets ? ", Toilets Available" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="date" className="label">
          <span className="label-text">Date:</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label htmlFor="age_group" className="label">
          <span className="label-text">Age Group:</span>
        </label>
        <select
          id="age_group"
          name="age_group"
          value={formData.age_group}
          onChange={handleChange}
          required
          className="select select-bordered w-full"
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

      <div className="form-control">
        <label htmlFor="skill_level" className="label">
          <span className="label-text">Skill Level:</span>
        </label>
        <select
          id="skill_level"
          name="skill_level"
          value={formData.skill_level}
          onChange={handleChange}
          required
          className="select select-bordered w-full"
        >
          <option value="">Select Skill Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="max_participants" className="label">
          <span className="label-text">Max Participants:</span>
        </label>
        <select
          id="max_participants"
          name="max_participants"
          value={formData.max_participants}
          onChange={handleChange}
          required
          className="select select-bordered w-full"
        >
          <option value="">Select Max Participants</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="time_period" className="label">
          <span className="label-text">Time Period:</span>
        </label>
        <select
          id="time_period"
          name="time_period"
          value={formData.time_period}
          onChange={handleChange}
          required
          className="select select-bordered w-full"
        >
          <option value="">Select Time Period</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-full">Create Event</button>
    </form>
  );
}
