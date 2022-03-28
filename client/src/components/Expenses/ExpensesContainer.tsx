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
  selectStatus,
  deleteSpecificExpense
} from '../../features/expenses/ExpenseSlice'
import {
  calculateTaxes,
  displayTaxedAmount
} from '../../utils/Utils'
import CreateEditExpenseForm from '../Form/CreateEditExpenseForm'
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
  const status = useAppSelector(selectStatus)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [editingModalVisibility, setEditingModalVisibility] = useState<boolean>(false)
  const [editingExpenseId, setEditingExpenseId] = useState<string|undefined>()

  // Function for Edit button that sets the editingExpenseId field
  const handleEditExpense = (expenseId: string) => {
    setEditingExpenseId(expenseId)
  }

  // Function for the below UE
  const handleEditExpenseChange = () => {
    if (editingExpenseId) {
      setEditingModalVisibility(true)
    }
  }

  // UE that triggers displaying the edit form modal due to change in the expenseEditingId
  useEffect(handleEditExpenseChange, [editingExpenseId])

  // Dispatches event to Delete Specific Expense
  const handleDeleteExpense = (expenseId: string) => {
    dispatch(deleteSpecificExpense(expenseId))
  }

  // Function for the below UE
  const handleModalOnClose = () => {
    if (!editingModalVisibility) {
      setEditingExpenseId(undefined)
    }
  }

  // UE to handle clearing the editingExpenseId field when modal closes
  useEffect(handleModalOnClose, [editingModalVisibility])

  // Renders the Option Buttons for each Expense
  const generateExpenseOptions = (expenseId: string) => {
    return (
      <div>
        <Button
          onClick={() => handleEditExpense(expenseId)}
        >
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

  // Function to be build the Data Source required for table component out of expenseList state
  const generateExpenseDataEffect = () => {
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

  // UE to rebuild the table when the expenseList state changes
  useEffect(generateExpenseDataEffect, [expenseList])

  // Function to render the table -- Some really basic ErrorBoundary stuff
  const renderTable = () => {
    if (status === 'pending') {
      return (
        <div>
          <Spin size='large'/>
        </div>
      )
    } else if (status === 'idle' && dataSource.length === 0) {
      return (
        <div>
          Please Add an Expense to the Tracker
        </div>
      )
    } else {
      return (
        <>
          <Table
            dataSource={dataSource}
            columns={TABLE_COLUMNS}
          />
          <CreateEditExpenseForm
            visible={editingModalVisibility}
            setVisible={setEditingModalVisibility}
            editingExpense={editingExpenseId}
          />
        </>
      )
    }
  }

  return (
    <>
      {renderTable()}
    </>
  )
}

export default ExpensesContainer