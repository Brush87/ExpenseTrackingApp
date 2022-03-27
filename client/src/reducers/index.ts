import {
  combineReducers
} from 'redux'
import expenseReducer from './expenses'

export const rootReducer = combineReducers({
  expenseReducer
})

export type RootState = ReturnType<typeof rootReducer>
