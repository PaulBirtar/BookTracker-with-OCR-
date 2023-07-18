import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./Components/Main";
import Navbar from "./Components/Navbar";
import MyBooks from "./Components/MyBooks";
import Home from "./Components/Home";
import "./Components/style.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Main />} />
        <Route path="/my-books" element={<MyBooks />} />
      </Routes>
    </>
  );
}

export default App;
