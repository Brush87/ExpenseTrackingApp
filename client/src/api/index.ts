import axios from 'axios'

const URL = 'http://localhost:5000/expense'

export const fetchExpenses = () => axios.get(URL)
export const createExpense = (newExpense: any) => axios.post(URL, newExpense)
export const deleteExpense = (expenseId: string) => axios.delete(URL, { data: { id: expenseId }})
export const patchExpense = (expense: any) => axios.patch(URL, { data: { expense: expense }})