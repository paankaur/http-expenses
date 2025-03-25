// ExpenseForm.jsx
import "./ExpenseForm.css";
import { useState, Fragment, useRef } from "react";
import Error from "../UI/Error";

const ExpenseForm = (props) => {
  // const [enteredTitle, setEnteredTitle] = useState("");
  // const [enteredPrice, setEnteredPrice] = useState("");
  // const [enteredDate, setEnteredDate] = useState("");

  const [error, setError] = useState(null);
  console.log(error);

  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const dateInputRef = useRef();

  const errorHandler = () => {
    setError(null)
  }

  // const titleChangeHandler = (e) => {
  //   setEnteredTitle(e.target.value);
  // };
  // const priceChangeHandler = (event) => {
  //   setEnteredPrice(event.target.value);
  // };
  // const dateChangeHandler = (event) => {
  //   setEnteredDate(event.target.value);
  // };
  const submitHandler = (event) => {
    const enteredTitle = titleInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredDate = dateInputRef.current.value;

    event.preventDefault();
    if (
      enteredTitle.trim().length === 0 ||
      enteredPrice.trim().length == 0 ||
      enteredDate.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "You gotta fill the form to continue",
      });
      return;
    }

    const expenseData = {
      title: enteredTitle,
      price: enteredPrice,
      date: new Date(enteredDate),
    };
    props.onSaveExpenseData(expenseData);
    // setEnteredTitle("");
    // setEnteredPrice("");
    // setEnteredDate("");
    // console.log(expenseData);
    titleInputRef.current.value = "";
    priceInputRef.current.value = "";
    dateInputRef.current.value = "";
  };

  return (
    <Fragment>
      {error && 
        <Error
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      }
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
          <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              ref={titleInputRef}
              placeholder="Type a thing"
              // onChange={titleChangeHandler}
              // value={enteredTitle}
            />
          </div>
          <div className="new-expense__control">
          <label htmlFor="price">Price</label>
            <input
              type="number"
              placeholder="€"
              min="0.01"
              step="0.01"
              id="price"
              ref={priceInputRef}
              // onChange={priceChangeHandler}
              // value={enteredPrice}
            />
          </div>
          <div className="new-expense__control">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              min="1075-01-01"
              max="9027-12-12"
              id="date"
              ref={dateInputRef}
              // onChange={dateChangeHandler}
              // value={enteredDate}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="submit">Add Expense</button>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </Fragment>
  );
};
export default ExpenseForm;

/* <button type="button" onClick={cancelHandler}>Cancel</button> */
