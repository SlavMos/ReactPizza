import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0, //начальное состояние категорий
  sort: {
    name: "Популярности", //начальное состояние сортировки
    sort: "name",
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
      state.sort.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;
export default filterSlice.reducer;
