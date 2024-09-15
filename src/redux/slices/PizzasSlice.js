import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронный экшен для получения пицц с помощью axios
export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus", // уникальный идентификатор экшена
  async (params) => {
    const { currentPage, sortType, categoryId, searchValue } = params;
    const res = await axios.get(
      `https://66e41e6bd2405277ed132687.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType.sort}&order=desc${
        searchValue ? `&title=${searchValue}` : ""
      }`
    );
    return res.data; // возвращаем данные (только массив пицц)
  }
);

// Начальный стейт для слайса
const initialState = {
  items: [], // массив пицц
  status: "loading", // статус запроса (Loading, success, error)
};

// Создаем слайс для работы с пиццами
const pizzasSlice = createSlice({
  name: "pizzas", // имя слайса
  initialState, // начальный стейт
  reducers: {
    setItems(state, action) {
      state.items = action.payload; // можно вручную устанавливать элементы пицц
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading"; // статус "загрузка"
        state.items = []; // очищаем пиццы на время загрузки
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload; // сохраняем пиццы в стейт
        state.status = "success"; // статус "успех"
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = ""; // статус "ошибка"
        state.items = []; // очищаем пиццы при ошибке
      });
  },
});

// Экспортируем экшен и редьюсер
// export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
