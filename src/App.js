import React from 'react';

import Routes from '../src/routes/index';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#c42729' },
  },
}, ptBR);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
