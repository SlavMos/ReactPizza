import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import card from "./slices/cardSlice";

export const store = configureStore({
  reducer: {
    filter, //добавили наш slice  в хранилище редакс
    card,
  },
});
