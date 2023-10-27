import { createTheme } from '@mui/material/styles';
// #cddddd
// #8d86c9nice purple
// #cacfcd nice background grey
// #cef7a0 grass green color
// #cdeded nice background light blue
// #EFFFC8 nice beige yellow

const AppTheme = createTheme({
  palette: {
    primary: {
      main: '#2f1a4a', // Dark purple
    },
    secondary: {
      main: '#cacfcd', // light purple
    },
    background: {
      default: '#23282D', // grey background
      paper: '#8d86c9', // light purple papers
      secondary: '#ffffff', // A light gray background for other elements
    },
  },
});

export default AppTheme;
