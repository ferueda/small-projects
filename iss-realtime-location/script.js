//making a map and tiles
const mymap = L.map('issMap').setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const tileURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(mymap);

// making a marker with an custom icon
const issIcon = L.icon({
  iconUrl: 'ISSpng.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16]
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const latitude = document.getElementById('lat');
const longitude = document.getElementById('lon');

const URL_API = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS() {
  const res = await fetch(URL_API);
  const data = await res.json();

  marker.setLatLng([data.latitude, data.longitude]);

  latitude.textContent = data.latitude;
  longitude.textContent = data.longitude;
}

getISS();
setInterval(getISS, 1000);
