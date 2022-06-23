
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import  Pizza from  './assets/Pizza.json';


function App() {
  return (
    <div className="wrapper">
    <Header/>
    <div className='content'>
      <div className="container">
        <div className="content__top">
    <Categories/>
    <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div  className="content__items">
        {
          Pizza.map((obj)=>(
          <PizzaBlock  key={obj.id}
            title={obj.title} 
             price={obj.price} 
             image={obj.imageUrl}
             sizes={obj.sizes}
             types={obj.types}/> //можно так а можно и если увереная что будут точно такие объекты по корече {...obj}/>)
        
  ))}
       
</div>
</div>   </div>
        </div>
  )
}
  


export default App;
