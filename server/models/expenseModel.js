import mongoose from 'mongoose'

// Basic Schema model for Expense --> Assumend date field was only date created and not date created/updated
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