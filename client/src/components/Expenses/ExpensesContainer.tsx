import React, {
  useState,
  useEffect
} from 'react'
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks'
import {
  selectExpenseList,
  deleteSpecificExpense
} from '../../features/expenses/ExpenseSlice'
import {
  calculateTaxes,
  displayTaxedAmount
} from '../../utils/Utils'
import {
  Table,
  Spin,
  Button
} from 'antd'

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
    title: 'Taxes (15%)',
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
  const dispatch = useAppDispatch()
  const expenseList = useAppSelector(selectExpenseList)
  const [dataSource, setDataSource] = useState<any[]>([])

  const handleDeleteExpense = (expenseId: string) => {
    dispatch(deleteSpecificExpense(expenseId))
  }

  const generateExpenseOptions = (expenseId: string) => {
    return (
      <div>
        <Button>
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteExpense(expenseId)}
        >
          Delete
        </Button>
      </div>
    )
  }

  const generateExpenseDataEffect = () => {
    console.log('Expense List', expenseList)
    const returnDataSource = expenseList.reduce((prev, curr) => {
      return [...prev, {
        key: curr._id,
        description: curr.description,
        amount: curr.amount,
        taxes: displayTaxedAmount(calculateTaxes(curr.amount)),
        date: new Date(curr.date).toLocaleString(),
        options: generateExpenseOptions(curr._id)
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