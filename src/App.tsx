import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import React, {Suspense} from "react";

// подгрузка Cart только усли это необходимо ленивая загрузка
const Cart =React.lazy(()=>import('./pages/Cart'))//динамически возьмёт Cart его подгрузит тогда когда необходимо когда этот компонент отрендерится
const FullPizza = React.lazy(() => import(/* webpackChunkName:'FullPizza' */"./pages/FullPizza"));
const NotFound = React.lazy(() => import(/* webpackChunkName:'NotFound' */"./pages/NotFound"));

function App() {
  return (
    <Routes>
      {/*логика react route */}
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}> 
              <Cart /> 
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идёт загрузка страницы...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

// з //можно так а можно и если увереная что будут точно такие объекты по корече {...obj}/>)
 // если указан "" то рендери главная страницаHome