// I am App.test.jsx
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

// test nr.1 kontrollin kas rakendus üldse kuvab
it("App should render", () => {
  render(<App />);
});

// test nr.9 lisan uue kirje
it("add new Expense functionality", () => {
  render(<App />);
  //avab vormi
  const button = screen.getByRole("button", { name: /add new expense/i });
  fireEvent.click(button);
  //sisestab väljadele
  const getTitle = screen.getByLabelText("Title");
  fireEvent.change(getTitle, { target: { value: "test infoasdasd" } });
  const getPrice = screen.getByLabelText("Price");
  fireEvent.change(getPrice, { target: { value: "0.12" } });
  const getDate = screen.getByLabelText("Date");
  fireEvent.change(getDate, { target: { value: "2025-05-05" } });
  //uusi kirjeid EI ole
  const empty = screen.getByText(/no thing here yet!/i);
  expect(empty).toBeInTheDocument();
  //lisab kirje
  const add = screen.getByRole("button", { name: /add expense/i });
  fireEvent.click(add);
  //tühja teksti puhul kuvatav tekst on kadunud
  const notEmpty = screen.queryByText(/no thing here yet/i);
  expect(notEmpty).not.toBeInTheDocument();
  //LS ei ole tühi
  expect(localStorage.length).not.toBe(0);
  //tühjendan LS, et järgmine test saaks ka võimaluse õnnestuda!
  localStorage.clear();
});

// test nr.10 testin kas "clear local storage" nupp töötab
it("clear button works", () => {
  render(<App />);
  //avab vormi
  const button = screen.getByRole("button", { name: /add new expense/i });
  fireEvent.click(button);
  //sisestab väljadele
  const getTitle = screen.getByLabelText("Title");
  fireEvent.change(getTitle, { target: { value: "test infoasdasd" } });
  const getPrice = screen.getByLabelText("Price");
  fireEvent.change(getPrice, { target: { value: "0.12" } });
  const getDate = screen.getByLabelText("Date");
  fireEvent.change(getDate, { target: { value: "2025-05-05" } });
  //uusi kirjeid EI ole
  const empty = screen.getByText(/no thing here yet!/i);
  expect(empty).toBeInTheDocument();
  //lisab kirje
  const add = screen.getByRole("button", { name: /add expense/i });
  fireEvent.click(add);
  //tühja teksti puhul kuvatav tekst on kadunud
  const notEmpty = screen.queryByText(/no thing here yet/i);
  expect(notEmpty).not.toBeInTheDocument();
  const expense = screen.getByText(/test info/i);
  expect(expense).toBeInTheDocument();
  //vajutab 'clear' nupule
  const clear = screen.getByRole("button", { name: /clear local storage/i });
  fireEvent.click(clear);
  expect(localStorage.length).toBe(0);
  
  render(<App/>);
  expect(screen.getByText(/no thing here yet!/i)).toBeInTheDocument();
  
});
