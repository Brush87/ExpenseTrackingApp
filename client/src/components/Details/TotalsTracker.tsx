import React from 'react'
import {
  useAppSelector
} from '../../hooks'
import {
  selectTotal,
  selectTotalWithTaxes
} from '../../features/expenses/ExpenseSlice'
import {
  displayTaxedAmount
} from '../../utils/Utils'
import style from './style.module.scss'

// Small component to display the Sub-Total and Total with Taxes amount
const TotalsTracker = () => {
  const total = useAppSelector(selectTotal)
  const totalWithTaxes = useAppSelector(selectTotalWithTaxes)

  return (
    <div className={style.highLevelContainer}>
      <div className={style.detailsContainer}>
        <div className={style.labelContainer}>
          <label className={style.label}>
            Expense Sub Total:
          </label>
          <span className={style.value}>
            {total}$
          </span>
        </div>
        <div className={style.labelContainer}>
          <label className={style.label}>
            Total with Taxes:
          </label>
          <span className={style.value}>
            {displayTaxedAmount(totalWithTaxes)}$
          </span>
        </div>
      </div>
    </div>
  )
}

export default TotalsTracker
