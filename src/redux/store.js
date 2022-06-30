import { configureStore } from '@reduxjs/toolkit'
import filter from "./slices/filterSlice.jsx"

export const store = configureStore({
  reducer: {
    filter,
  },
})


 