import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import type {
  RootState,
  AppThunk
} from '../../store'
import {
  fetchExpenses,
  createExpense,
  deleteExpense
} from '../../api/index'

// Define a type for the slice state
interface ExpenseState {
  total: number,
  totalWithTaxes: number,
  expenses: any[],
  status: string
}

// Define the initial state using that type
const initialState: ExpenseState = {
  total: 0,
  totalWithTaxes: 0,
  expenses: [],
  status: 'idle'
}

const calculateTotal = (expenseList: any) => {
  return expenseList.reduce((prev: number, curr: any) => {
    return prev + curr.amount
  }, 0)
}

export const fetchAllExpenses = createAsyncThunk(
  'expense/fetchExpenses',
  async () => {
    const response = await fetchExpenses()
    return response.data
  }
)

export const createNewExpense = createAsyncThunk(
  'expense/createExpense',
  async (newExpense: any) => {
    const response = await createExpense(newExpense)
    return response.data
  }
)

export const deleteSpecificExpense = createAsyncThunk(
  'expense/deleteExpense',
  async (expenseId: string) => {
    const response = await deleteExpense(expenseId)
    console.log('deleteExpense RESPONSE', response)
    return response.data
  }
)

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
    }
  },

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
    // FETCH_ALL_EXPENSES CASES
      .addCase(fetchAllExpenses.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllExpenses.fulfilled, (state, action) => {
        state.status = 'idle'
        state.expenses = action.payload

        // Update State with Totals from Expenses List
        const total = calculateTotal(action.payload)
        state.total = total
        state.totalWithTaxes = total * 1.15
      })
      .addCase(fetchAllExpenses.rejected, (state) => {
        state.status = 'failed'
      })

    // CREATE_NEW_EXPENSES CASES
      .addCase(createNewExpense.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createNewExpense.fulfilled, (state, action) => {
        state.status = 'idle'
        state.expenses = [...state.expenses, action.payload]

        // Update State with with New Totals from Expenses List
        const total = calculateTotal([...state.expenses, action.payload])
        state.total = total
        state.totalWithTaxes = total * 1.15
      })
      .addCase(createNewExpense.rejected, (state) => {
        state.status = 'failed'
      })

    // DELETE_SPECIFIC_EXPENSE CASES
      .addCase(deleteSpecificExpense.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteSpecificExpense.fulfilled, (state, action) => {
        state.status = 'idle'
        state.expenses = state.expenses.filter(expense => expense._id !== action.payload._id)
        // TODO Write logic to populate total and totalWithTaxes on fulfilled
      })
      .addCase(deleteSpecificExpense.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const {
  newTotal,
  newTotalWithTaxes
} = expenseSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTotal = (state: RootState) => state.expenses.total
export const selectTotalWithTaxes = (state: RootState) => state.expenses.totalWithTaxes
export const selectExpenseList = (state: RootState) => state.expenses.expenses

export default expenseSlice.reducer