import React from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
//инфа по пицце

const FullPizza = () => {
    const [pizza, setPizza]=React.useState();
    const {id} = useParams();

    React.useEffect(() => {
async function fetchPizza(){
    try{
    const {data} = await axios.get("https://62b41f5aa36f3a973d2c669d.mockapi.io/items/"+id)
setPizza(pizza);
}catch(error){
    alert("ошибка при получении пиццы")
}
}
fetchPizza();

},[])

  return (
    <div className='container'>
    <img src=""/>
 <h2>
 {id}
 </h2>
 <p>
 lorem ipsum dolor sit amet, consectetur adip
</p>
<h4>250 ₽</h4>
    </div>
  )
}

export default FullPizza