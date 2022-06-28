

function Categories({value, onChangeCategory}) { //value -активный индекс храню в велью а onClickCategory
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)} 
            className={value === i ? "active" : ""}>
{categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

//если я рендерю список и если он статичный т,е не мен-ся то могу в key передавать индекс key={i}
