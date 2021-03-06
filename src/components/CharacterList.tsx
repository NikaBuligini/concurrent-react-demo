import { useRef, VFC } from 'react';
import styled from 'styled-components';
import { lighten, darken } from 'polished';
import classnames from 'classnames';
import { useDidUpdate } from 'react-nb-hooks';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import characters from '../characters.json';
import { useCharacterId, useStore } from '../store';

const Wrapper = styled.div`
  grid-area: characters;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  overflow-y: auto;
  transition: 0.5s;

  .character-list {
    ::-webkit-scrollbar {
      width: 0.4rem;
    }

    ::-webkit-scrollbar-track {
      -webkit-box-shadow: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }

  .character {
    text-align: center;
    color: var(--primary-color);
    outline: 0;

    &.active {
      color: var(--accent-color);
      background-color: ${lighten(0.03, '#282c34')};
    }
  }

  :hover {
    background: ${lighten(0.03, '#282c34')};
    box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
      rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;

    .character-list {
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px var(--background-color);
      }

      ::-webkit-scrollbar-thumb {
        background-color: ${darken(0.2, '#09d3ac')};
        outline: 1px solid slategrey;
      }
    }

    .character.active {
      background-color: var(--background-color);
    }
  }
`;

const Row: VFC<ListChildComponentProps<typeof characters>> = ({ index, style, data }) => {
  const { id: selectedId, goTo } = useStore();

  const [id, name] = data[index] as [number, string];

  return (
    <button
      className={classnames('character', { active: selectedId === id })}
      onClick={(event) => {
        event.preventDefault();
        goTo(id)
      }}
      style={style}
    >
      {name}
    </button>
  )
};

export const CharacterList: VFC = () => {
  const listRef = useRef<List<typeof characters>>(null);

  const selectedId = useCharacterId();

  useDidUpdate(() => {
    if (listRef.current && selectedId) {
      listRef.current.scrollToItem(selectedId, 'center');
    }
  }, [selectedId]);

  return (
    <Wrapper className="character-list-wrapper">
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={elem => {
              if (elem && listRef.current === undefined && selectedId) {
                elem.scrollToItem(selectedId, 'center');
              }
              // @ts-ignore
              listRef.current = elem;
            }}
            className="character-list"
            height={height}
            width={width}
            itemCount={characters.length}
            itemSize={24}
            itemData={characters}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </Wrapper>
  );
};
