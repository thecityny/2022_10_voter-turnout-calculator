import React from 'react';
import { Grommet, Heading } from 'grommet';

import "./styles/app.scss"

const theme = {
  global: {
    colors: {
      blue: '#0C71FA',
      orange: '#FA7416',
      purple: '#A9328A',
      green: '#36C269',
      yellow: '#FCC32C',
    },
    font: {
      family: 'Sharp Grotesk',
      size: '22px',
      height: '22px',
    },
  },
};

const App = () => {
  return (
    <Grommet theme={theme}>
      <header className="App-header">
        <Heading level={1} color="purple"> My app </ Heading>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Grommet>
  );
}

export default App;
