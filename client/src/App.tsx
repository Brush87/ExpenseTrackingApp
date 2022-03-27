import React from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import { RootState } from './reducers'
import ExpenseActions from './actions/ExpenseActions'

const App = () => {
  const dispatch = useDispatch()
  const expenseActions = new ExpenseActions()
  const testTotal = useSelector((state: RootState) => state.expenseReducer.total)

  const testOnClick = () => {
    dispatch(expenseActions.updateExpenseTotal(7))
  }

  return (
    <div>
      <h1>Expense Tracker</h1>
      <button onClick={testOnClick}>Test</button>
      <h3>{testTotal}</h3>
    </div>
  )
}

export default App
