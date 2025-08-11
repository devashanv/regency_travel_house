// components/FireworksEffect.jsx
import { useEffect, useRef } from "react";
import { Fireworks } from "fireworks-js";

const FireWorks = () => {
  const containerRef = useRef(null);
  const fireworksInstance = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && !fireworksInstance.current) {
      fireworksInstance.current = new Fireworks(container, {
        autoresize: false, // prevent full screen
        opacity: 0.8,
        acceleration: 1.02,
        friction: 0.98,
        gravity: 1.5,
        trace: 3,
        explosion: 5,
        intensity: 30,
        boundaries: {
          top: 0,
          bottom: container.clientHeight,
          left: 0,
          right: container.clientWidth,
        },
        sound: {
          enabled: false,
        },
      });

      fireworksInstance.current.start();
    }

    return () => {
      fireworksInstance.current?.stop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

export default FireWorks;
