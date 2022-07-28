import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterSliceState, Sort, SortPropertyEnum } from "../filter/types";



const initialState: IFilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: "",
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};


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
      setFilters(state, action:PayloadAction<IFilterSliceState>) {
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
    }
      },
  });


  export const {
    setCategoryId,
    setSort,
    setCurrentPage,
    setFilters,
    setSearchValue,
  } = filterSlice.actions;
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