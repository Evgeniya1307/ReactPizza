import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type Sort = {
  name: string,
      sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title'|'-price' ;
}

//типизирую
interface FilterSliceState {// стейт чистой фильтрации
  searchValue:string,
  categoryId: number,
  currentPage:number,
  sort: Sort,
}


const initialState: FilterSliceState = {
   searchValue: '',
  categoryId: 0,
   currentPage:1,
    sort:{
      name: 'по популярности',
      sortProperty: 'rating',
    },
}

 const filterSlice = createSlice({
    name: 'filter',
    initialState,
 reducers: {
      setCategoryId(state,action:PayloadAction<number>){ //меняет категорию 
state.categoryId = action.payload;
      },

      setSearchValue(state,action:PayloadAction<string>){ 
state.searchValue = action.payload;
      },

      setSort(state, action:PayloadAction<Sort>) { //меняем сорт
        state.sort = action.payload;//payload хранит то что передаю в dispath()
      },
      setCurrentPage(state, action:PayloadAction<number>) {
        state.currentPage = action.payload;
      },
      setFilters(state, action:PayloadAction<FilterSliceState>) {// ожидает получить все св-ва которые есть в стейте из за этого передаю <FilterSliceState>
      if(Object.keys(action.payload).length){
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);//  state когда тебе придёт currentPage то должен в action.payload.currentPage вшить то что есть  
        state.categoryId =Number(action.payload.categoryId);
      }else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating',
        }
      }
        
  },
    }
  });


  export const selectFilter=(state:RootState)=>state.filter;//для фильтрации
  export const selectSort = (state:RootState)=>state.filter.sort;// для сортировки
  

  export const { setCategoryId,setSort,setCurrentPage , setFilters, setSearchValue} = filterSlice.actions;
  export default filterSlice.reducer;
























// const initialState = {
//   categoryId: 0,
//   currentPage: 1,
//   sort: {
//     name: "популярности",
//     sortProperty: "rating",
//   },
// };

// const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     setCategoryId(state, action) {
//       state.categoryId = action.payload;
//     },
//     setSort(state, action) {
//       state.sort = action.payload;
//     },
//     setCurrentPage(state, action) {
//       state.currentPage = action.payload;
//     },
//   },
// });

// export const { setCategoryId,setSort,setCurrentPage } = filterSlice.actions;
// export default filterSlice.reducer;