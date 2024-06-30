import React from "react";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";

export const Home = () => {
  const [items, setItems] = React.useState([]); // для fetch запроса
  const [isLoading, setIsLoading] = React.useState(true); //for skeleton
  const [category, setCategory] = React.useState(0); //что бы фильтровать по категориям(передаем через пропсы  категориям)
  const [sort, setSort] = React.useState({
    name: "Популярности",
    sort: "rating",
  }); // что бы сортировать по категориям(так же как до этого)
  React.useEffect(() => {
    setIsLoading(true); //что бы переключения категорий появился скелетон
    fetch(
      `https://666c15f449dbc5d7145c8874.mockapi.io/items?${
        category > 0 ? `category=${category}` : ""
      }&sortBy=${sort.sort}&order=desc `
    ) //когда будет fetch запрос
      .then((res) => {
        // тогда перекомвертируй в json формат
        return res.json();
      })
      .then((json) => {
        //тогда верни данные в setItems
        setItems(json); // передаем в json в  setItems
        setIsLoading(false);
      });
    window.scrollTo(0, 0); // делает скрол вверх после рендера
  }, [category, sort]); // чтобы вызвался один раз(componentDidMount),но так как бы добавили категории будет менятся и показывать категории

  return (
    <>
      <div className="content__top">
        <Categories value={category} onClickCategory={(i) => setCategory(i)} />{" "}
        {/* // для изменения категорий */}
        <Sort sortValue={sort} onChangeSort={(i) => setSort(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  );
};

export default Home;
