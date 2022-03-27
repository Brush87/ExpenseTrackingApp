import ExpenseActions from '../actions/ExpenseActions'
const expenseReducer = (state: any, action: any) => {
  const actions = new ExpenseActions()
  const handler = actions.actionHandlers()[action.type]
  state = state || actions.initialState()
  return handler ? handler(state, actions) : state
}

export default expenseReducer