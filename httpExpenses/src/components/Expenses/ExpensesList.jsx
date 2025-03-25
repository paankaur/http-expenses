// ExpensesList.jsx
import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = (props) => {
  if(props.isLoading){
    return <p className="expenses-list__fallback"><b>
      Fetching data..</b></p>
  }
  return (
    <>
      {props.expenses.length === 0 && (
        <p className="expenses-list__fallback">No thing here yet!</p>
      )}
      <ul className="expenses-list">
        {props.expenses.length > 0 &&
          props.expenses.map((expense) => (
            <ExpenseItem key={expense.id} data={expense} />
          ))}
      </ul>
    </>
  );
};

export default ExpensesList;
