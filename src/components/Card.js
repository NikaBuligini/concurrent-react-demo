import React from 'react';
import { useSpring, animated } from 'react-spring';

const config = { mass: 1, tension: 350, friction: 35 };

const dampen = 10;

function calc(x, y, container) {
  return [
    -(y - container.offsetTop - container.offsetHeight / 2) / dampen,
    (x - container.offsetLeft - container.offsetWidth / 2) / dampen,
  ];
}

const transform = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg)`;

const Card = ({ className, children }) => {
  const containerRef = React.useRef();
  const cardRef = React.useRef();

  const [animatedProps, set] = useSpring(() => ({
    xys: [0, 0],
    config,
  }));

  function resetAnimation() {
    set({ xys: [0, 0] });
  }

  return (
    <div ref={containerRef}>
      <animated.div
        ref={cardRef}
        className={className}
        onMouseEnter={resetAnimation}
        onMouseMove={({ clientX, clientY }) => {
          set({
            xys: calc(clientX, clientY, containerRef.current),
          });
        }}
        onMouseLeave={resetAnimation}
        style={{
          transform: animatedProps.xys.interpolate(transform),
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};

export default Card;
