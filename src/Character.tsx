import { Suspense, VFC, FC } from 'react';

import { LoadingIndicator } from './components/LoadingIndicator';
import CharacterCard from './components/CharacterCard';
import { Arrow, Direction } from './components/Arrow';
import { PickRandomCharacter } from './components/PickRandomCharacter';
import createResource from './createResource';
import { callApi, useCharacterId, character } from './utils';
import { Img } from './Img';

const characterCache = createResource((id) => callApi(`character/${id}`));

function preload(id: number) {
  const c = character(id);

  characterCache.preload(c.next());
  // characterCache.preload(c.prev());
}

type Props = {
  id: number;
}

const Character: FC<Props> = ({ id }) => {
  preload(id);

  const character = characterCache.read(id);

  return <CharacterCard data={character} imgComponent={Img} />;
};

const CharacterContainer: VFC = () => {
  const characterId = useCharacterId();

  if (!characterId) {
    return <PickRandomCharacter />;
  }

  return (
    <div className="character-container">
      <Arrow direction={Direction.Left} />
      <div className="character-content">
        <Suspense fallback={<LoadingIndicator />}>
          <Character id={characterId} />
        </Suspense>
      </div>
      <Arrow direction={Direction.Right} />
    </div>
  );
};

export default CharacterContainer;
