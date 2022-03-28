import {
  configureStore,
  Action,
  ThunkAction
} from '@reduxjs/toolkit'
import expenseReducer from './features/expenses/ExpenseSlice'

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store