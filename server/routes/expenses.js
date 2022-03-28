import express from 'express'
import {
  getExpenses,
  createExpense,
  patchExpense,
  deleteExpense
} from '../controllers/expensesController.js'

const router = express.Router()

// Routes for the App -- Luckily they are all different types of calls
router.get('/', getExpenses)
router.post('/', createExpense)
router.patch('/', patchExpense)
router.delete('/', deleteExpense)

export default router
