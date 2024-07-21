import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // начальное  состояние такое же как  в  React.useState("")
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState, // начальное  состояние такое же как  в  React.useState("")
  reducers: {
    increment: (state) => {
      // ACTION INCREMENT ПРОСТО МЫ НЕ ПИШЕМ(ACTION рядом)
      state.value += 1;
    },
    decrement: (state) => {
      // ACTION DECREMENT
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

//ACTION-КОМАНДА
