// Importing necessary modules
import React, { useState, useEffect, createContext } from 'react';

// Creating a new context
const ThemeContext = createContext();

// Creating a ThemeProvider component
function ThemeProvider({ children }) {
  // Setting the initial state of the theme to 'light'
  const [theme, setTheme] = useState('light');

  // Changing the stylesheet link based on the selected theme
  useEffect(() => {
    // Getting the stylesheet link element
    var linkElement = document.getElementById('mdb-stylesheet');

    // If the theme is 'light', set the stylesheet link to './mdb.min.css'
    if (theme === 'light') {
      linkElement.href = "./mdb.min.css";
    } 
    // If the theme is 'dark', set the stylesheet link to './mdb.dark.min.css'
    if (theme === 'dark') {
      linkElement.href = "./mdb.dark.min.css";
    }

  }, [theme]);

  // Setting the theme based on the saved cookie
  useEffect(() => {
    try{
      // Getting the saved theme from the cookie
      const savedTheme = document.cookie.split('; ').find(row => row.startsWith('theme=')).split('=')[1];
      // If the saved theme exists, set the theme to the saved theme
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (err) {
    }
    
  }, []);

  // Updating the theme and saving it to the cookie
  function updateTheme(th) {
    setTheme(th);
    document.cookie = `theme=${th}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  }

  // Returning the ThemeContext.Provider with the theme and updateTheme function as values
  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Exporting the ThemeProvider and ThemeContext
export { ThemeProvider, ThemeContext };
