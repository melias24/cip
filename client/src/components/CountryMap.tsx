import { Box } from "@chakra-ui/react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "../res/countries.geo.json";
import { Feature, GeoJsonObject, Geometry } from "geojson";
import { Layer } from "leaflet";
import { useAppContext } from "../AppContext";

export default function CountryMap() {
  const { setSelectedCountry, setTabIndex } = useAppContext();

  const onEachCountry = (feature: Feature, layer: Layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(feature.properties.name, {
        permanent: true,
        direction: "center",
        className: "country-label",
      });
    }
    layer.on({
      click: () => {
        if (!feature.properties) {
          return;
        }
        console.log(`Clicked on country: ${feature.properties.name}`);
        setSelectedCountry(feature.properties.name);
        setTabIndex(1);
        // window.location.href = "#selected-country-section";
      },
    });
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
      />
      <GeoJSON
        data={countriesData as GeoJsonObject}
        onEachFeature={onEachCountry}
      />
    </MapContainer>
  );
}

// <Marker position={[51.505, -0.09]}>
//   <Popup>Hello, world</Popup>
// </Marker>
