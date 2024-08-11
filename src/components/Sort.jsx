import React from "react";

const Sort = (props) => {
  const [open, setOpen] = React.useState(false);
  const sortRef = React.useRef(); // для dom sorta

  const openClick = () => {
    setOpen(!open); // for open and close popup
  };
  const popupList = [
    { name: "Популярности", sort: "rating" },
    { name: "Цене", sort: "price" },
    { name: "Алфавиту ", sort: "title" },
  ]; // for popup List(click)
  // const sortName = popupList[props.sortValue].name; // после выбора попап листа остается то значение которое выбрали
  const onClickItem = (obj) => {
    props.onChangeSort(obj);
    setOpen(false); // закрывает попап после выбора
  };

  React.useEffect(() => {
    // закрываем попап при клике вне попапа
    const handleClickOutside = (event) => {
      const path = event.composedPath(); // Получаем путь события
      if (!path.includes(sortRef.current)) {
        setOpen(false);
        console.log("oust");
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={sortRef} className="sort">
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
        <span onClick={openClick}>{props.sortValue.name}</span>
      </div>
      {open && ( // if open true ->{div}
        <div className="sort__popup">
          <ul>
            {popupList.map((obj, index) => (
              <li
                key={index}
                className={props.sortValue.sort === obj.sort ? "active" : ""} //переключение по попапу
                onClick={() => {
                  onClickItem(obj);
                }}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
