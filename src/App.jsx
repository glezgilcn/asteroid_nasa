import { useEffect, useState } from "react";
import { Asteroid } from "./Components/Asteroid";
import { Earth } from "./Components/Earth";
import { ModalInfo } from "./Components/ModalInfo";
import "./backgroundStyle.css";
import "./App.css";

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [showModalInfo, setShowModalInfo] = useState(true);

  const fetchData = async () => {
    const cache = localStorage.getItem("cache");
    if (cache) {
      setAsteroids(
        JSON.parse(cache).sort(
          (a, b) =>
            a.position.miss_distance.kilometers -
            b.position.miss_distance.kilometers
        )
      );
      /*console.log(JSON.parse(cache));*/
      return;
    }
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const dateOnFormatYYYYMMDD = `${year}-${month}-${day}`;
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateOnFormatYYYYMMDD}&end_date=${dateOnFormatYYYYMMDD}&api_key=qb8CbQ9tmE4J14PeMqnhH8hTUNs8d9ZGPM08MzrP`
    );
    if (response.ok) {
      const data = await response.json();
      const dateData = data.near_earth_objects[dateOnFormatYYYYMMDD];
      const asteroids = [];
      for (const asteroid of dateData) {
        asteroids.push({
          position: asteroid.close_approach_data[0],
          diameter: asteroid.estimated_diameter.kilometers,
          isHazardous: asteroid.is_potentially_hazardous_asteroid,
          isSentry: asteroid.is_sentry_object,
          name: asteroid.name,
        });
      }
      asteroids.sort(
        (a, b) =>
          a.position.miss_distance.kilometers -
          b.position.miss_distance.kilometers
      );
      setAsteroids(asteroids);
      localStorage.setItem("cache", JSON.stringify(asteroids));
    } else {
      console.log(response);
      alert("Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {showModalInfo && <ModalInfo setShowModalInfo={setShowModalInfo}/>}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      <div id="container">
        <Earth />
        <div className="asteroids-container">
          {asteroids.map((asteroid, index) => (
            <Asteroid key={asteroid.name} asteroid={asteroid} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
