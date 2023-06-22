import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"

// pages and components
import Authenticate from "./pages/Authenticate";
import Home from "./pages/Home";
import NavBar from "./components/NavBar"


// intercepting fetch requests to add the server url and to remove the token if it is expired
const originalFetch = window.fetch;
window.fetch =async function (resource, init) {
  const serverUrl = "https://memo-master-server-7c0b3fe9dbce.herokuapp.com/";
  arguments[0] = `${serverUrl}${resource}`;
  const response = await originalFetch.apply(this, arguments);
  console.log(response.status)
  if (response.status === 401 ) {
    localStorage.removeItem("user")
    window.location.href = "/";
  }

  return response;
};



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
