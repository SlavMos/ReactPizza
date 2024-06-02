import Categories from "./components/Categories.jsx";
import Header from "./components/Header.jsx";
import PizzaBlock from "./components/PizzaBlock.jsx";
import Sort from "./components/Sort.jsx";
import "./scss/app.scss";
import React from "react";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
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
