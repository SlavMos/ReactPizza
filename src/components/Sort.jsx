import React from "react";

const Sort = (props) => {
  const [open, setOpen] = React.useState(false); // Состояние для управления открытием и закрытием попапа
  const sortRef = React.useRef(); // Реф для получения ссылки на DOM элемент (блок сортировки)

  const openClick = () => {
    setOpen(!open); // Переключение состояния открытия попапа при клике на сортировку
  };

  const popupList = [
    { name: "Популярности", sort: "rating" },
    { name: "Цене", sort: "price" },
    { name: "Алфавиту", sort: "title" },
  ]; // Массив с опциями сортировки для отображения в попапе

  // const sortName = popupList[props.sortValue].name;
  // Комментировано: Используется для отображения имени выбранного элемента из попапа

  const onClickItem = (obj) => {
    props.onChangeSort(obj); // Вызываем функцию изменения сортировки, передавая выбранный объект
    setOpen(false); // Закрываем попап после выбора опции
  };

  React.useEffect(() => {
    // Функция для закрытия попапа при клике вне его области
    const handleClickOutside = (event) => {
      const path = event.composedPath(); // Получаем путь клика
      if (!path.includes(sortRef.current)) {
        setOpen(false); // Закрываем попап если клик был вне него
        console.log("oust"); // Лог для проверки
      }
    };

    // Добавляем обработчик клика по всему документу
    document.body.addEventListener("click", handleClickOutside);

    // Удаляем обработчик клика при размонтировании компонента
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      {" "}
      {/* Привязываем реф к блоку сортировки */}
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        {/* Отображаем выбранное значение сортировки */}
        <span onClick={openClick}>{props.sortValue.name}</span>
      </div>
      {open && ( // Если состояние open true, отображаем попап
        <div className="sort__popup">
          <ul>
            {popupList.map((obj, index) => (
              <li
                key={index}
                className={props.sortValue.sort === obj.sort ? "active" : ""} // Подсвечиваем активный элемент
                onClick={() => {
                  onClickItem(obj); // При клике на элемент вызываем функцию выбора
                }}
              >
                {obj.name} {/* Отображаем название опции сортировки */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
