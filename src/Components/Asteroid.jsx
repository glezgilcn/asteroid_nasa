import { useState, useEffect } from "react";
import { AsteroidInfo } from "./AsteroidInfo";

export function Asteroid({ asteroid, index }) {
  const [isOnAsteroid, setIsOnAsteroid] = useState(false);
  const [leftPosition, setLeftPosition] = useState(-1);

  useEffect(() => {
    setLeftPosition(Math.floor(Math.random() * window.innerWidth));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index % 2 === 0) {
        setLeftPosition(
          leftPosition + 1 < window.innerWidth ? leftPosition + 1 : -105
        );
      } else {
        setLeftPosition(
          leftPosition - 1 > -105 ? leftPosition - 1 : window.innerWidth
        );
      }
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [leftPosition,  index]);

  return (
    <div
      style={{ top: 150 * index, left: `${leftPosition}px` }}
      onMouseEnter={() => setIsOnAsteroid(true)}
      onMouseLeave={() => setIsOnAsteroid(false)}
      className="asteroid"
    >
      <div className="asteroid-container">
        <p>{asteroid.name}</p>
        <img
          className={index % 2 === 0 ? "asteroid-img" : "asteroid-img2"}
          src="Asteroid_Vesta-removebg-preview.png"
          alt="Asteroid"
        />
      </div>
      {isOnAsteroid && <AsteroidInfo {...asteroid} />}
    </div>
  );
}
