import React from "react";
import { GrClose } from "react-icons/gr";
import styles from "./search.module.scss";
import { setSearchValue } from "../../redux/filter/filterSlice";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>(""); // отвечает за быстрое отображение из инпута данных

  //будет хра-ся ссылка на дом элементов моего интпута
  const inputRef = React.useRef<HTMLInputElement>(null); // reactjs возьми свою логику сохрани в переменной inputRef

  const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => { // событие клика
    dispatch(setSearchValue(""));
    setValue(""); //очистка локально
   
    //предотвратить вызов какой то функции или вытаскивания данных
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }
    //с помощью оператора (?) опциональной последовательности
    inputRef.current?.focus();
  };
  //когда вожу в поиск и на крестик срабатывает правильный способ к обращению дом элемента к сылкам через use ref

  const updateSearchValue = React.useCallback(
    //сох-ла ссылку на функцию чтобы каждый раз не было перерисовки
    debounce((str: string) => {
      dispatch(setSearchValue(str)); // из контекста сд-ть обновления то что есть в app
    }, 150), //сделала её отложенной
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => { // есть value и он яв-ся строчкой. ChangeEvent-изменение инпута
    //буду верхнюю фун-ию выз-ть когда будет ме-ся инпут
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 32 32"
        id="Filled_Line"
        version="1.1"
        viewBox="0 0 32 32"
      >
        <circle cx="14" cy="14" fill="#F9ED69" id="XMLID_904_" r="9" />
        <path
          d="M16,22c-4.971,0-9-4.029-9-9c0-3.111,1.578-5.852,3.977-7.469C7.496,6.774,5,10.091,5,14  c0,4.971,4.029,9,9,9c1.86,0,3.588-0.565,5.023-1.531C18.077,21.806,17.062,22,16,22z"
          fill="#BBB24F"
          id="XMLID_410_"
        />
        <path
          d="M14,5c-2.996,0-5.643,1.47-7.279,3.721C8.205,7.643,10.025,7,12,7c4.971,0,9,4.029,9,9  c0,1.975-0.643,3.795-1.721,5.279C21.53,19.643,23,16.996,23,14C23,9.029,18.971,5,14,5z"
          fill="#FBF4A5"
          id="XMLID_411_"
        />
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_899_"
          r="9"
          stroke="#200F60"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="  M15.996,8.341c1.702,0.602,3.054,1.952,3.659,3.653"
          fill="none"
          id="XMLID_417_"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_898_"
          stroke="#200F60"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && <GrClose onClick={onClickClear} className={styles.clearIcon} />}
    </div>
  );
};
export default Search;
