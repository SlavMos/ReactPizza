import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0, //начальное состояние категорий
  currentPage: 1,
  sort: {
    name: "Популярности", //начальное состояние сортировки
    sort: "rating",
  },
};

const filterSlice = createSlice({
  // Slise-часть(хранилище) (тут будет храниться логика обраюотки нашего state)
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;
export default filterSlice.reducer;
