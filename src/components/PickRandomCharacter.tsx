import { VFC } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRandom } from '@fortawesome/free-solid-svg-icons'

import { useStore } from '../store';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    padding: 6px;
  }

  .icon {
    margin-right: 6px;
  }
`;

export const PickRandomCharacter: VFC = () => {
  const { pickRandom } = useStore();

  return (
    <Wrapper>
      <button
        type="button"
        onClick={() => void pickRandom()}
      >
        <span className="icon">
          <FontAwesomeIcon icon={faRandom} />
        </span>
        Pick random
      </button>
    </Wrapper>
  );
};
