import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";


function App() {
  return (
    <Routes>
      {/*логика react route */}
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        {/*если указан "" то рендери главная страницаHome*/}
        <Route path="cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
        {/* "*"это значит если один из этих роутеров не подойдёт то это последний что подошло  NotFound/>*/}
      </Route>
    </Routes>
  );
}

export default App;

// з //можно так а можно и если увереная что будут точно такие объекты по корече {...obj}/>)
