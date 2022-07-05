import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {useEffect, useRef} from "react";
import {setSort} from "../redux/slices/filterSlice.jsx"

  //для списка по популрности
  export const sortList = [
    { name: "популярности(DESC)", sortProperty: "rating" }, // убывание от большему к меньшему
    { name: "популярности(ASC)", sortProperty: "-rating" }, //-возрастанию от меньшему к большему
    { name: "цене(DESC)", sortProperty: "price" },
    { name: "цене(ASC)", sortProperty: "-price" },
    { name: "алфавиту(DESC)", sort: "title" },
    { name: "алфавиту(ASC)", sort: "-title" }
  ];




export const  Sort=()=> {
  const dispatch= useDispatch();// будет передвать в редакс действие
 const sort = useSelector((state)=>state.filter.sort)//стейт из редюсера фильт вытащи свойство стор
 const sortRef = useRef();// ссылка на домэлемент
 const [open, setOpen] = React.useState(false); // переключатель


  const onClickListItem = (obj) => {
   dispatch(setSort(obj))// вернёт объект
    // onChangeSort(i); // когда выберешь какой то сорт
    setOpen(false); // и скройся
  };

  useEffect(() => {
    const handleClickOutside = (event) => {  // храню ссылку внутри этой переменной
      if (!event.path.includes(sortRef.current)) { // если в эвенте пас не было клика на наш сорт то скрываем окошко  
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside); //  document.body.addEventListener("click", делает клик то передай ниже фу-ию
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort"> 
      <div className="sort__label">
        {/*сортировка по*/}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
        {/*когда буду кликать будет скрываться или показываться*/}
      </div>
      {open && ( // будет показываться
      <div className="sort__popup">
          {/*по цене популярности алфавиту*/}
          <ul>
          {sortList.map((obj, i) => (
            <li
              key={i}
              onClick={() => {
                onClickListItem(obj);
              }}
                  className={
                    sort.sortProperty === obj.sortProperty ? "active" : ""
                  }
                >
                  {/*проверяю то что у родителя хранится в home сравниваю с тем что рендарю */}
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;

//&& если правая сторона true иди ко второй и верни
//5&&6 вернёт 6 //0&&3 вернёт 0
