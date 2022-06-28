import React from "react";

import Skeleton from "../components/PizzaBlock/Sceleton";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState(0); // будет делать изменение сортировки setSortType
  
  React.useEffect(() => {
    setIsLoading(true); // перед загрузкой идёт имогу выбирать по филтрации пиццы
    fetch("https://62b41f5aa36f3a973d2c669d.mockapi.io/items?category=" + categoryId)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);//после загрузки запрос завершился
      });
      window.scrollTo(0,0);//js делаю скрол вверх
  }, [categoryId]);
  return (
    <div className="container">
      <div className="content__top">
      <Categories
      value={categoryId}
      onChangeCategory={(i) => setCategoryId(i)}
    /> {/*// в онклик передаю фу-ию  когда ты сработаешь onChangeCategory={(i) то вызови мне  setCategoryId=(i) */}
    <Sort value={sortType} onChangeSort={(i) => setSortType(i)} /> {/*делаю сортировку по популярности и т,д */}
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock 
          key={obj.id}
            title={obj.title}
             price={obj.price}
            image={obj.imageUrl}
            sizes={obj.sizes}
            types={obj.types} />)}
      </div>
 </div>
  );
};

export default Home;

 {/*можно так а можно и если увереная что будут точно такие объекты по корече {...obj}/>) */}