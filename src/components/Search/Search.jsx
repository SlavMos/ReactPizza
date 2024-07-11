import React from "react";
import s from "./Search.module.scss";
import { SearchContext } from "../../App";

export const Search = (props) => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  return (
    <div className={s.search}>
      <svg
        className={s.icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
          stroke="#000000"
          width="2"
          linecap="round"
          linejoin="round"
        />
      </svg>
      <input
        value={searchValue} // что бы инпут был отслеживаюший
        onChange={(event) => setSearchValue(event.target.value)} // отслеживаю  event(то что юудет написано в инпут) и передаю в UseState
        className={s.input}
        type="text"
        placeholder="Search..."
      />
      {searchValue && ( // if searchvalue===true ЕСЛИ В SEARCHVALUE ЧТО ТО БУДЕТ НАПИСАНО ТОГДА БУДЕТ ПОКАЗЫВАТЬ ИКОНКА CLEAR
        <svg
          onClick={() => setSearchValue("")} //  при нажатим на иконко она очистивается
          className={s.clear}
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 122.878 122.88"
          background="new 0 0 122.878 122.88"
        >
          <g>
            <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
