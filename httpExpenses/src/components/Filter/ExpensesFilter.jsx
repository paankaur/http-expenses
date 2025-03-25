// ExpensesFilter.jsx

import React from "react";
import { useState } from "react";
import "./ExpensesFilter.css";

const purifyHandler = () => {
  window.localStorage.clear();
};
const ExpensesFilter = (props) => {
  const [selectedYear, setSelectedYear] = useState("2025");

  const yearChangeHandler = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    // console.log(newYear);
    props.onYearChange(newYear);

    
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <button onClick={purifyHandler} className="button">
          <b>Clear Local Storage</b>
        </button>
        <select value={selectedYear} onChange={yearChangeHandler}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
