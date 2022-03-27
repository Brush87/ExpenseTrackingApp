import Expense from '../models/expenseModel.js'

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
    console.log('Expenses', expenses)
    res.status(200).json(expenses)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

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

// TODO Write out patchExpense Functionality
export const patchExpense = async (req, res) => {
  try {

  } catch (err) {

  }
}

// TODO Write out deleteExpense Functionality
export const deleteExpense = async (req, res) => {
  try {

  } catch (err) {

  }
}