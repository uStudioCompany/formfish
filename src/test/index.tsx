import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'ustudio-ui/theme';
import App from './App';

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.querySelector('.app-root')
);
