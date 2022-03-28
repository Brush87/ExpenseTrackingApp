import axios from 'axios'

const URL = 'http://localhost:5000/expense'

export const fetchExpenses = () => axios.get(URL)
export const createExpense = (newExpense: any) => axios.post(URL, newExpense)