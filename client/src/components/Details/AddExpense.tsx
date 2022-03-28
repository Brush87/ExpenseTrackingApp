import React from 'react'
import {
  Button
} from 'antd'
import style from './style.module.scss'

const AddExpense = () => {

  return (
    <div className={style.addExpenseContainer}>
      <Button>Add Expense</Button>
    </div>
  )
}

export default AddExpense