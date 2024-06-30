import Categories from "./components/Categories.jsx";
import Header from "./components/Header.jsx";
import Card from "./pages/Card.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./scss/app.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />{" "}
            {/*  '/'корневая страница  приложения */}
            <Route path="/card" element={<Card />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
