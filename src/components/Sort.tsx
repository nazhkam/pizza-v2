import React from "react";
import { SortType } from "../redux/slices/filterSlice";

type SortProps={
  activeSort:SortType
  onChangeSort:(sort:SortType)=>void;
}
type PopupClick=MouseEvent &{
    path:Node[]
  }

export const sorts:SortType[] = [
  { name: "популярности", sort: "rating" },
  { name: "цене", sort: "price" },
  { name: "алфавиту", sort: "title" },
];




const Sort: React.FC<SortProps> = ({ activeSort, onChangeSort }) => {

  const [visible, setVisible] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const _event=event as PopupClick
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setVisible(false);
      }
    };
    document.body.addEventListener("click", handleClick);
    return ()=>{
      document.body.removeEventListener('click', handleClick)
    }
  });

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div className={visible ? "open" : ""}>
          <svg
            width="23"
            height="8"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => setVisible(!visible)}>{activeSort.name}</span>
      </div>
      {visible && (
        <div className="sort__popup">
          <ul>
            {sorts.map((obj, index) => (
              <li
                className={obj.sort === activeSort.sort ? "active" : ""}
                key={index}
                onClick={() => {
                  onChangeSort(obj);
                  setVisible(false);
                }}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
