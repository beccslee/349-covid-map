import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import Map from "components/Map";
import Header from "components/Header";
import BasicTable from "components/BasicTable";
import axios from "axios";
import "assets/stylesheets/application.scss";

const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
// let getCountries;
// let geoJsonCountries;
// let geoJsonProvinces;

/**
 * MapEffect
 * @description This is an example of creating an effect used to zoom in and set a popup on load
 */
const MapEffect = ({ markerRef  }) => {

  console.log("map");
  const map = useMap();
  
  let getCountries;
  let getProvinces;

  useEffect(() => {
    if (!markerRef.current || !map) return;
    
    (async function run() {
      try {
        getCountries = await axios.get("https://corona.lmao.ninja/v2/countries");
        // API call to get fetch data for provinces in a country
        getProvinces = await axios.get("https://disease.sh/v3/covid-19/jhucsse");
      } catch (e) {
        console.log(`failed to fetch countries: ${e.message}`);
        return;
      }
      
      // console.log(getProvinces);
      const countries = getCountries?.data;
      let provinces = getProvinces?.data;
      provinces = provinces.filter(elem => elem.province);
      // console.log(provinces);
      const hasData = Array.isArray(countries) && Array.isArray(provinces) && countries.length > 0 && provinces.length > 0;
    
      if (!hasData) return;
      
      const geoJsonCountries = {
        type: "FeatureCollection",
        features: countries.map((country = {}) => {
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

      const geoJsonProvinces = {
        type: "FeatureCollection",
        features: provinces.map((elem) => {
          const { coordinates = {} } = elem;
          const { latitude: lat, longitude: lng } = coordinates;
          return {
            type: "Feature",
            properties: {
              ...elem,
            },
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
          };
        }),
      };
      // console.log(geoJsonCountries); 
      const geoJsonCountryLayer = new L.GeoJSON(geoJsonCountries, {
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
      
      const geoJsonProvincesLayer = new L.GeoJSON(geoJsonProvinces, {
        pointToLayer: (feature = {}, latlng) => {
          const { properties = {} } = feature;
          const { province = '', stats = {}, updatedAt } = properties;
          let updatedFormatted;
          let casesString;
          
          casesString = `${stats?.confirmed}`;
          
          if (stats?.confirmed > 1000) {
            casesString = `${casesString.slice(0, -3)}k+`;
          }
          
          if (updatedAt) {
            updatedFormatted = new Date(updatedAt).toLocaleString();
          }
          
          const html = `
            <span class="small-icon-marker">
              <span class="icon-marker-tooltip">
                <h2>${province}</h2>
                <ul>
                  <li><strong>Confirmed:</strong>${stats?.confirmed}</li>
                  <li><strong>Deaths:</strong>${stats?.deaths}</li>
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
      
      geoJsonCountryLayer.addTo(map);
      geoJsonProvincesLayer.addTo(map);
    })();
  }, [map, markerRef]);
  
  return null;
};

const IndexPage = () => {
  console.log("index");
  const markerRef = useRef();
  const [ourData, setOurData] = useState(false);

  let getCountries;
  let getProvinces;
  
  const [ geoJsonCountries, setGeoJsonCountries ] = useState([]);
  const [ geoJsonProvinces, setGeoJsonProvinces ] = useState([]);
  
  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
  };
  
  console.log("text");
  console.log(ourData);
  if (geoJsonCountries?.length > 0 && geoJsonProvinces?.length > 0){
    setOurData(true);
    // console.log(getCountries);
    // console.log(getProvinces);
  }
  useEffect(() => {
    (async function run() {
      try {
        getCountries = await axios.get("https://corona.lmao.ninja/v2/countries");
        // API call to get fetch data for provinces in a country
        getProvinces = await axios.get("https://disease.sh/v3/covid-19/jhucsse");
      } catch (e) {
        console.log(`failed to fetch countries: ${e.message}`);
        return;
      }
      
      const countries = getCountries?.data;
      let provinces = getProvinces?.data;
      provinces = provinces.filter(elem => elem.province);
      // console.log(provinces);
      const hasData = Array.isArray(countries) && Array.isArray(provinces) && countries.length > 0 && provinces.length > 0;
      
      if (!hasData) return;
      
      const c = {
        type: "FeatureCollection",
        features: countries.map((country = {}) => {
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
      
      const p = {
        type: "FeatureCollection",
        features: provinces.map((elem) => {
          const { coordinates = {} } = elem;
          const { latitude: lat, longitude: lng } = coordinates;
          return {
            type: "Feature",
            properties: {
              ...elem,
            },
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
          };
        }),
      };
      setGeoJsonCountries(c);
      setGeoJsonProvinces(p);
    })();
  }, [ourData]);


  console.log(geoJsonCountries);
  console.log(geoJsonProvinces);

  return (
    <div className="mainPageContainer">
      <div className="headerFix">
        <Header />
      </div>
      <div className="mainPageModules">
        <div className="tableModule">
          <h2>Confirmed</h2>
            <BasicTable data={geoJsonCountries} />
        </div>

        <div className="tableModule">
          <h2>Active</h2>
          <BasicTable />
        </div>

        <div className="testMapContainer">
          <Map {...mapSettings}>
            <MapEffect markerRef={markerRef} />
            <Marker ref={markerRef} position={CENTER} />
          </Map>
          <div className="graphContainer">
            <div className="graphModule">
              <h3>Graph #1</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem
                ipsum dolor sit, amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="graphModule">
              <h3>Graph #2</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem
                ipsum dolor sit, amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>

        <div className="tableModule">
          <h2>Recovered</h2>
          <BasicTable />
        </div>

        <div className="tableModule">
          <h2>Deaths</h2>
          <BasicTable />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
