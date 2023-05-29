import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"

// pages and components
import Authenticate from "./pages/Authenticate";
import Home from "./pages/Home";
import NavBar from "./components/NavBar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div >
          <NavBar /> 
          <Routes>
            <Route path="/" element={<Authenticate />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
