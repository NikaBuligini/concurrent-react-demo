import { Suspense, VFC, FC } from "react";

import { LoadingIndicator } from "./components/LoadingIndicator";
import CharacterCard from "./components/CharacterCard";
import { Arrow, Direction } from "./components/Arrow";
import { PickRandomCharacter } from "./components/PickRandomCharacter";
import { createAsset } from "./createAsset";
import { callApi } from "./utils";
import { Img } from "./Img";
import { getNext, useCharacterId } from "./store";
import { CharacterDto } from "./types";

const characterAsset = createAsset<CharacterDto, [number]>((id) =>
  callApi(`character/${id}`)
);

type Props = {
  id: number;
};

const Character: FC<Props> = ({ id }) => {
  characterAsset.preload(getNext(id));
  // characterAsset.preload(getPrev(id));

  const character = characterAsset.read(id);

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
