import { FC, VFC } from "react";
import styled from "styled-components";
import { useKeyPress } from "react-nb-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { useStore } from "../store";

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
  [Direction.Left]: "37",
  [Direction.Right]: "39",
};

const ICONS = {
  [Direction.Left]: <FontAwesomeIcon icon={faChevronLeft} />,
  [Direction.Right]: <FontAwesomeIcon icon={faChevronRight} />,
};

type KeyboardBoundButtonProps = {
  targetKey: string;
  onClick: () => void;
};

const KeyboardBoundButton: FC<KeyboardBoundButtonProps> = ({
  targetKey,
  onClick,
  children,
}) => {
  useKeyPress(targetKey, onClick);

  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};

type Props = {
  direction: Direction;
};

export const Arrow: VFC<Props> = ({ direction }) => {
  const { id, next, prev } = useStore();

  const handleClick = () => {
    switch (direction) {
      case Direction.Left: {
        prev();
        break;
      }
      case Direction.Right: {
        next();
        break;
      }
    }
  };

  if (id == null) {
    return null;
  }

  return (
    <Wrapper>
      <KeyboardBoundButton targetKey={KEYS[direction]} onClick={handleClick}>
        {ICONS[direction]}
      </KeyboardBoundButton>
    </Wrapper>
  );
};
