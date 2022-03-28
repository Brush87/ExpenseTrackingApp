import Expense from '../models/expenseModel.js'

// Gets all Expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
    res.status(200).json(expenses)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// Creates Expense and returns data of Created Expense
export const createExpense = async (req, res) => {
  const expense = req.body
  const newExpense = new Expense(expense)
  try {
    await newExpense.save()
    res.status(201).json(newExpense)
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

// Updates the Expense (filtered by _id) with the passed in Data
export const patchExpense = async (req, res) => {
  try {
    const filter = { _id: req.body.data.expense._id }
    const update = req.body.data.expense
    await Expense.findOneAndUpdate(filter, update);
    res.status(202).json(req.body.data.expense)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Deletes the Expense (based off _id)
export const deleteExpense = async (req, res) => {
  try {
    await Expense.remove({ _id: req.body.id })
    res.status(202).json(req.body.id)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}