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

  const validExpense = useMemo(() => amount > 0 && (description && description.length > 0), [
    amount,
    description
  ])

  const updateEditingExpenseFieldsEffect = () => {
    if (props.editingExpense) {
      const editingExpense = expenseList.find(expense => expense._id === props.editingExpense)
      setAmount(editingExpense.amount)
      setDescription(editingExpense.description)
      setTaxesOnAmount(calculateTaxes(editingExpense.amount))
    }
  }

  useEffect(updateEditingExpenseFieldsEffect, [
    props.editingExpense,
    expenseList
  ])

  const closeModal = () => {
    props.setVisible(false)
  }

  const onInputChange = (e: any) => {
    setDescription(e.target.value)
  }

  const onInputNumberChange = (value: number) => {
    setAmount(value)
    setTaxesOnAmount(calculateTaxes(value))
  }

  const onSubmit = () => {
    if (props.editingExpense) {
      console.log('Patch occurs here with inplace ID')
    } else {
      dispatch(createNewExpense({
        amount: amount,
        description: description
      }))
    }
  }

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