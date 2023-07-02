import L, { latLng, map } from "leaflet";
import "./styles.css";


const mapping = async () => {
  fetch("https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326")
    .then(response => response.json())
    .then(data => {
      //console.log(data);

      let map = L.map('map').setView([61.05, 28.1], 14);

      let geojson = L.geoJSON(data, {
        onEachFeature: getFeature,
        style: {weight: 3}
      }).addTo(map);

      const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

      let osm = L.tileLayer(url, {
        minZoom: -3,
        attribution: "© OpenStreetMap"
      }).addTo(map);

      map.fitBounds(geojson.getBounds());
      
    });
}

const getFeature = (feature, layer) => {
  if (!feature.properties.nimi) return;
  const name = feature.properties.nimi;
  
  layer.bindPopup(name);
  layer.bindTooltip(name);
};

mapping()
