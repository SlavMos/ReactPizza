import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://66e41e6bd2405277ed132687.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Error");
      }
    }
    fetchPizza();
  }, []);
  console.log(pizza);

  if (!pizza) {
    return "Загрузка...";
  }
  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4> {pizza.price} р </h4>
    </div>
  );
};

export default FullPizza;
