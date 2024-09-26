import { useState } from "react";
import styles from "./Filter.module.css"

export default function Filter({ onFilterChange, resetSearch }) {
	const [borough, setborough] = useState("");
	const [time, setTime] = useState("");
	const [date, setDate] = useState("");
	const [age, setAge] = useState("");

	const handleFilterChange = () => {
		onFilterChange({
			borough,
			time,
			date,
			age
		});
	};

	return (
		<div className={styles.filterWrapper}>
			<div>
				<label>Borough: </label>
				<select value={borough} onChange={(e) => setborough(e.target.value)}>
					<option value="">Any</option>
					<option value="Lambeth">Lambeth</option>
					<option value="Croydon">Croydon</option>
					<option value="Hackney">Hackney</option>
					<option value="Camden">Camden</option>
					<option value="Bromley">Bromley</option>
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

			<button className={styles.filterBtn} type="button" onClick={handleFilterChange}>Apply Filters</button>

			<button className={styles.resetBtn} type="button" onClick={resetSearch}>Reset</button>
		</div>
	);
}
