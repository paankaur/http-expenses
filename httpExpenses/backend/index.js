import fs from "node:fs/promises";
import express from "express";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/expenses", async (req, res) => {
  const fileContent = await fs.readFile("./data/expenses.json");
  const expensesData = JSON.parse(fileContent);
  res.status(200).json({ expenses: expensesData });
});

/* app.post("/add-expense", async (req, res) => {
  const expenseData = req.body.expense;
  const newExpense = {
    ...expensesData,
    id: (Math.random() * 1000).toString(),
  };
  const fileContent = await fs.readFile("./data/expenses.json", "utf8");
  const expensesData = JSON.parse(fileContent);
  expensesData.push(newExpense);
  await fs.writeFile("./data/expenses.json", JSON.stringify(expensesData));
  res.status(201).json({ message: "Expense is added" });
}); */

app.post("/add-expense", async (req, res) => {
  try {
    const expenseData = req.body; // The entire request body contains the expense
    console.log("Received expense:", expenseData);  // Log the incoming expense data

    // Read current expenses
    const fileContent = await fs.readFile("./data/expenses.json", "utf8");
    const expensesData = JSON.parse(fileContent);

    // Create a new expense
    const newExpense = {
      ...expenseData,
      id: (Math.random() * 1000).toString(),
    };

    // Add the new expense to the list
    expensesData.push(newExpense);

    // Write the updated list back to the file
    await fs.writeFile("./data/expenses.json", JSON.stringify(expensesData, null, 2));

    // Respond with success
    res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Failed to add expense" });
  }
});

app.listen(3005, () => {
  console.log("backend server running on port 3005");
});
