import { FC, useCallback, VFC } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useKeyPress } from 'react-nb-hooks';

import { useCharacterId, character } from '../utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;

  button {
    padding: 6px;
    color: var(--primary-color);
  }
`;

export enum Direction {
  Left = "left",
  Right = "right",
}

const KEYS = {
  [Direction.Left]: '37',
  [Direction.Right]: '39',
};

function getSiblingCharacterId(id: number, direction: Direction) {
  const c = character(id);

  if (direction === 'left') {
    return c.prev();
  }

  return c.next();
}

type KeyboardBoundButtonProps = {
  targetKey: string;
  onClick: () => void;
}

const KeyboardBoundButton: FC<KeyboardBoundButtonProps> = ({ targetKey, onClick, children }) => {
  useKeyPress(targetKey, onClick);

  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};

type Props = {
  direction: Direction;
}

export const Arrow: VFC<Props> = ({ direction }) => {
  const characterId = useCharacterId();

  const history = useHistory();

  const handleClick = useCallback(() => {
    if (characterId == null) {
      return;
    }
    
    const nextCharacterId = getSiblingCharacterId(characterId, direction);
    history.push(`/?id=${nextCharacterId}`);
  }, [characterId, direction, history]);

  if (!characterId) {
    return null;
  }

  return (
    <Wrapper>
      <KeyboardBoundButton targetKey={KEYS[direction]} onClick={handleClick}>
        <i className={classnames('fas', `fa-chevron-${direction}`)} />
      </KeyboardBoundButton>
    </Wrapper>
  );
};
