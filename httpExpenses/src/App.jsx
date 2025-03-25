// App.jsx

import React from "react";
import Expenses from "./components/Expenses/Expenses.jsx";
import NewExpense from "./components/NewExpense/NewExpense.jsx";
import { useState, useEffect } from "react";

const DUMMY_EXPENSES = [
  {
    id: 1,
    date: new Date(2025, 1, 25),
    title: "New Book",
    price: 30.99,
  },
  {
    id: 2,
    date: new Date(2025, 1, 23),
    title: "New Jeans",
    price: 99.99,
  },
  {
    id: 3,
    date: new Date(2024, 1, 23),
    title: "New Phone",
    price: 299.0,
  },
  {
    id: 4,
    date: new Date(2024, 1, 23),
    title: "New Banana",
    price: 9.79,
  },
];

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      const response = await fetch("http://localhost:3005/expenses");
      const responseData = await response.json();
      setExpenses(responseData.expenses);
      setIsFetching(false);
    };
    getExpenses();
    console.log(expenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpenseHandeler = (expense) => {
    setExpenses((previousExpenses) => {
      return [expense, ...previousExpenses];
    });
  };

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandeler}></NewExpense>
      <Expenses expenses={expenses} isLoading={isFetching} />
    </div>
  );
};

export default App;
