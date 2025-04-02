// app/src/components/Main/Filter/Filter.jsx
import { useState, useEffect } from "react";

export default function Filter({ onFilterChange, events }) {
  const [filters, setFilters] = useState({
    borough: "",
    timePeriod: "",
    date: "",
    ageGroup: ""
  });

  const [filterOptions, setFilterOptions] = useState({
    boroughs: [],
    timePeriods: [],
    ageGroups: []
  });

  useEffect(() => {
    if (events.length > 0) {
      // Get unique values for each filter
      const uniqueBoroughs = [...new Set(events.map(event => event.place_borough))].sort();
      const uniqueTimePeriods = [...new Set(events.map(event => event.time_period))].sort();
      const uniqueAgeGroups = [...new Set(events.map(event => event.age_group))].sort((a, b) => {
        const aNum = parseInt(a.split('-')[0]);
        const bNum = parseInt(b.split('-')[0]);
        return aNum - bNum;
      });

      console.log('Events:', events);
      console.log('Unique Boroughs:', uniqueBoroughs);
      console.log('Unique Time Periods:', uniqueTimePeriods);
      console.log('Unique Age Groups:', uniqueAgeGroups);

      setFilterOptions({
        boroughs: ["Any", ...uniqueBoroughs],
        timePeriods: ["Any", ...uniqueTimePeriods],
        ageGroups: ["Any", ...uniqueAgeGroups]
      });
    }
  }, [events]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, date: new Date().toISOString().split("T")[0] }));
  }, []);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => onFilterChange(filters);

  const resetSearch = () => {
    setFilters({
      borough: "",
      timePeriod: "",
      date: new Date().toISOString().split("T")[0],
      ageGroup: ""
    });
    onFilterChange({});
  };

  const filterConfig = [
    {
      label: "Borough",
      options: filterOptions.boroughs,
      state: "borough"
    },
    {
      label: "Time Period",
      options: filterOptions.timePeriods,
      state: "timePeriod"
    },
    {
      label: "Age Group",
      options: filterOptions.ageGroups,
      state: "ageGroup"
    }
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-wrap items-end justify-center gap-4">
        {filterConfig.map(({ label, options, state }) => (
          <div key={state} className="w-full sm:w-auto flex-grow">
            <label className="font-semibold mb-1 block text-center">{label}</label>
            <select
              name={state}
              value={filters[state]}
              onChange={handleChange}
              className="select select-bordered w-full text-center"
            >
              {options?.map((option) => (
                <option key={option} value={option === "Any" ? "" : option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="w-full sm:w-auto flex-grow">
          <label className="font-semibold mb-1 block text-center">Date</label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="input input-bordered w-full text-center date-input"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-center">
          <button
            className="btn btn-primary flex-grow sm:flex-grow-0 sm:w-32"
            onClick={handleSubmit}
          >
            Apply Filters
          </button>
          <button
            className="btn btn-secondary flex-grow sm:flex-grow-0 sm:w-32"
            onClick={resetSearch}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
