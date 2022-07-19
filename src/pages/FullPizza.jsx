import React from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
//инфа по пицце

const FullPizza = () => {
    const {id} = useParams();

React.useEffect(() => {
axios.get("https://62b41f5aa36f3a973d2c669d.mockapi.io/items/3")
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