import React from "react";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";
import ReactPaginate from "react-paginate";

export const Home = (props) => {
  const [items, setItems] = React.useState([]); // для fetch запроса
  const [isLoading, setIsLoading] = React.useState(true); // for skeleton
  const [category, setCategory] = React.useState(0); // чтобы фильтровать по категориям
  const [currentPage, setCurrentPage] = React.useState(1); // для погинации(1.2.3)
  const [sort, setSort] = React.useState({
    name: "Популярности",
    sort: "name",
  }); // чтобы сортировать по категориям
  const [errorMessage, setErrorMessage] = React.useState(""); // для сообщений об ошибках

  React.useEffect(() => {
    setIsLoading(true); // чтобы при переключении категорий появился скелетон
    setErrorMessage(""); // сбросить сообщение об ошибке

    fetch(
      `https://666c15f449dbc5d7145c8874.mockapi.io/items?page=${currentPage}&limit=4&${
        category > 0 ? `category=${category}` : ""
      }&sortBy=${sort.sort}&order=desc${
        props.searchValue ? `&title=${props.searchValue}` : ""
      }`
    )
      .then((res) => {
        if (!res.ok) {
          //ПРОВЕРКА ДАННЫХ ДЛЯ ВЫВОДА ОШИБКИ
          throw new Error("Ошибка сети");
        }
        return res.json();
      })
      .then((json) => {
        if (Array.isArray(json) && json.length > 0) {
          setItems(json); // если данные есть, устанавливаем их
        } else {
          setItems([]); // если данных нет, устанавливаем пустой массив
          setErrorMessage("Пицца не найдена."); // показываем сообщение об отсутствии данных
        }
        setIsLoading(false); //когда массив пицц показался убираем скелетон
      })
      .catch((error) => {
        setErrorMessage("Произошла ошибка при загрузке данных."); // показываем сообщение об ошибке
        setIsLoading(false); // скрываем скелетон
      });

    window.scrollTo(0, 0); // делает скрол вверх после рендера
  }, [category, sort, props.searchValue, currentPage]); // зависимости, которые вызывают повторный запрос при изменении

  const pizzas = Array.isArray(items)
    ? items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    : [];

  return (
    <>
      <div className="content__top">
        <Categories value={category} onClickCategory={(i) => setCategory(i)} />{" "}
        {/* для изменения категорий */}
        <Sort sortValue={sort} onChangeSort={(i) => setSort(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? (
          [...new Array(8)].map((_, index) => <Skeleton key={index} />) // отображаем скелетоны
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          pizzas
        )}
      </div>
      <Pagination setCurrentPage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
