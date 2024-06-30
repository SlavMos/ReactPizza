import React from "react";

const Categories = (props) => {
  const categories = [
    "Все",
    "Вегетарианская",
    "Мясные",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={categoryName}
            onClick={() => props.onClickCategory(i)}
            className={props.value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
