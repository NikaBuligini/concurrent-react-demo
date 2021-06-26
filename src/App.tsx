import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CharacterList } from './components/CharacterList';
import { GlobalStyle } from './GlobalStyle';
import Character from './Character';
import { Footer } from './components/Footer';

export const App: FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <div className="App">
      <CharacterList />
      <Character />
      <Footer />
    </div>
  </BrowserRouter>
);
