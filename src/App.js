import Categories from "./components/Categories.jsx";
import Header from "./components/Header.jsx";
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton.jsx";
import Sort from "./components/Sort.jsx";
import "./scss/app.scss";
import React from "react";

function App() {
  const [items, setItems] = React.useState([]); // для fetch запроса
  const [isLoading, setIsLoading] = React.useState(true); //for skeleton

  React.useEffect(() => {
    fetch("https://666c15f449dbc5d7145c8874.mockapi.io/items") //когда будет fetch запрос
      .then((res) => {
        // тогда перекомвертируй в json формат
        return res.json();
      })
      .then((json) => {
        //тогда верни данные в setItems
        setItems(json); // передаем в json в  setItems
        setIsLoading(false);
      });
  }, []); // чтобы вызвался один раз(componentDidMount)

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
            {isLoading
              ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
              : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
