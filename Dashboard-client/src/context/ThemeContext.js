import React, { useState, useEffect, createContext } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Theme provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  // Update the theme stylesheet when the theme value changes
  useEffect(() => {
    var linkElement = document.getElementById('mdb-stylesheet');

      if (theme === 'light') {
        linkElement.href = "./mdb.min.css";
      } 
      if (theme === 'dark') {
        linkElement.href = "./mdb.dark.min.css";
      }

  }, [theme]);


  useEffect(() => {
    try{
      const savedTheme = document.cookie.split('; ').find(row => row.startsWith('theme=')).split('=')[1];
      console.log(savedTheme)
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (err) {
      console.log(err)
    }
    
  }, []);

  // Update the theme value and save it in cookies
  function updateTheme(th) {
    setTheme(th);
    document.cookie = `theme=${th}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
