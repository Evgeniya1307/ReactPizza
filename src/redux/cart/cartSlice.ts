import { getCartFromLs } from '../../utils/getCartFromLs';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { TCartItem, CartSliceState } from './types';

const initialState: CartSliceState = getCartFromLs();

//типизирую тип который является структурой слайсов
// export type CartItem ={
//   id:string,
//   title:string,
//   price:number,
//   imageUrl:string,
//   type:string,
//   size:number;
//   count:number;
// }



 //товары , если есть в корзине что-то то отрендери, если ничего то верни пустой массив


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) { // найди объект в массиве корзина будет добавлять TCartItem
      const findItem = state.items.find((obj) => obj.id === action.payload.id);// если в stateitems был найден объект у которого равен action.payload.id если такой объект нашёлся то делаю коунт ++
      if (findItem) {
        findItem.count++; //увеличь его в этом объекте на+1 и редакс сделает перерисовку
      } else { //если не нашёлся то добавляю новый объект
        state.items.push({ //добавление продукта
          ...action.payload,
          count: 1,// добавлен 1 продукт
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action:PayloadAction<string>) {// id это стринг и когда передаю говорю уменьши какое то id
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action:PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);//найти объект у которого id не совпадает с action.payload я payload буду передавать id
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;//очищаю тоталпрайс
    },
  },
});


export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;