// NewExpense.test.jsx
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import NewExpense from "./NewExpense";
import Expenses from "../Expenses/Expenses";

/* beforeEach(() => {
  render(<NewExpense />);
}); */

// test nr.2 kas nupp on w?
it("renders 'Add new Expense' button", () => {
  render(<NewExpense />);
  const button = screen.getByRole("button", { name: /add new expense/i });
  expect(button).toBeInTheDocument();
});

// test nr.3 testin kas sisestusväljad ilmuvad
it("Add New Expense button opens the form", () => {
  render(<NewExpense />);
  const button = screen.getByRole("button", { name: /add new expense/i });
  const title = screen.queryByRole("textbox");
  const price = screen.queryByRole("spinbutton");
  const date = screen.queryByRole("textbox", { type: "date" });
  expect(title).not.toBeInTheDocument();
  expect(price).not.toBeInTheDocument();
  expect(date).not.toBeInTheDocument();
  fireEvent.click(button);
  const getTitle = screen.getByRole("textbox");
  const getPrice = screen.getByRole("spinbutton");
  const getDate = screen.getByRole("textbox", { type: "date" });
  expect(getTitle).toBeInTheDocument();
  expect(getPrice).toBeInTheDocument();
  expect(getDate).toBeInTheDocument();
});

// test nr.4 kuna ankeet mis avaneb sisaldab Cancel nuppu, siis leian selle peale nupuvajutust
it("Cancel button exists", () => {
  render(<NewExpense />);
  const button = screen.getByRole("button", { name: /add new expense/i });
  const cancelButtonB4 = screen.queryByRole("button", { name: /cancel/i });
  expect(cancelButtonB4).not.toBeInTheDocument();
  fireEvent.click(button);
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  expect(cancelButton).toBeInTheDocument();
});

// test nr.5 Cancel nupule vajutades kaob vorm
it("Cancel button hides form", () => {
  render(<NewExpense />);
  const button = screen.getByRole("button", { name: /add new expense/i });
  // veendun uuesti, et vorm ei kuva
  const title = screen.queryByRole("textbox");
  const price = screen.queryByRole("spinbutton");
  const date = screen.queryByRole("textbox", { type: "date" });
  expect(title).not.toBeInTheDocument();
  expect(price).not.toBeInTheDocument();
  expect(date).not.toBeInTheDocument();
  fireEvent.click(button);
  // vorm kuvab
  const getTitle = screen.getByRole("textbox");
  const getPrice = screen.getByRole("spinbutton");
  const getDate = screen.getByRole("textbox", { type: "date" });
  expect(getTitle).toBeInTheDocument();
  expect(getPrice).toBeInTheDocument();
  expect(getDate).toBeInTheDocument();
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  fireEvent.click(cancelButton);
  // vorm ei kuva
  expect(title).not.toBeInTheDocument();
  expect(price).not.toBeInTheDocument();
  expect(date).not.toBeInTheDocument();
});

// test nr.6 kas vormi avamisel "Add Expense" nupp
it("button to add Expenses exists", () => {
  render(<NewExpense />);
  const button = screen.getByRole("button", { name: /add new expense/i });
  const addButton = screen.queryByRole("button", { name: /add expense/i });
  expect(addButton).not.toBeInTheDocument();
  fireEvent.click(button);
  const isAddButton = screen.getByRole("button", { name: /add expense/i });
  expect(isAddButton).toBeInTheDocument();
});

// test nr.7 kas avaneb hoiatus kui tekstiväljad tühjad ja vajutada "Add Expense"
it("invalid input message appears on empty submit", () => {
  // portaali avamine
  const backdropRoot = document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-root");
  document.body.appendChild(backdropRoot);
  const overlayRoot = document.createElement("div");
  overlayRoot.setAttribute("id", "overlay-root");
  document.body.appendChild(overlayRoot);

  render(<NewExpense />);
  const button = screen.getByRole("button", { name: /add new expense/i });
  fireEvent.click(button);
  const getTitle = screen.getByRole("textbox");
  const getPrice = screen.getByRole("spinbutton");
  const getDate = screen.getByRole("textbox", { type: "date" });
  expect(getTitle).toHaveValue("");
  expect(getPrice).toHaveValue(null);
  expect(getDate).toHaveValue("");
  const submit = screen.getByRole("button", { name: /add expense/i });
  fireEvent.click(submit);
  const warning = screen.getByText(/invalid/i);
  expect(warning).toBeInTheDocument();
});

// test nr.8 kas andmete sisestamisel ilmub uus kirje
it("on input, creates new Expense", () => {
  const mockExpenses = [
    { id: "e1", title: "Book", amount: 12.99, date: "2024-01-01" },
    { id: "e2", title: "Coffee", amount: 3.5, date: "2024-02-15" },
  ];

  render(<Expenses expenses={mockExpenses} />);
  const select = screen.getByRole("combobox");
  expect(select).toBeInTheDocument();
});
