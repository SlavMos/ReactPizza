import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import card from "./slices/cardSlice";
import pizza from "./slices/PizzasSlice";

export const store = configureStore({
  reducer: {
    filter, //добавили наш slice  в хранилище редакс
    card,
    pizza,
  },
});
