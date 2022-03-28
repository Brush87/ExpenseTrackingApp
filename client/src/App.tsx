import React from 'react'
import {
  useAppSelector
} from './hooks'
import {
  selectTotal,
  selectTotalWithTaxes
} from './features/expenses/ExpenseSlice'
import style from './rootStyle.scss'

const App = () => {
  // const dispatch = useAppDispatch()
  const total = useAppSelector(selectTotal)
  const totalWithTaxes = useAppSelector(selectTotalWithTaxes)

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div className={style.labelContainer}>
        <label className={style.label}>Expense Sub Total:</label>
        <span>{total}</span>
      </div>
      <div className={style.labelContainer}>
        <label className={style.label}>Total with Taxes:</label>
        <span>{totalWithTaxes}</span>
      </div>
    </div>
  )
}

export default App
