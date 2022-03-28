import React from 'react'
import {
  useAppSelector
} from '../../hooks'
import {
  selectTotal,
  selectTotalWithTaxes
} from '../../features/expenses/ExpenseSlice'
import style from './style.module.scss'

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
            {totalWithTaxes}$
          </span>
        </div>
      </div>
    </div>
  )
}

export default TotalsTracker