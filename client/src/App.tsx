import React, {
  useEffect
} from 'react'
import TotalsTracker from './components/Details/TotalsTracker'
import AddExpense from './components/Details/AddExpense'
import {
  useAppDispatch
} from './hooks'
import { fetchAllExpenses } from './features/expenses/ExpenseSlice'
import style from './rootStyle.module.scss'
import 'antd/dist/antd.css'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllExpenses())
  }, [dispatch])

  return (
    <>
      <h1>Expense Tracker</h1>
      <div className={style.highLevelContainer}>
        <TotalsTracker />
        <AddExpense />
      </div>
    </>
  )
}

export default App
