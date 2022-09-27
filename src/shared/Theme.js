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
      darBackgroundOpaque: 'rgba(33, 33, 33, 80%)',
    },
    typography: {
      "fontFamily": 'Poppins',
    },
  }
  
  const theme = createTheme(themeConfig);
  
  export function ThemeProvider({ children }) {
    return (
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    );
  }