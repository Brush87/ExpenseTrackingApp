import React, {
  useEffect
} from 'react'
import {
  Table,
  Spin
} from 'antd'
import {
  useAppSelector
} from '../../hooks'
import {
  selectExpenseList
} from '../../features/expenses/ExpenseSlice'

const TABLE_COLUMNS = [
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Taxes',
    dataIndex: 'taxes',
    key: 'taxes',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Options',
    dataIndex: 'options',
    key: 'options',
  },
]

const ExpensesContainer = () => {
  const expenseList = useAppSelector(selectExpenseList)

  const generateExpenseDataEffect = () => {
    console.log('this is the effect that will build out the AntD table')
  }
}

export default ExpensesContainer