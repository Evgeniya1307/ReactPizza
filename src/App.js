import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock/index.jsx";
import React from "react";
import Skeleton from "./components/PizzaBlock/Sceleton";

function App() {
  const [items, setItems] = React.useState([]);
  const[isLoading,setIsLoading]=React.useState(true);// буду понимать что отображать скелитон или реальную пиццу

  React.useEffect(() => {
    fetch("https://62b56641da3017eabb19e0f8.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading 
              ? [...new Array(6)].map(()=><Skeleton/>) 
            : items.map((obj)=> <PizzaBlock key={obj.id}{...obj}/>)} {/*создать массив фейковый из 6 и заменить на скелетон иначе возьми рендери айтемс мап возьми объект и его отрендери*/ } 
       </div>
            </div>
      </div>
    </div>
  );
}

export default App;


// <PizzaBlock
              //   key={obj.id}
              //   title={obj.title}
              //   price={obj.price}
              //   image={obj.imageUrl}
              //   sizes={obj.sizes}
              //   types={obj.types}
              // /> //можно так а можно и если увереная что будут точно такие объекты по корече {...obj}/>)
