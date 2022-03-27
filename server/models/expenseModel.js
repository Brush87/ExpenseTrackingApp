import mongoose from 'mongoose'

const expenseSchema = mongoose.Schema({
  amount: Number,
  description: String,
  date: {
    type: Date,
    default: new Date()
  }
})

const Expense = mongoose.model('Expense', expenseSchema)

export default Expense