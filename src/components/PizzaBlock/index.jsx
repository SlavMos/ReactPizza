import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cardSlice";

const PizzaBlock = ({ id, title, sizes, imageUrl, price, types }) => {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const typesNames = ["традиционное", "тонкое"];

  // Используем useSelector, чтобы найти конкретный элемент в корзине по id
  const cartItem = useSelector((state) =>
    state.card.items.find((obj) => obj.id === id)
  );

  // Если cartItem существует, то добавляем количество, иначе показываем "0"
  const addedCount = cartItem ? cartItem.count : "0";

  const dispatch = useDispatch();

  // Функция для добавления пиццы в корзину
  const onAddClick = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: types[activeType], // Тип пиццы (например, тонкое или традиционное тесто)
      size: sizes[activeSize], // Размер пиццы
    };

    console.log("Item being added:", item); // Проверяем, что выводится в консоли
    dispatch(addItem(item)); // Добавляем элемент в корзину через Redux action
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                key={index}
                onClick={() => setActiveType(index)} // Устанавливаем активный тип при клике
                className={activeType === index ? "active" : ""}
              >
                {typesNames[index]} {/* Отображаем тип теста */}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)} // Устанавливаем активный размер при клике
                className={activeSize === index ? "active" : ""}
              >
                {size} см. {/* Отображаем размер пиццы */}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price"> от {price} руб</div>
          <button
            onClick={onAddClick} // Добавляем пиццу в корзину при клике
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}{" "}
            {/* Отображаем количество добавленных пицц */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
