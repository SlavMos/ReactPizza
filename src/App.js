import Header from "./components/Header.jsx";
import Card from "./pages/Card.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./scss/app.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/slices/filterSlice.js";
export const SearchContext = React.createContext(); // для того что бы не использовать props drilling

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="wrapper">
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home value={{ searchValue, setSearchValue }} />}
              />{" "}
              {/*  '/'корневая страница  приложения */}
              <Route path="/card" element={<Card />} />
              <Route path="*" element={<NotFound />} />{" "}
              {/* Определяет маршрут для всех остальных несуществующих страниц (*), который отображает компонент NotFound. */}
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
