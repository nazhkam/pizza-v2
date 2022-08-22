import React from "react";
const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

type CategoriesProps={
  activeCategory:number;
  onChangeCategory:( id:number )=>void;
}

const Categories: React.FC<CategoriesProps> = ({ activeCategory, onChangeCategory }) => { 
  return (
    <div className="categories">
      <ul>
        {categories.map((item, id) => (
          <li
            key={id}
            className={activeCategory === id ? "active" : ""}
            onClick={() => onChangeCategory(id)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
