import Categories from "./components/Categories.jsx";
import Header from "./components/Header.jsx";
import PizzaBlock from "./components/PiizzaBlock.jsx";
import Sort from "./components/Sort.jsx";
import "./scss/app.scss";
import React from "react";

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
