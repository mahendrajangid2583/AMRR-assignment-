import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewItems from "./pages/ViewItems";
import AddItem from "./pages/AddItem";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route path="/add-item" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;