//Creating a map and adding tiles to it
const myMap = L.map("issMap").setView([0, 0], 3);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(myMap);

//making icon for marker
const myIcon = L.icon({
  iconUrl: "satellite.png",
});
//creating marker
const marker = L.marker([0, 0], { icon: myIcon }).addTo(myMap);

async function getSatelliteData() {
  let response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  let satelliteData = await response.json();
  const { latitude, longitude, velocity } = satelliteData;
  marker.setLatLng([latitude, longitude]);
  // marker.setView([latitude, longitude], 3);
  document.getElementById("lat").textContent = latitude + "°";
  document.getElementById("long").textContent = longitude + "°";
}

setInterval(() => {
  getSatelliteData().catch((err) => {
    console.log(err);
  });
}, 1000);
