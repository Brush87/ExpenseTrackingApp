import React, {
  useState,
  useMemo,
  Dispatch,
  SetStateAction
} from 'react'
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks'
import {
  selectExpenseList,
  createNewExpense,
  patchSpecificExpense
} from '../../features/expenses/ExpenseSlice'
import {
  calculateTaxes,
  displayTaxedAmount
} from '../../utils/Utils'
import {
  Modal,
  Input,
  InputNumber,
  Button
} from 'antd'
import style from './style.module.scss'
import { useEffect } from 'react'

type Props = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  editingExpense?: string
}

const CreateEditExpenseForm = (props: Props) => {
  const dispatch = useAppDispatch()
  const expenseList = useAppSelector(selectExpenseList)
  const [amount, setAmount] = useState<number>(0)
  const [description, setDescription] = useState<string|undefined>(undefined)
  const [taxesOnAmout, setTaxesOnAmount] = useState<number>(calculateTaxes(amount))

  // Memo Function that does basic checking to make sure an expense amount is greater than 0 && description string isn't empty
  const validExpense = useMemo(() => amount > 0 && (description && description.length > 0), [
    amount,
    description
  ])

  // Function for the below UE
  const updateEditingExpenseFieldsEffect = () => {
    if (props.editingExpense) {
      const editingExpense = expenseList.find(expense => expense._id === props.editingExpense)
      setAmount(editingExpense?.amount ?? 0)
      setDescription(editingExpense?.description ?? '')
      setTaxesOnAmount(calculateTaxes(editingExpense?.amount ?? 0))
    }
  }

  // UE updating the amount, description and tax amount, triggered by a change in the editingExpense prop (different Edit button was clicked)
  useEffect(updateEditingExpenseFieldsEffect, [
    props.editingExpense,
    expenseList
  ])

  // Internal function that handles closing the modal
  const closeModal = () => {
    props.setVisible(false)
  }

  // Function that deals with change to the description -- Updates local state
  const onInputChange = (e: any) => {
    setDescription(e.target.value)
  }

  // Function that deals with change to the amount -- Updates local state then calculates new tax amount
  const onInputNumberChange = (value: number) => {
    setAmount(value)
    setTaxesOnAmount(calculateTaxes(value))
  }

  // Function that handles the Submit funcitonality --> if props.editingExpense present --> Edit call. Otherwise Create call.
  const onSubmit = () => {
    if (props.editingExpense) {
      const editedExpense = {
        _id: props.editingExpense,
        amount: amount,
        description: description,
        date: expenseList.find(expense => expense._id === props.editingExpense).date
      }
      dispatch(patchSpecificExpense(editedExpense))
    } else {
      dispatch(createNewExpense({
        amount: amount,
        description: description
      }))
    }
  }

  // Function that renders the Footer with the specific button functionality (needed for disabled logic)
  const renderModalFooter = () => (
    <div>
      <Button
        disabled={!validExpense}
        type='primary'
        onClick={onSubmit}
      >
        OK
      </Button>
    </div>
  )

  return (
    <Modal
      visible={props.visible}
      title={props.editingExpense ? `Edit ${description}` : 'New Expense'}
      onCancel={closeModal}
      footer={renderModalFooter()}
      destroyOnClose
    >
      <div className={style.formRow}>
        <label className={style.formLabel}>
          Description
        </label>
        <Input
          className={style.descriptionInput}
          placeholder='Expense Description...'
          value={description}
          onChange={onInputChange}
        />
      </div>
      <div className={style.formRow}>
        <label className={style.formLabel}>
          Expense Amount
        </label>
        <InputNumber
          addonAfter='$'
          value={amount}
          onChange={onInputNumberChange}
          min={0}
          precision={2}
        />
      </div>
      <div className={style.formRow}>
        <label className={style.formLabel}>
          Taxes on Expense
        </label>
        <span>{displayTaxedAmount(taxesOnAmout)}$</span>
      </div>
    </Modal>
  )
}

export default CreateEditExpenseForm