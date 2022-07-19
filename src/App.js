import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";





 function App() {
  return (
    <div className="wrapper">
    <Header /> 
    <div className="content">
   
      <Routes>
          {/*логика react route */}
          <Route path="/" element={<Home />} />
          {/*если указан "/" то рендери Home*/}
          <Route path="/cart" element={<Cart />} /> {/* */}
<Route path="/pizza/:id" element = {<FullPizza/>}/>  
  <Route path="*" element={<NotFound />} />
          {/* "*"это значит если один из этих роутеров не подойдёт то это последний что подошло  NotFound/>*/}
        </Routes>
      </div>   
      </div>
   
  );
}

export default App;

// з //можно так а можно и если увереная что будут точно такие объекты по корече {...obj}/>)
