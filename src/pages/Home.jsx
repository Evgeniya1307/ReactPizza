import React,{useContext,useState, useEffect} from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Skeleton from "../components/PizzaBlock/Sceleton";
import PizzaBlock from "../components/PizzaBlock";
import Sort, {sortList} from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const navigate = useNavigate(); //дай фу-ию из своего хука
  const dispatch = useDispatch();
  const isSearch=React.useRef(false)// поиска пота нет по умолчанию ничего нет
  const isMounted = React.useRef(false) //пока-ет что первого рендера небыло приложение уже один раз отрисовалось 
 
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  ); // вытаскиваю свой стейт с помощью этого хука описываю всё что нужно через . мне вытищить

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const [sortType, setSortType] = React.useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // }); //тут хранится объект в нём есть св-тва sortType пере-ся в комепонент Sort.../>он выта-ся из велью и велью хранит в себе объект и это велью рендарю там где спан и {value.name}   хранится логика сортировки  будет делать изменение сортировки setSortType

  const onChangeCategory = React.useCallback((idx) => {
    dispatch(setCategoryId(idx));
  }, []);
 //метод меняеющий категорию

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };
 
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPizzas =  () => {
    setIsLoading(true); // перед загрузкой идёт имогу выбирать по филтрации пиццы

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

   
    axios.get(
        `https://62b41f5aa36f3a973d2c669d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
      setItems(res.data); // то что нужно хр-ся в дата там ответ от бэкенда
      setIsLoading(false);
    })
  }
 


// Если изменили параметры и был первый рендер будет отвечать запарсинг параметров связаных с фильтрацией пицц и вшивание их в адресную строку
useEffect(()=>{
  if (isMounted.current) { //если был 1 рендер  если это будет true то делай нижнюю информацию
  const queryString = qs.stringify({ // если пришли параметры превращаю их в одну строчку
    sortProperty: sort.sortProperty,
    categoryId,
    currentPage,
  });

  navigate(`?${queryString}`);
}
isMounted.current = true;
}, [categoryId, sort.sortProperty, currentPage]);


// Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксепроверяю есть в url эти параметры 
useEffect(()=>{
  if (window.location.search) {// если window.location.search есть то буду парсить из парпаметров и превращать в объект 
    const params = qs.parse(window.location.search.substring(1));// передавать ? нельзя для этого пишу substring(1))
    
    const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);// необходимо пробежаться по каждому сво-тву и найти в объекте sortProperty то что есть в params.sortProperty
    
    dispatch(
      setFilters({
        ...params,
        sort,
      }),
    );
    isSearch.current = true; // до того как вып-ся нижний useEffect заранее проверяем нужно ли поиск
  }
}, []);


// Если был первый рендер, то запрашиваем пиццы
useEffect(() => {
  window.scrollTo(0, 0);
  if (!isSearch.current) { //если сейчас нет поиска то делаю  fetchPizzas() запрос
    fetchPizzas();
  }
  isSearch.current = false; // так как ничего нету то false
}, [categoryId, sort.sortProperty, searchValue, currentPage]); //массив зависимости следит если изменения иди в бэкенд и делается запрос на получение новых пицц


 const pizzas = items.map((obj) => <PizzaBlock
    key={obj.id}
    title={obj.title}
    price={obj.price}
    image={obj.imageUrl}
    sizes={obj.sizes}
    types={obj.types}/>
 )
  // массив объектов переобразую в массив пицц

 const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        {/*// в онклик передаю фу-ию  когда ты сработаешь onChangeCategory={(i) то вызови мне  setCategoryId=(i) */}
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;


 // {...obj}/>) */

