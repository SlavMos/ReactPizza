import Categories from "./components/Categories.jsx";
import Header from "./components/Header.jsx";
import PizzaBlock from "./components/PizzaBlock.jsx";
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
            <PizzaBlock title="Мексиканское" price={500} />
            <PizzaBlock title="Итальянское" price="300" />
            <PizzaBlock title="Итальянское" price="300" />
            <PizzaBlock title="Итальянское" price="300" />
            <PizzaBlock title="Итальянское" price="300" />
            <PizzaBlock title="Итальянское" price="300" />
            <PizzaBlock title="Итальянское" price="300" />
            <PizzaBlock title="Итальянское" price="300" />
            <PizzaBlock title="Итальянское" price="300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
