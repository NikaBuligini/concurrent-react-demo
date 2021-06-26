import { VFC } from 'react';
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

export const PickRandomCharacter: VFC = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <button
        type="button"
        onClick={() => {
          history.push(`/?id=${getRandomCharacterId()}`);
        }
      }>
        <i className="fas fa-random"></i>
        Pick random
      </button>
    </Wrapper>
  );
};
