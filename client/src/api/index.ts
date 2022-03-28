import axios from 'axios'

const URL = 'http://localhost:5000/expense'

export const fetchExpenses = () => axios.get(URL)