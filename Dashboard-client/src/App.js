import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages and components
import Signup from "./pages/Signup";
import Login from "./pages/Login"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
          <Routes>
            <Route 
            path = "/signup"
            element = {<Signup />}
            />
            <Route
            path = "/login"
            element = {<Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
