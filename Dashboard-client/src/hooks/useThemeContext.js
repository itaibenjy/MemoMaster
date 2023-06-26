// Import the useContext hook from the React library
import { useContext } from 'react';

// Import the ThemeContext from the ThemeContext file
import { ThemeContext } from '../context/ThemeContext';

// Define a custom hook called useThemeContext
export function useThemeContext() {

  // Use the useContext hook to get the current ThemeContext
  const context = useContext(ThemeContext);

  // If the context is not defined, throw an error
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  // Return the current ThemeContext
  return context;
}
