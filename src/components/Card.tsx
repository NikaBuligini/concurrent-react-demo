import { FC, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

const config = { mass: 1, tension: 350, friction: 35 };

const dampen = 10;

function calc(x: number, y: number, container: HTMLDivElement) {
  return [
    -(y - container.offsetTop - container.offsetHeight / 2) / dampen,
    (x - container.offsetLeft - container.offsetWidth / 2) / dampen,
  ];
}

type Props = {
  className: string;
}

const Card: FC<Props> = ({ className, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef(null);

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
          if (containerRef.current != null) {
            set({
              xys: calc(clientX, clientY, containerRef.current),
            });
          }
        }}
        onMouseLeave={resetAnimation}
        style={{
          transform: animatedProps.xys.to(
            (x, y) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg)`
          ),
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};

export default Card;
