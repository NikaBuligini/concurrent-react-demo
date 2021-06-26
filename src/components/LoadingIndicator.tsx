import { VFC } from 'react';
import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  svg path,
  svg rect {
    fill: var(--accent-color);
  }
`;

type RectProps = {
  x: number;
  y: number;
}

const Rect: FC<RectProps> = ({ x, y, children }) => (
  <rect x={x} y={y} width="4" height="10" fill="#333" opacity="0.2">
    {children}
  </rect>
);

type AnimateProps = {
  attributeName: string;
  values: string;
  begin: string;
}

const Animate: VFC<AnimateProps> = ({ attributeName, values, begin }) => (
  <animate
    attributeName={attributeName}
    attributeType="XML"
    values={values}
    begin={begin}
    dur="0.6s"
    repeatCount="indefinite"
  />
);

const rects = [
  { x: 0, y: 10, begin: '0s' },
  { x: 8, y: 10, begin: '0.15s' },
  { x: 16, y: 10, begin: '0.3s' },
];

const animations = [
  { name: 'opacity', values: '0.2; 1; .2' },
  { name: 'height', values: '10; 20; 10' },
  { name: 'y', values: '10; 5; 10' },
];

export const LoadingIndicator: VFC = () => (
  <Wrapper>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="24px"
      height="30px"
      viewBox="0 0 24 30"
    >
      {rects.map(({ x, y, begin }, index) => (
        <Rect key={index} x={x} y={y}>
          {animations.map(({ name, values }) => (
            <Animate key={name} attributeName={name} values={values} begin={begin} />
          ))}
        </Rect>
      ))}
    </svg>
  </Wrapper>
);
