import { VFC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: var(--text-dark-color);

  .fas {
    background-color: rgb(70, 70, 88);
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 11px;
    color: var(--text-color);
    margin: 0 5px;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
      rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  }
`;

export const Footer: VFC = () => (
  <Wrapper>
    Use <i className="fas fa-chevron-left" /> or <i className="fas fa-chevron-right" /> key to
    navigate
  </Wrapper>
);
