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