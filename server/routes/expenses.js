import express from 'express'
import {
  getExpenses,
  createExpense,
  patchExpense,
  deleteExpense
} from '../controllers/expensesController.js'

const router = express.Router()

router.get('/', getExpenses)
router.post('/', createExpense)
router.patch('/', patchExpense)
router.delete('/', deleteExpense)

export default router
