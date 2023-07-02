import L, { latLng, map } from "leaflet";
import "./styles.css";



fetch("https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326")
  .then(response => response.json())
  .then(data => {
    //console.log(data);

    let map = L.map('map').setView([61.05, 28.1], 14);

    const getFeature = (feature, layer) => {
      if (!feature.properties.nimi) return;
      const name = feature.properties.nimi;
      
      layer.bindTooltip(name);
    }

    let geojson = L.geoJSON(data, {
      onEachFeature: getFeature,
      style: {weight: 3}
    }).addTo(map);


    let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: -3,
      attribution: "© OpenStreetMap"
    }).addTo(map);

    map.fitBounds(geojson.getBounds());
    
  })

