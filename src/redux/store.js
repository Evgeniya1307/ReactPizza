import { configureStore } from '@reduxjs/toolkit'
import filter from "./slices/filterSlice.jsx"
import cart from './slices/cartSlice.js'



export const store = configureStore({
  reducer: {
    filter,
    cart
  },
})


 