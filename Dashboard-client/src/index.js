import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Retrieves the list of items from the Express app
fetch('/api/getList')
  .then(res => res.json())
  .then(list => console.log(list))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />

  </React.StrictMode>
);

