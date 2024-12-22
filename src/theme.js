const lightTheme = {
    colors: {
      primary: '#f5f5f5', // Light background for the page
      secondary: 'gold', // Green for secondary color (buttons, links, etc.)
      background: '#5F9EA0', // blue background for content
      text: '#fff', // Dark text for readability
      border: '#e0e0e0', // Light borders for UI elements
    },
    spacing: (factor) => `${factor * 8}px`, // Spacing unit
  };
  
  const darkTheme = {
    colors: {
      primary: '#fff', // Dark background for dark mode
      secondary: '#BB86FC', // Purple accent for secondary (buttons, links, etc.)
      background: '#041E42', // Dark background for content
      text: '#fff', // Light text for dark mode
      border: '#333333', // Dark borders for UI elements
    },
    spacing: (factor) => `${factor * 8}px`, // Spacing unit
  };
  
  export { lightTheme, darkTheme };
  