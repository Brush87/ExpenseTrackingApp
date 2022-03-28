import React, {
  useState,
  useMemo,
  Dispatch,
  SetStateAction
} from 'react'
import {
  Modal,
  Input,
  InputNumber
} from 'antd'
import style from './style.module.scss'

type Props = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  editingExpense: boolean
  amount?: number
  description?: string
}

const defaultProps = {
  editingExpense: false
}

const CreateEditExpenseForm = (props: Props) => {
  const [amount, setAmount] = useState<number>(props.amount ?? 0)
  const [description, setDescription] = useState<string|undefined>(props.description)

  const closeModal = () => {
    props.setVisible(false)
  }

  const onInputChange = (e: any) => {
    setDescription(e.target.value)
  }

  const onInputNumberChange = (value: number) => {
    setAmount(value)
  }

  return (
    <Modal
      visible={props.visible}
      title={props.editingExpense ? `Edit ${props.description!}` : 'New Expense'}
      onCancel={closeModal}
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
    </Modal>
  )
}

CreateEditExpenseForm.defaultProps = defaultProps
export default CreateEditExpenseForm