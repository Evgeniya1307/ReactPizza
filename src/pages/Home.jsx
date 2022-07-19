import React, { useEffect } from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters, selectFilter
} from "../redux/slices/filterSlice.jsx";
import { useNavigate } from "react-router-dom";

import Skeleton from "../components/PizzaBlock/Sceleton";
import PizzaBlock from "../components/PizzaBlock";
import Sort, { sortList } from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import { fetchPizzas, selecPizzaData} from "../redux/slices/pizzaSlice.jsx";
 
const Home = () => {
  const navigate = useNavigate(); //дай фу-ию из своего хука
  const dispatch = useDispatch();
  
  const isSearch = React.useRef(false); // поиска пота нет по умолчанию ничего нет
  const isMounted = React.useRef(false); //пока-ет что первого рендера небыло приложение уже один раз отрисовалось

  const {items,status} = useSelector(selecPizzaData);//фун-ия создана в pizzaSlice
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter); // вытаскиваю свой стейт с помощью этого хука описываю всё что нужно через . мне вытищить
  

  // const [sortType, setSortType] = React.useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // }); //тут хранится объект в нём есть св-тва sortType пере-ся в комепонент Sort.../>он выта-ся из велью и велью хранит в себе объект и это велью рендарю там где спан и {value.name}   хранится логика сортировки  будет делать изменение сортировки setSortType

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }
  //метод меняеющий категорию

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", ""); //replace("-") из св-ства удали - если будет
    const order = sort.sortProperty.includes("-") ? "asc" : "desc"; // проверка на если есть - то делай сортировку по возрастанию иначе по убыванию
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // fetch(
    //   `https://62b41f5aa36f3a973d2c669d.mockapi.io/items?page={currentPage}&limit=4&${category}&sortBy${sortBy}&order=${order}${search}`
    // ) // по убыванию сортировать
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr); //возвращает новые пиццы
    //     setIsLoading(false); //после загрузки запрос завершился
    //   });

    //бизнес логика запрос на бэкенд обработка параметров

    // const {data} = await axios.get(
    // await дождись выполнения запроса axios.get()он внутри будет хранить промис
    //   `https://62b41f5aa36f3a973d2c669d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // );

    
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    ); 
    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер будет отвечать запарсинг параметров связаных с фильтрацией пицц и вшивание их в адресную строку
 React.useEffect(() => {
    if (isMounted.current) {
      //если был 1 рендер  если это будет true то делай нижнюю информацию
      const queryString = qs.stringify({
        // если пришли параметры превращаю их в одну строчку
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксепроверяю есть в url эти параметры
  useEffect(() => {
    if (window.location.search) {
      // если window.location.search есть то буду парсить из парпаметров и превращать в объект
      const params = qs.parse(window.location.search.substring(1)); // передавать ? нельзя для этого пишу substring(1))
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      ); // необходимо пробежаться по каждому сво-тву и найти в объекте sortProperty то что есть в params.sortProperty

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true; // до того как вып-ся нижний useEffect заранее проверяем нужно ли поиск
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    //если сейчас нет поиска то делаю  fetchPizzas() запрос
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]); //массив зависимости следит если изменения иди в бэкенд и делается запрос на получение новых пицц



  const pizzas = items.map((obj) => (
    <PizzaBlock
      key={obj.id}
      title={obj.title}
      price={obj.price}
      image={obj.imageUrl}
      sizes={obj.sizes}
      types={obj.types}
    /> 
  ));
  // массив объектов переобразую в массив пицц

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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению,не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

// {...obj}/>) */
