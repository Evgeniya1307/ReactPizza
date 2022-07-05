import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Header from "./components/Header";
import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound";




export const SearchContext = createContext();//создала контекст


 function App() {
  const [searchValue,setSearchValue]=useState("")//стейт который хранит поле поиска

  return (
    <div className="wrapper">
    <SearchContext.Provider value={{searchValue,setSearchValue}}>
    <Header /> 
    <div className="content">
   
      <Routes>
          {/*логика react route */}
          <Route path="/" element={<Home />} />
          {/*если указан "/" то рендери Home*/}
          <Route path="/cart" element={<Cart />} /> {/* */}
          <Route path="*" element={<NotFound />} />
          {/* "*"это значит если один из этих роутеров не подойдёт то это последний что подошло  NotFound/>*/}
        </Routes>
      </div>
      </SearchContext.Provider>
       
      </div>
   
  );
}

export default App;

// з //можно так а можно и если увереная что будут точно такие объекты по корече {...obj}/>)
