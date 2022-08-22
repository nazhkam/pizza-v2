import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { sorts } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilter,
  setActiveCategory,
  setActiveSort,
  setFilters,
  SortType,
} from "../redux/slices/filterSlice";

const Home: React.FC=()=>  {
  const { activeCategory, activeSort,searchValue } = useSelector(selectFilter);
  const { items, isLoading } = useSelector(selectPizzas);

  const pizzas = items;
  const firstRender = React.useRef(true);
  const isSearch = React.useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getPizzas = async () => {
    const category =
      activeCategory && activeCategory > 0 ? `category=${activeCategory}&` : "";
    const sort = `sortBy=${activeSort.sort}`;
    const search = searchValue ? `&search=${searchValue}` : "";
    dispatch(
      //@ts-ignore
      fetchPizzas({
        category,
        sort,
        search,
      })
    );
  };
  //типо что то поменяд
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const category=Number(params.category)
      const sortBy = sorts.find((obj) => obj.sort === params.sortBy);
      sortBy && dispatch(setFilters({ category, sortBy }));
      isSearch.current = true;
    
    }// eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false; // eslint-disable-next-line
  }, [activeCategory, activeSort, searchValue]);


  React.useEffect(() => {
    if (!firstRender.current) {
      const queryString = qs.stringify({
        sortBy: activeSort.sort,
        category: activeCategory,
      });
      navigate(`?${queryString}`);
    }
    firstRender.current = false; // eslint-disable-next-line
  }, [activeCategory, activeSort, searchValue]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzasArray = pizzas.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={(category:number) => dispatch(setActiveCategory(category))}
        />
        <Sort
          activeSort={activeSort}
          onChangeSort={(sort:SortType) => dispatch(setActiveSort(sort))}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items gridforpizzas">
        {isLoading ? skeletons : pizzasArray}
      </div>
    </>
  );
}

export default Home;
function FetchPizzasParams(arg0: { category: string; sort: string; search: string; }): any {
  throw new Error("Function not implemented.");
}

