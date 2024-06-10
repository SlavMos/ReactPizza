import React from "react";

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

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
        {categories.map((v, i) => (
          <li
            onClick={() => onClickCategory(i)}
            className={activeIndex === i ? "active" : ""}
          >
            {v}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
