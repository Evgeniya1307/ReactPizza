import React from "react";
import {useDispatch, useSelector} from "react-redux"
import{addItem} from "../../redux/slices/cartSlice"

function PizzaBlock({ id,title, price, imageUrl, sizes, types }) {
  const dispatch= useDispatch();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const typeNames = ["тонкое", "традиционное"];

 const onClickAdd =()=>{
  const item = { //сгенерирую объект и такой объект юудет хр-с в корзине товар который буду доб-ть показываю что я выбрала
id, 
title,//заголовок
price, //стоимость
imageUrl, // мне нужна картинка её вывести
  type:activeType,
  size:activeSize,
} 
dispatch(addItem(item))//вызвать и передать айтэм
 }
 
 
 
  return (
    <div className="pizza-block-wrapper">
    <div className="pizza-block">
      <h4 className="pizza-block__title">{title}</h4>
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />

      <div className="pizza-block__selector">
        <ul>
          {/* рендарю тонкое традиционное тесто(0-1)*/}
          {types.map(
            (
              type //есть индекс у тонкоетрадиционное
            ) => (
              <li
                key={type}
                onClick={() => setActiveType(type)}
                className={activeType === type ? "active" : ""}
              >
                {typeNames[type]}
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
        <button className="button button--outline button--add">
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
          <i>0</i>
        </button>
      </div>
    </div>
    </div>
  );
}

export default PizzaBlock;
