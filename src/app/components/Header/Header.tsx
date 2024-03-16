import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import React from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function BoxBasic() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar component="section" position="static" color="primary">
        <Toolbar>
          <a href="https://docs.metamask.io/">
            <img src="metamask-logo.svg" alt="Metamask-logo" width="400" height="400" />
          </a>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
