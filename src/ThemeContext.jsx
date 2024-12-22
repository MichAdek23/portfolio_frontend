import React, { createContext, useContext, useState, } from 'react';
import { lightTheme, darkTheme } from './theme';
import { ThemeProvider } from 'styled-components';

// Create the context
const ThemeContext = createContext();

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component that wraps the app
export const ThemeContextProvider = ({ children }) => {
  // Get the saved theme from localStorage, default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(savedTheme === 'light' ? lightTheme : darkTheme);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme === lightTheme ? 'light' : 'dark'); // Save theme to localStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
