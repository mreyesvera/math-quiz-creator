import {
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
    createTheme,
  } from "@mui/material";
  import { colors } from "../colors";
  
  const themeConfig = {
    palette: {
      primary: colors.blue,
      secondary: colors.indigo,
      darkBackground: colors.grey[900],
      darBackgroundOpaque: 'rgba(33, 33, 33, 100%)',
      existingQuiz: '#f7c965',
      nonExistantElement: '#559194',
    },
    typography: {
      "fontFamily": 'Poppins',
    },
  }
  
  const theme = createTheme(themeConfig);
  
  /**
   * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
   * certify that this material is my original work. 
   * No other person's work has been used without due acknowledgement 
   * and I have not made my work available to anyone else.
   * 
   * Wraps the passed in children with the modified MUI Theme Provider.
   * MUI Theme defaults are used, with some modifications seen above. 
   * 
   * @param {Object} param0 
   *    - children: React component to display inside the wrapper
   * @returns {React.ReactElement} Theme Provider
   */
  export function ThemeProvider({ children }) {
    return (
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    );
  }