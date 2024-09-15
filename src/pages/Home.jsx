import React from "react";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App"; // для работы с поиском
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setSort,
  setCurrentPage,
} from "../redux/slices/filterSlice"; // экшены для фильтрации, сортировки и пагинации
import { fetchPizzas } from "../redux/slices/PizzasSlice"; // асинхронный экшен для получения данных пицц
import { Link } from "react-router-dom";

export const Home = () => {
  // Достаем нужные данные из стейта Redux (выбранная категория, тип сортировки, текущая страница, пиццы и статус)
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const items = useSelector((state) => state.pizza.items);
  const status = useSelector((state) => state.pizza.status);

  const dispatch = useDispatch(); // хук для диспатча экшенов

  // Достаем значение из контекста поиска (например, для фильтрации по названию)
  const { searchValue } = React.useContext(SearchContext);

  // Функция для смены категории (диспатчим экшен `setCategoryId`)
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  // Функция для смены сортировки (диспатчим экшен `setSort`)
  const onChangeSort = (obj) => {
    dispatch(setSort(obj));
  };

  // Функция для изменения текущей страницы (диспатчим экшен `setCurrentPage`)
  const onChangePagination = (obj) => {
    dispatch(setCurrentPage(obj));
  };

  // Функция для получения пицц (асинхронный запрос через Redux Thunk)
  const getPizzas = async () => {
    // Диспатчим экшен `fetchPizzas`, передаем необходимые параметры
    dispatch(
      fetchPizzas({
        currentPage,
        sortType,
        categoryId,
        searchValue,
      })
    );

    // Скроллим страницу вверх после рендера пицц
    window.scrollTo(0, 0);
  };

  // `useEffect` срабатывает при изменении зависимостей (категория, сортировка, поисковое значение, текущая страница)
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  // Проверяем, является ли `items` массивом. Если да, создаем массив компонентов `PizzaBlock`
  // Для каждого объекта передаем его свойства через спред оператор
  const pizzas = Array.isArray(items)
    ? items.map((obj) => (
        <Link key={obj.id} to={`pizza/${obj.id}`}>
          <PizzaBlock {...obj} />
        </Link>
      ))
    : [];

  return (
    <>
      <div className="content__top">
        {/* Компонент Categories отвечает за выбор категорий */}
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        {/* Компонент Sort отвечает за выбор сортировки */}
        <Sort sortValue={sortType} onChangeSort={onChangeSort} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {/* Отображаем скелетоны, сообщение об ошибке или пиццы в зависимости от статуса */}
        {status === "loading" ? (
          [...new Array(8)].map((_, index) => <Skeleton key={index} />)
        ) : status === "error" ? (
          <div className="error__message"> Ничего не найдено!</div>
        ) : (
          pizzas
        )}
      </div>

      {/* Компонент Pagination для пагинации */}
      <Pagination setCurrentPage={onChangePagination} />
    </>
  );
};

export default Home;
