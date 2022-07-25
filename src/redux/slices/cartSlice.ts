import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';



//типизирую тип который является структурой слайсов
export type CartItem ={
  id:string,
  title:string,
  price:number,
  imageUrl:string,
  type:string,
  size:number;
  count:number;
}

interface CartSliceState{
  totalPrice:number;
  items:CartItem[]; 
}

const initialState: CartSliceState= {
  totalPrice: 0,
  items: [], //товары 
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action:PayloadAction<CartItem>) { // найди объект в массиве корзина будет добавлять CartItem
      const findItem = state.items.find((obj) => obj.id === action.payload.id);// если в stateitems был найден объект у которого равен action.payload.id если такой объект нашёлся то делаю коунт ++

      if (findItem) {
        findItem.count++; //увеличь его в этом объекте на+1 и редакс сделает перерисовку
      } else { // если не нашёлся то добавляю новый объект
        state.items.push({ //добавление продукта
          ...action.payload,
          count: 1,// добавлен 1 продукт
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum; // когда доб-шь новую пиццу пробежись по массиву уз-ть сколько всего пицц и вывести их сумму  изменила items и сразу вычеслила сумму сколько стоит сколько раз добавили + предыдущ сумму
      }, 0);
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
export const selectCart = (state:RootState) => state.cart;
export const selectCartItemById = (id:string) => (state:RootState) => state.cart.items.find((obj) => obj.id === id) // фу-ия получает id и эта фу-ия вернёт др,фу-ию 

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;