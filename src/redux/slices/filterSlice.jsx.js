import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort:{
      name: 'по популярности',
      sortProperty: 'rating',
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    initialState,

    reducers: {
      setCategoryId(state,action){ //хочу из-ть стейт
state.categoryId = action.payload
      },

      setSort(state, action) {
        state.sort = action.payload;
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