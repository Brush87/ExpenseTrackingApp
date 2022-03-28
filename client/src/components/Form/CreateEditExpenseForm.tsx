import React, {
  useState,
  useMemo,
  Dispatch,
  SetStateAction
} from 'react'
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
  const [taxesOnAmout, setTaxesOnAmount] = useState<number>(props.amount ? calculateTaxes(props.amount) : 0)

  const validExpense = useMemo(() => amount > 0 && (description && description.length > 0), [
    amount,
    description
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

  const renderModalFooter = () => (
    <div>
      <Button
        disabled={!validExpense}
        type='primary'
      >
        OK
      </Button>
    </div>
  )

  return (
    <Modal
      visible={props.visible}
      title={props.editingExpense ? `Edit ${props.description!}` : 'New Expense'}
      onCancel={closeModal}
      footer={renderModalFooter()}
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

CreateEditExpenseForm.defaultProps = defaultProps
export default CreateEditExpenseForm