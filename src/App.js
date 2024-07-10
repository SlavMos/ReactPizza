import Categories from "./components/Categories.jsx";
import Header from "./components/Header.jsx";
import Card from "./pages/Card.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./scss/app.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  console.log(searchValue, "input changes");

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />{" "}
            {/*  '/'корневая страница  приложения */}
            <Route path="/card" element={<Card />} />
            <Route path="*" element={<NotFound />} />{" "}
            {/* Определяет маршрут для всех остальных несуществующих страниц (*), который отображает компонент NotFound. */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
