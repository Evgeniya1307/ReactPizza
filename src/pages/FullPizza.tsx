/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

//инфа по пицце

export const FullPizza: React.FC = () => {
  // это тип из react это функционал,компонент
  const [pizza, setPizza] = React.useState<{
    // содержит определён,тип данных
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate(); //этот хук вернёт фу-ию который позволит делать переходы если пиццы нет то перекинуть человека на главную

  React.useEffect(() => {
    // внутри со-ю асинхрон фу-ию и её вызываю
    async function FetchPizzas() {
      try {
        const { data } = await axios.get("https://62b41f5aa36f3a973d2c669d.mockapi.io/items/" + id);
        setPizza(data);
      } catch (error) {
        //когда будет catch
        alert("ошибка при получении пиццы"); // сначала alert а потом переход на главную
        navigate('/');
      }
    }
    FetchPizzas();
  }, [id, navigate]);

  if (!pizza) {
    // проверка нужно ли из пиццы вытащить что то
    return <>Загрузка...</>; //возвращаю фрагмент придёт реактовский элемент если пицца пустая undefined то покажи загрузку
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        {" "}
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
