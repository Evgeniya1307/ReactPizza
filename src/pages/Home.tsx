import React from "react";
import { useSelector } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/filter/filterSlice";
import {Categories, Sort, PizzaBlock, Skeleton, Pagination} from "../components";



import { fetchPizzas } from "../redux/slices/asyncActions";
import { selectPizzaData } from "../redux/slices/selectors";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";

// это динамический импорт - тоесть отдельный chunk С помощью его можно подгрузить отдельно js кусок кода (ленивая подгрузка ) беру бандл и разбиваю его на чанки с помощью код splittingа
//import("../utils/math").then(math => {
//  console.log(math.add(555, 111));
//});

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter); // вытаскиваю свой стейт с помощью этого хука описываю всё что нужно через . мне вытищить
  const { items, status } = useSelector(selectPizzaData); //фун-ия создана в pizzaSlice показывает что меняется в фильтрации

  // const [sortType, setSortType] = React.useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // }); //тут хранится объект в нём есть св-тва sortType пере-ся в комепонент Sort.../>он выта-ся из велью и велью хранит в себе объект и это велью рендарю там где спан и {value.name}   хранится логика сортировки  будет делать изменение сортировки setSortType

  const onChangeCategory = React.useCallback(
    (index: number) => {
      dispatch(setCategoryId(index));
    },
    [dispatch]
  ); // cоздайся при первом рендере как useEffect и больше не пересаздаётся сохрани её в памяти и когда я скажу дай onChangeCategory дай мне ссылку на самый первый рендеринг
  //метод меняеющий категорию

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер будет отвечать запарсинг параметров связаных с фильтрацией пицц и вшивание их в адресную строку
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //если был 1 рендер  если это будет true то делай нижнюю информацию
  //     const queryString = qs.stringify({
  // если пришли параметры превращаю их в одну строчку
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксепроверяю есть в url эти параметры
  // React.useEffect(() => {
  // if (window.location.search) {
  //если window.location.search есть то буду парсить из парпаметров и превращать в объект
  //const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams; // передавать ? нельзя для этого пишу substring(1))
  // const sort = sortList.find((obj) => obj.sortProperty === params.sortBy
  //     ); // необходимо пробежаться по каждому сво-тву и найти в объекте sortProperty то что есть в params.sortProperty

  // dispatch(setFilters({
  //        searchValue: params.search,
  //        categoryId: Number(params.category),
  //        currentPage: Number (params.currentPage),
  // тут сказана если не придёт undefined передай sort иначе передавай по популярности
  //        sort:sort || sortList[0],
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);
  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    //если сейчас нет поиска то делаю  fetchPizzas() запрос
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage, getPizzas]); //массив зависимости следит если изменения иди в бэкенд и делается запрос на получение новых пицц

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  // массив объектов переобразую в массив пицц
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению,не удалось получить питсы. Попробуйте повторить попытку
            позже.
          </p>
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
