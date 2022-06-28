import React from "react";

import Skeleton from "../components/PizzaBlock/Sceleton";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";

const Home = ({searchValue}) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  }); //тут хранится объект в нём есть св-тва sortType пере-ся в комепонент Sort.../>он выта-ся из велью и велью хранит в себе объект и это велью рендарю там где спан и {value.name}   хранится логика сортировки  будет делать изменение сортировки setSortType

  
  
  React.useEffect(() => {
    setIsLoading(true); // перед загрузкой идёт имогу выбирать по филтрации пиццы

    const sortBy = sortType.sortProperty.replace("-", ""); //replace("-") из св-ства удали - если будет 
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc"; // проверка на если есть - то делай сортировку по возрастанию иначе по убыванию 
    const category = categoryId > 0 ? "category" : `category=${categoryId}`;

      fetch(
        `https://62b41f5aa36f3a973d2c669d.mockapi.io/items?page=${category}&sortBy${sortBy}&order=${order}`
      )// по убыванию сортировать
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr); //возвращает новые пиццы
        setIsLoading(false); //после загрузки запрос завершился
      });
    window.scrollTo(0, 0); //js делаю скрол вверх
  }, [categoryId, sortType]); //массив зависимости следит если изменения иди в бэкенд и делается запрос на получение новых пицц
  
  const pizzas=items.filter(obj=>{
 if(obj.title.includes(searchValue)){ //если в объекте title содержит то что есть searchValue то сделай true 
  return true;
 }

 return false; //иначе фолс
  }).map((obj) => <PizzaBlock key={obj.id}
      title={obj.title}
      price={obj.price}
      image={obj.imageUrl}
      sizes={obj.sizes}
      types={obj.types}
    />) // массив объектов переобразую в массив пицц
 
const  skeletons =[...new Array(6)].map((_, index) => <Skeleton key={index} />)

  
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />{" "}
        {/*// в онклик передаю фу-ию  когда ты сработаешь onChangeCategory={(i) то вызови мне  setCategoryId=(i) */}
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />{" "}
        {/*делаю сортировку по популярности и т,д */}
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading  ? skeletons : pizzas}
      </div>
    </div>
  );
};

export default Home;

{
  /*можно так а можно и если увереная что будут точно такие объекты по корече {...obj}/>) */
}
