import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import type {
  RootState
} from '../../store'

// Define a type for the slice state
interface ExpenseState {
  total: number,
  totalWithTaxes: number,
  expenses: any[]
}

// Define the initial state using that type
const initialState: ExpenseState = {
  total: 0,
  totalWithTaxes: 0,
  expenses: []
}

export const expenseSlice = createSlice({
  name: 'expense',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    newTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },

    newTotalWithTaxes: (state, action: PayloadAction<number>) => {
      state.totalWithTaxes = action.payload
    },

    addExpenseToList: (state, action: PayloadAction<any>) => {
      state.expenses = [...state.expenses, action.payload]
    },

    // removeExpenseFromList: (state, action: PayloadAction<string>) => {
      
    // }
  }
})

export const {
  newTotal,
  newTotalWithTaxes,
  addExpenseToList
} = expenseSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTotal = (state: RootState) => state.expenses.total

export default expenseSlice.reducer