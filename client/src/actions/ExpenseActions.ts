export default class ExpenseActions {
  UPDATE_EXPENSE_TOTAL: string
  UPDATE_TOTAL_WITH_TAXES: string
  ADD_TO_EXPENSE_LIST: string
  REMOVE_FROM_EXPENSE_LIST: string
  UPDATE_EXPENSE: string
  
  constructor () {
    this.UPDATE_EXPENSE_TOTAL = 'UPDATE_EXPENSE_TOTAL'
    this.UPDATE_TOTAL_WITH_TAXES = 'UPDATE_TOTAL_WITH_TAXES'
    this.ADD_TO_EXPENSE_LIST = 'ADD_TO_EXPENSE_LIST'
    this.REMOVE_FROM_EXPENSE_LIST = 'REMOVE_FROM_EXPENSE_LIST'
    this.UPDATE_EXPENSE = 'UPDATE_EXPENSE'
  }

  // Initial State Function
  initialState = () => {
    return {
      total: 0,
      totalWithTaxes: 0,
      expenses: []
    }
  }

  // Callable Functions
  updateExpenseTotal = (total: number) => {
    console.log('total', total)
    return ({
    type: this.UPDATE_EXPENSE_TOTAL,
    payload: total
  })
}

  updateTotalWithTaxes = (totalWithTaxes: number) => ({
    type: this.UPDATE_TOTAL_WITH_TAXES,
    payload: totalWithTaxes
  })

  addToExpenseList = (expenseToAdd: any) => ({
    type: this.ADD_TO_EXPENSE_LIST,
    payload: expenseToAdd
  })

  removeFromExpenseList = (expenseId: string) => ({
    type: this.REMOVE_FROM_EXPENSE_LIST,
    payload: expenseId
  })

  updateExpense = (expenseId: string, expense: any) => ({
    type: this.UPDATE_EXPENSE,
    payload: {
      expenseId,
      expense
    }
  })

  // Action Handlers
  actionHandlers = () => ({
    [this.UPDATE_EXPENSE_TOTAL]: (state: any, action: any) => {
      console.log('State', state)
      console.log('Action', action)
      console.log('Action Payload', action.payload)
      const total = action.payload
      return ({
        ...state,
        total: total
      })
    },

    [this.UPDATE_TOTAL_WITH_TAXES]: (state: any, action: any) => {
      const totalWithTaxes = action.payload
      return ({
        ...state,
        totalWithTaxes
      })
    },

    [this.ADD_TO_EXPENSE_LIST]: (state: any, action: any) => {
      const expenseToAdd = action.payload
      return ({
        ...state,
        expenses: [
          ...state.expenses,
          expenseToAdd
        ]
      })
    },

    [this.REMOVE_FROM_EXPENSE_LIST]: (state: any, action: any) => {
      const expenseId = action.payload
      const filteredExpenses = state.expenses.filter((expense: any) => expense.id !== expenseId)
      return ({
        ...state,
        expenses: filteredExpenses
      })
    },

    // TODO Write Update Expense Method
  })
}