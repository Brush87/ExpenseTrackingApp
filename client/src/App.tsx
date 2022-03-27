import React from 'react'
import {
  useAppDispatch,
  useAppSelector
} from './hooks'
import {
  newTotal,
  selectTotal
} from './features/expenses/ExpenseSlice'

const App = () => {
  const dispatch = useAppDispatch()
  const testTotal = useAppSelector(selectTotal)
  console.log(selectTotal)

  const testOnClick = () => {
    dispatch(newTotal(7))
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
