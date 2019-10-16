import React from 'react';
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

const KEYS = {
  left: '37',
  right: '39',
};

function getSiblingCharacterId(id, direction) {
  const c = character(id);

  if (direction === 'left') {
    return c.prev();
  }

  return c.next();
}

const Arrow = ({ direction }) => {
  const characterId = useCharacterId();

  const history = useHistory();

  const handleClick = React.useCallback(() => {
    const nextCharacterId = getSiblingCharacterId(characterId, direction);
    history.push(`/?id=${nextCharacterId}`);
  }, [characterId, direction, history]);

  useKeyPress(KEYS[direction], handleClick, [handleClick]);

  if (!characterId) {
    return null;
  }

  return (
    <Wrapper>
      <button type="button" onClick={handleClick}>
        <i className={classnames('fas', `fa-chevron-${direction}`)} />
      </button>
    </Wrapper>
  );
};

export default Arrow;
