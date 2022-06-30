import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice.jsx";

import Skeleton from "../components/PizzaBlock/Sceleton";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId); // вытаскиваю свой стейт с помощью этого хука описываю всё что нужно через . мне вытищить
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  

  // const [sortType, setSortType] = React.useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // }); //тут хранится объект в нём есть св-тва sortType пере-ся в комепонент Sort.../>он выта-ся из велью и велью хранит в себе объект и это велью рендарю там где спан и {value.name}   хранится логика сортировки  будет делать изменение сортировки setSortType

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id)); //метод меняеющий категорию
  };

  React.useEffect(() => {
    setIsLoading(true); // перед загрузкой идёт имогу выбирать по филтрации пиццы

    const sortBy = sortType.replace("-", ""); //replace("-") из св-ства удали - если будет
    const order = sortType.includes("-") ? "asc" : "desc"; // проверка на если есть - то делай сортировку по возрастанию иначе по убыванию
    const category = categoryId > 0 ? "category" : `category=${categoryId}`;
    const search = searchValue ? `&search="${searchValue}"` : "";

    fetch(
      `https://62b41f5aa36f3a973d2c669d.mockapi.io/items?page={currentPage}&limit=4&${category}&sortBy${sortBy}&order=${order}${search}`
    ) // по убыванию сортировать
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr); //возвращает новые пиццы
        setIsLoading(false); //после загрузки запрос завершился
      });
    window.scrollTo(0, 0); //js делаю скрол вверх
  }, [categoryId, sortType, searchValue, currentPage]); //массив зависимости следит если изменения иди в бэкенд и делается запрос на получение новых пицц

  const pizzas = items.map((obj) => (
    <PizzaBlock
      key={obj.id}
      title={obj.title}
      price={obj.price}
      image={obj.imageUrl}
      sizes={obj.sizes}
      types={obj.types}
    />
  )); // массив объектов переобразую в массив пицц

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        {/*// в онклик передаю фу-ию  когда ты сработаешь onChangeCategory={(i) то вызови мне  setCategoryId=(i) */}
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;

{
  /*можно так а можно и если увереная что будут точно такие объекты по корече {...obj}/>) */
}
