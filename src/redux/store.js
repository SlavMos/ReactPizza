import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/filterSlice"; // убедитесь, что импортируете редуктор правильно

export const store = configureStore({
  reducer: {
    counter: counterReducer, // используйте корректное имя редуктора
  },
});
