import React from "react";
import axios from "axios";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setSort,
  setCurrentPage,
} from "../redux/slices/filterSlice";

export const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId); // берем из данных то что нам надо
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage); // for pagination
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]); // для fetch запроса
  const [isLoading, setIsLoading] = React.useState(true); // for skeleton
  // const [category, setCategory] = React.useState(0); // чтобы фильтровать по категориям
  //const [currentPage, setCurrentPage] = React.useState(1); // для погинации(1.2.3) // чтобы сортировать по категориям
  const [errorMessage, setErrorMessage] = React.useState(""); // для сообщений об ошибках

  //DISPATCHIM TUT =)
  const onClickCategory = (id) => {
    //СОЗДАЛИ ФУНКЦИЮ КОТОРАЯ ПРИНИМАЕТ IDCATEGORY(ПЕРЕДАЛИ КОМПОНЕНТУ КАТЕГОРИЙ,И ТОТ ID КОТОРЫЙ ПРИНЯЛИ ПЕРЕДАЛИ В FILTERSLISE)
    dispatch(setCategoryId(id));
  };

  const onChangeSort = (obj) => {
    dispatch(setSort(obj));
  };
  const onChangePagination = (obj) => {
    dispatch(setCurrentPage(obj));
  };

  React.useEffect(() => {
    setIsLoading(true); // чтобы при переключении категорий появился скелетон
    setErrorMessage(""); // сбросить сообщение об ошибке
    axios
      .get(
        `https://666c15f449dbc5d7145c8874.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sortType.sort}&order=desc${
          searchValue ? `&title=${searchValue}` : ""
        }`
      )
      .then((res) => {
        // вытаскиваем ответ от сервера
        setItems(res.data);
        setIsLoading(false); // чтобы скелетон закрылся
      })
      .catch((error) => {
        // обработка ошибки
        console.error("Произошла ошибка при запросе данных:", error);
        setIsLoading(false); // чтобы скелетон закрылся даже в случае ошибки
        // можно также показать сообщение пользователю
        setErrorMessage("Пицца не найдена"); // установка сообщения об ошибке
      });

    window.scrollTo(0, 0); // делает скрол вверх после рендера
  }, [categoryId, sortType, searchValue, currentPage]); // зависимости, которые вызывают повторный запрос при изменении

  const pizzas = Array.isArray(items)
    ? items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    : [];

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />{" "}
        {/* для изменения категорий */}
        <Sort sortValue={sortType} onChangeSort={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? (
          [...new Array(8)].map((_, index) => <Skeleton key={index} />) // отображаем скелетоны
        ) : errorMessage ? (
          <div className="error__message">{errorMessage}</div>
        ) : (
          pizzas
        )}
      </div>
      <Pagination setCurrentPage={onChangePagination} />
    </>
  );
};

export default Home;
