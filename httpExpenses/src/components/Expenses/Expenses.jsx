// Expenses.jsx
import React from "react";
import "./Expenses.css";
// import ExpenseItem from "./ExpenseItem.jsx";
import Card from "../UI/Card.jsx";
import ExpensesFilter from "../Filter/ExpensesFilter.jsx";
import { useState } from "react";
import ExpensesList from "./ExpensesList.jsx";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2025");

  const yearChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
    console.log(selectedYear);
  };

  const filteredExpenses = props.expenses.filter((expense) => {
    return new Date(expense.date).getFullYear().toString() === filteredYear;
  });

  return (
    <Card className="expenses">
      <ExpensesFilter  onYearChange={yearChangeHandler} />
      <ExpensesList expenses={filteredExpenses} isLoading={props.isLoading} />
    </Card>
  );
};

export default Expenses;
