import { useState } from "react";
import styles from "./Filter.module.css";

export default function Filter({ onFilterChange }) {
  const [borough, setBorough] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [date, setDate] = useState("");
  const [ageGroup, setAgeGroup] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      borough,
      timePeriod,
      date,
      ageGroup,
    });
  };
  return (
    <div className={styles.filterWrapper}>
      <div>
        <label>Borough: </label>
        <select value={borough} onChange={(e) => setBorough(e.target.value)}>
          <option value="">Any</option>
          <option value="Brent">Brent</option>
          <option value="Lambeth">Lambeth</option>
          <option value="Croydon">Croydon</option>
          <option value="Hackney">Hackney</option>
          <option value="Camden">Camden</option>
        </select>
      </div>

      <div>
        <label>Time Period: </label>
        <select
          value={timePeriod}
          onChange={(e) => {
            setTimePeriod(e.target.value);
          }}
        >
          <option value="">Any</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      <div>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label>Age Group: </label>
        <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
          <option value="">Any</option>
          <option value="5-6">5-6</option>
          <option value="7-8">7-8</option>
          <option value="9-10">9-10</option>
          <option value="11-12">11-12</option>
        </select>
      </div>

      <button
        className={styles.filterBtn}
        type="button"
        onClick={handleFilterChange}
      >
        Apply Filters
      </button>
    </div>
  );
}
