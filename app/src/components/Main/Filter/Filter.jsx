import { useState } from "react";
import styles from "./Filter.module.css"

export default function Filter({ onFilterChange }) {
	const [distance, setDistance] = useState("");
	const [time, setTime] = useState("");
	const [date, setDate] = useState("");
	const [age, setAge] = useState("");

	const handleFilterChange = () => {
		onFilterChange({
			distance,
			time,
			date,
			age
		});
	};

	return (
		<div className={styles.filterWrapper}>
			<div>
				<label>Distance (km): </label>
				<select value={distance} onChange={(e) => setDistance(e.target.value)}>
					<option value="">Any</option>
					<option value="5">Up to 5 km</option>
					<option value="10">Up to 10 km</option>
					<option value="20">Up to 20 km</option>
				</select>
			</div>

			<div>
				<label>Time: </label>
				<select value={time} onChange={(e) => setTime(e.target.value)}>
					<option value="">Any</option>
					<option value="morning">Morning</option>
					<option value="afternoon">Afternoon</option>
					<option value="evening">Evening</option>
				</select>
			</div>

			<div>
				<label>Date: </label>
				<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
			</div>

			<div>
				<label>Age Group: </label>
				<select value={age} onChange={(e) => setAge(e.target.value)}>
					<option value="">Any</option>
					<option value="kids">Under 7</option>
					<option value="teens">7-10</option>
					<option value="adults">11-12</option>
				</select>
			</div>

			<button onClick={handleFilterChange}>Apply Filters</button>
		</div>
	);
}
