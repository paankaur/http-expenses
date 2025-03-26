// App.jsx

import React from "react";
import Expenses from "./components/Expenses/Expenses.jsx";
import NewExpense from "./components/NewExpense/NewExpense.jsx";
import { useState, useEffect } from "react";
import Error from "./components/UI/Error.jsx";

/* const DUMMY_EXPENSES = [
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
]; */

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3005/expenses");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error("Failed fetching data..");
        }
        setExpenses(responseData.expenses);
      } catch (error) {
        setError({
          title: "An error occurred",
          message: "Failed fetching expenses data, please try again later",
        });
        setShowError(true);
      }
      setIsFetching(false);
    };
    getExpenses();
    console.log(expenses);
  }, []);

  console.log(error);
  const errorHandler = () => {
    setError(null);
    setShowError(false);
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpenseHandeler = (expense) => {
    const addExpense = async (expense) => {
      try {
        const response = await fetch("http://localhost:3005/add-expense", {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error("Failed saving data");
        }
        setExpenses([expense, ...expenses]);
      } catch (error) {
        setError({
          title: "An error occurred!",
          message:
            "Failed saving data at this point, perhaps try again later..",
        });
        setShowError(true);
      }
    };
    addExpense(expense);
  };

  return (
    <div className="App">
      {showError && (
        <Error
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <NewExpense onAddExpense={addExpenseHandeler}></NewExpense>
      <Expenses expenses={expenses} isLoading={isFetching} />
    </div>
  );
};

export default App;
