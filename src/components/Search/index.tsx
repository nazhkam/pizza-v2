import React from "react";
import styles from "./Styles.module.scss";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";


const Search:React.FC =()=>{
  const dispatch=useDispatch();
  const [value,setValue]=React.useState('')

  const onChangeInput=(text:string)=>{
    updateSearchValue(text)
    setValue(text)
  }
  const updateSearchValue = React.useCallback(
    debounce((str:string) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  return (
    <input
      className={styles.root}
      type="text"
      placeholder="Поиск..."
      value={value}
      onChange={(event)=>onChangeInput(event.target.value)}
    />
  );
}

export default Search;
