import React from "react";
import LogoSvg from "../assets/img/pizza-logo.svg";
import {Link, useLocation}from "react-router-dom";
import Search from "./Search";
import {useSelector} from "react-redux"
import { selectCart } from "../redux/slices/cartSlice";


function Header() {
const {items,totalPrice}=useSelector(selectCart) // передала название фу-ию которую соз-ла в cartslice
const location = useLocation();
const isMounted = React.useRef(false);
const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);// беру все объект коунта и сумирую их

React.useEffect(() => {
  if (isMounted.current) {
    const json = JSON.stringify(items);
    localStorage.setItem('cart', json);
  }
  isMounted.current = true;
}, [items]);


  return (
    <div className="header">
      <div className="container">
        <Link to='/'>
        <div className="header__logo">
          <img width="38" src={LogoSvg} alt="Pizza logo" />
          <div>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
        </Link>
        {location.pathname !== "/cart" && <Search />}
         <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice}</span>
            <div className="button__delimiter"></div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Header;