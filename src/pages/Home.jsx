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
import { fetchPizzas } from "../redux/slices/PizzasSlice";

export const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId); // берем из данных то что нам надо
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage); // for pagination
  const items = useSelector((state) => state.pizza.items);
  const status = useSelector((state) => state.pizza.status);
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);

  //const [isLoading, setIsLoading] = React.useState(true); // for skeleton
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

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        currentPage,
        sortType,
        categoryId,
        searchValue,
      })
    );

    window.scrollTo(0, 0); // делает скрол вверх после рендера
  };

  React.useEffect(() => {
    getPizzas(); // вызов функции при изменении зависимостей
  }, [categoryId, sortType, searchValue, currentPage]);

  // Проверяем, является ли items массивом. Если да, то создаем массив компонентов PizzaBlock
  // Для каждого объекта obj из массива items передаем его свойства (через spread оператор ...obj)
  // В качестве ключа (key) используем уникальный id пиццы.
  const pizzas = Array.isArray(items)
    ? items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    : []; // Если items не массив, pizzas будет пустым массивом.

  return (
    <>
      <div className="content__top">
        {/* Компонент Categories отвечает за выбор категорий пицц */}
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        {/* Компонент Sort отвечает за выбор параметра сортировки */}
        <Sort sortValue={sortType} onChangeSort={onChangeSort} />
      </div>

      {/* Заголовок раздела с пиццами */}
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {/* Если данные загружаются, отображаем массив скелетонов для визуальной загрузки */}
        {status === "Loading" ? (
          [...new Array(8)].map((_, index) => <Skeleton key={index} />) // Создаем 8 скелетонов с уникальными ключами
        ) : errorMessage ? (
          // Если произошла ошибка при загрузке данных, отображаем сообщение об ошибке
          <div className="error__message">{errorMessage}</div>
        ) : (
          // Если данные загружены успешно, отображаем пиццы
          pizzas
        )}
      </div>

      {/* Компонент Pagination отвечает за пагинацию страниц с пиццами */}
      <Pagination setCurrentPage={onChangePagination} />
    </>
  );
};

export default Home;
