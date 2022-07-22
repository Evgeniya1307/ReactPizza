import { configureStore } from '@reduxjs/toolkit'
import filter from "./slices/filterSlice.js"
import cart from './slices/cartSlice.js'
import pizza from './slices/pizzaSlice.jsx'


export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza
  },
})


 