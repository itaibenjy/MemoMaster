import React from 'react';
import ReactDOM from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthContextProvider } from "./context/AuthContext"
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';

const originalFetch = window.fetch;
window.fetch = function (resource, init) {
  const serverUrl = "https://memo-master-server-7c0b3fe9dbce.herokuapp.com";
  arguments[0] = `${serverUrl}${resource}`;
  return originalFetch.apply(this, arguments);
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

