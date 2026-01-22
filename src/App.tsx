import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home"; 
import DrinkDetail from "./pages/DrinkDetail";
import IngredientDetail from "./pages/IngredientDetail";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drink/:id" element={<DrinkDetail />} />
        <Route path="/ingredient/:name" element={<IngredientDetail />} />
      </Routes>
    </>
  )
}

export default App
