import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer,
  },
})