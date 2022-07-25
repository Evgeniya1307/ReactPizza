 import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"





//типизирую асинхронный экшен
export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>("pizza/fetchPizzasStatus",
    // прикручиваем логику редакса через thunkApi
    async (params) => {
      const { sortBy, order, category, search, currentPage } = params;
      const { data } = await axios.get<Pizza[]>( // вернёт массив Pizza[]
        `https://62b41f5aa36f3a973d2c669d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      );

      return data ;// обьясняю что такое дата это яв-ся массивом каких то пицц
    }
  );

  //отдельные ключи Перечисления TypeScript
  enum Status{
    LOADING='loading',
    SUCCES = 'succes',
    ERROR = 'error',

  }


type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number
}

  //типизирую
  interface PizzaSliceState {
    items: Pizza[] ; // массив пицц какие у пиццы типы обычно берётся ответ у бэкенда и он преобразрвывается в отдельгны тип
    status: 'loading' | 'succes' | 'error' ; 
  }
 

  const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading | success | error
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

