import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    pageCount:1,
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

      setSort(state, action) { //меняем сорт
        state.sort = action.payload;//payload хранит то что передаю в dispath()
      },
      setCurrentPage(state, action) {
        state.currentPage = action.payload;
      },
    },
  });


  export const { setCategoryId,setSort,setCurrentPage } = filterSlice.actions;
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