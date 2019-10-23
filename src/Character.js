import React from 'react';

import LoadingIndicator from './components/LoadingIndicator';
import CharacterCard from './components/CharacterCard';
import Arrow from './components/Arrow';
import PickRandomCharacter from './components/PickRandomCharacter';
import createResource from './createResource';
import { callApi, useCharacterId, character } from './utils';
import Img from './Img';

const characterCache = createResource(id => callApi(`character/${id}`));

function preload(id) {
  const c = character(id);

  characterCache.preload(c.next());
  // characterCache.preload(c.prev());
}

const Character = ({ id }) => {
  preload(id);

  const character = characterCache.read(id);

  return <CharacterCard data={character} imgComponent={Img} />;
};

const CharacterContainer = () => {
  const characterId = useCharacterId();

  if (!characterId) {
    return <PickRandomCharacter />;
  }

  return (
    <div className="character-container">
      <Arrow direction="left" />
      <div className="character-content">
        <React.Suspense fallback={<LoadingIndicator />}>
          <Character id={characterId} imgComponent={Img} />
        </React.Suspense>
      </div>
      <Arrow direction="right" />
    </div>
  );
};

export default CharacterContainer;
