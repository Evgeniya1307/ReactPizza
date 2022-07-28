import {  createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Pizza, PizzaSliceState, Status } from "./types";
import { fetchPizzas } from "./asyncActions";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
name: 'pizza',
initialState,
reducers: {
setItems(state,action: PayloadAction<Pizza[]>) {
    state.items = action.payload;
},
},

 // Чтобы типизировать extraReducers нужно следовать примеру с builder.addCase
extraReducers: (builder) => {
  builder.addCase(fetchPizzas.pending, (state, action) => {
    state.status = Status.LOADING;
    state.items = [];
  });
  builder.addCase(fetchPizzas.fulfilled, (state, action) => {
    state.items = action.payload;
    state.status = Status.SUCCES;
  });
  builder.addCase(fetchPizzas.rejected, (state, action) => {
    state.status = Status.ERROR;
    state.items = [];
  });
},
});
// extraReducers: {
//     [fetchPizzas.pending]: (state) => { // ожидание
//     state.status = "loading";
//     state.items = []; //перед отправкой очистка в момент загрузки
//     },

//     [fetchPizzas.fulfilled]: (state, action) => { // успешно
//         state.items = action.payload;
//         state.status = "success";
//       },

//       [fetchPizzas.rejected]: (state, action) => { // произошла ошибка
// state.status ="error";
// state.items=[]; // чтобы невернулись старые пиццы
//     },
// },
//       });
    





export const{setItems}=pizzaSlice.actions; // вытаскиваю

export default pizzaSlice.reducer;

