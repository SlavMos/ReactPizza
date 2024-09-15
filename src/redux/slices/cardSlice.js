import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};
console.log(initialState.items);
const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addItem(state, action) {
      // Найти элемент в корзине посчid
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        // Если элемент найден, увеличить его количество
        findItem.count++;
      } else {
        // Если элемент не найден, добавить его в корзину с количеством 1
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      // Пересчитать общую стоимость корзины
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearAllItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        // Если элемент найден, увеличить его количество(уменьшение)
        findItem.count--;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  clearItem,
  setSumId,
  clearAllItems,
  plusItem,
  minusItem,
} = cardSlice.actions;
export default cardSlice.reducer;
