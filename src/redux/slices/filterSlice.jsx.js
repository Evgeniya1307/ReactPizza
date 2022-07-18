import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      setCategoryId(state,action){ //меняет категорию 
state.categoryId = action.payload;
      },

      setSearchValue(state,action){ 
state.searchValue = action.payload;
      },

      setSort(state, action) { //меняем сорт
        state.sort = action.payload;//payload хранит то что передаю в dispath()
      },
      setCurrentPage(state, action) {
        state.currentPage = action.payload;
      },
      setFilters(state, action) {
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);//  state когда тебе придёт currentPage то должен в action.payload.currentPage вшить то что есть  
        state.categoryId =Number(action.payload.categoryId);
  },
    }
  });


  export const selectFilter=(state)=>state.filter;//для фильтрации
  export const selectSort = (state)=> state.filter.sort;// для сортировки
  

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