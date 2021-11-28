import React, { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import axios from "axios";

import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import Snippet from "components/Snippet";

const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
// const ZOOM = 10;

// const timeToZoom = 2000;
// const timeToOpenPopupAfterZoom = 4000;
// const timeToUpdatePopupAfterZoom = timeToOpenPopupAfterZoom + 3000;

// const popupContentHello = `<p>Hello 👋</p>`;
// const popupContentGatsby = `
//   <div class="popup-gatsby">
//     <div class="popup-gatsby-image">
//       <img class="gatsby-astronaut" src=${gatsby_astronaut} />
//     </div>
//     <div class="popup-gatsby-content">
//       <h1>Gatsby Leaflet Starter</h1>
//       <p>Welcome to your new Gatsby site. Now go build something great!</p>
//     </div>
//   </div>
// `;

/**
 * MapEffect
 * @description This is an example of creating an effect used to zoom in and set a popup on load
 */

const MapEffect = ({ markerRef }) => {
  const map = useMap();

  useEffect(() => {
    let response;
    if (!markerRef.current || !map) return;

    (async function run() {
      try {
        response = await axios.get("https://corona.lmao.ninja/v2/countries");
      } catch (e) {
        console.log(`failed to fetch countries: ${e.message}`);
        return;
      }

      const { data = [] } = response;
      const hasData = Array.isArray(data) && data.length > 0;

      if (!hasData) return;
      const geoJson = {
        type: "FeatureCollection",
        features: data.map((country = {}) => {
          const { countryInfo = {} } = country;
          const { lat, long: lng } = countryInfo;
          return {
            type: "Feature",
            properties: {
              ...country,
            },
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
          };
        }),
      };
      console.log("data: ", geoJson);

      const geoJsonLayers = new L.GeoJSON(geoJson, {
        pointToLayer: (feature = {}, latlng) => {
          const { properties = {} } = feature;
          let updatedFormatted;
          let casesString;

          const { country, updated, cases, deaths, recovered } = properties;

          casesString = `${cases}`;

          if (cases > 1000) {
            casesString = `${casesString.slice(0, -3)}k+`;
          }

          if (updated) {
            updatedFormatted = new Date(updated).toLocaleString();
          }

          const html = `
            <span class="icon-marker">
              <span class="icon-marker-tooltip">
                <h2>${country}</h2>
                <ul>
                  <li><strong>Confirmed:</strong>${cases}</li>
                  <li><strong>Deaths:</strong>${deaths}</li>
                  <li><strong>Recovered:</strong>${recovered}</li>
                  <li><strong>Update:</strong>${updatedFormatted}</li>
                </ul>
              </span>
              ${casesString}
            </span>
          `;

          return L.marker(latlng, {
            icon: L.divIcon({
              className: "icon",
              html,
            }),
            riseOnHover: true,
          });
        },
      });

      geoJsonLayers.addTo(map);
    })();
  }, [map, markerRef]);

  return null;
};

const IndexPage = () => {
  const markerRef = useRef();

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Team Barry COVID Dashboard</title>
      </Helmet>

      <Map {...mapSettings}>
        <MapEffect markerRef={markerRef} />
        <Marker ref={markerRef} position={CENTER} />
      </Map>

      <div className="graphsContainer">
        <h2>Graphs</h2>
      </div>
    </Layout>
  );
};

export default IndexPage;
