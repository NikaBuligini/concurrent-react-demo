import { FC } from 'react';

import { CharacterList } from './components/CharacterList';
import { GlobalStyle } from './GlobalStyle';
import Character from './Character';
import { Footer } from './components/Footer';

export const App: FC = () => (
  <>
    <GlobalStyle />
    <div className="App">
      <CharacterList />
      <Character />
      <Footer />
    </div>
  </>
);
