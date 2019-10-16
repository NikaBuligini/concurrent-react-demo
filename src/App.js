import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import CharacterList from './components/CharacterList';
import GlobalStyle from './GlobalStyle';
import Character from './Character';
import Footer from './components/Footer';

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <div className="App">
      <CharacterList />
      <Character />
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
