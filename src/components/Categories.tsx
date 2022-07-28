import React from "react";

//отдельный тип для пропсов наши пропсы сод-с внутри объекта
type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void; // void -моя фу-ия не требует возвращения какого то значения
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    //value -активный индекс храню в велью а onСhangeCategory меняет стейт, react.memo гарантирует если пропсы не прменялись перерерисовку не делаю
    return (
      <div className="categories">
        <ul>
          {categories.map(
            (
              categoryName,
              i //value это у меня число я его српвниваю с i а i это число
            ) => (
              <li
                key={i}
                onClick={() => onChangeCategory(i)}
                className={value === i ? "active" : ""}
              >
                {categoryName}
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
);

export default Categories;

//если я рендерю список и если он статичный т,е не мен-ся то могу в key передавать индекс key={i}
