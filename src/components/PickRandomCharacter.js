import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { getRandomCharacterId } from '../utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    padding: 6px;
  }

  .fas {
    margin-right: 6px;
  }
`;

const PickRandomCharacter = () => {
  const history = useHistory();

  const handleClick = React.useCallback(() => {
    history.push(`/?id=${getRandomCharacterId()}`);
  }, [history]);

  return (
    <Wrapper>
      <button type="button" onClick={handleClick}>
        <i className="fas fa-random"></i>
        Pick random
      </button>
    </Wrapper>
  );
};

export default PickRandomCharacter;
