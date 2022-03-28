import React, {
  useState,
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
  const [dataSource, setDataSource] = useState<any[]>([])

  const generateExpenseDataEffect = () => {
    console.log('Expense List', expenseList)
    const returnDataSource = expenseList.reduce((prev, curr) => {
      return [...prev, {
        description: curr.description,
        amount: curr.amount,
        taxes: curr.amount,
        date: curr.date,
        options: 'Options Go Here'
      }]
    }, [])
    setDataSource(returnDataSource)
  }

  useEffect(generateExpenseDataEffect, [expenseList])

  return (
    <>
      {(dataSource.length === 0) ?
        <Spin size='large'/>
        :
        <Table dataSource={dataSource} columns={TABLE_COLUMNS} />
      }
    </>
  )
}

export default ExpensesContainer