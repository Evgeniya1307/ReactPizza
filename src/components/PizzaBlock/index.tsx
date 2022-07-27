import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemById } from "../../redux/cart/selectors";
import {Link} from "react-router-dom";
import {CartItem} from "../../redux/cart/types";
import{addItem} from "../../redux/cart/cartSlice"

//типизирую
type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id)) //selectCartItemById передала фу-ию созданную в cartslice addedCount -ко-во добавлений,вытаскиваю стейт,стейт карт айтемс,find -ищу пиццу если совпадают вытащю каунт
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  
  const addedCount = cartItem ? cartItem.count : 0;// если в корзине нашёлся такой товар то вытащю коунт иначе передам 0
  
  const typeNames = ["тонкое", "традиционное"];
  
  const onClickAdd = () => {
    const item : CartItem = {
      //сгенерирую объект и такой объект юудет хр-с в корзине товар который буду доб-ть показываю что я выбрала
      id,
      title, //заголовок
      price, //стоимость
      imageUrl, // мне нужна картинка её вывести
      type: typeNames[activeType],
      size: sizes[activeSize],
     count:0,
    };
    dispatch(addItem(item));; //вызвать и передать айтэм
    
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
      <Link key={id} to={`/pizza/${id}`}>
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        </Link>

        <div className="pizza-block__selector">
          <ul>
            {/* рендарю тонкое традиционное тесто(0-1)*/}
            {types.map((typeId) => (//есть индекс у тонкоетрадиционное
                <li
                  key={typeId}
                  onClick={() => setActiveType(typeId)}
                  className={activeType === typeId ? "active" : ""}
                >
                  {typeNames[typeId]}
                </li> // при рендери вытащи значение из typeNames
              )
            )}{" "}
            {/* <li onClick={()=>setActiveType(type)}соз-ла анонимную фу-ию и передала сразу обновления будет выбираться тип тесто*/}
          </ul>
          <ul>
            {/* рендарю размеры пицц*/}
            {sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
            {/* <li onClick={()=>setActiveSize(i)}для выбора см пиццы */}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от{price} ₽</div>
          <button
            onClick={onClickAdd}
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
            {addedCount > 0 && <i>{addedCount}</i>}{/*если Ю0 то рендери правую часть */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
