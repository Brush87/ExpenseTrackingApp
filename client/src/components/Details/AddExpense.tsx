import React, {
  useState
} from 'react'
import CreateEditExpenseForm from '../Form/CreateEditExpenseForm'
import {
  Button
} from 'antd'
import style from './style.module.scss'

const AddExpense = () => {
  const [addExpenseFormVisibility, setAddExpenseFormVisibility] = useState<boolean>(false)

  return (
    <div className={style.addExpenseContainer}>
      <Button
        color={'#228C22'}
        size='large'
        onClick={() => setAddExpenseFormVisibility(true)}
      >
        Add Expense
      </Button>
      <CreateEditExpenseForm
        visible={addExpenseFormVisibility}
        setVisible={setAddExpenseFormVisibility}      
      />
    </div>
  )
}

export default AddExpense