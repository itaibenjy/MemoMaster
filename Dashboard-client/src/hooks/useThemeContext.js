// Import the useContext hook from React
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

// Custom hook for accessing the theme context
export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
