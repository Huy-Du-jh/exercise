mapboxgl.accessToken = 'pk.eyJ1IjoiaHV5ZHVqaCIsImEiOiJjbHRuczJ3ZXIwYTU2Mmtud3VzaDV3bmRiIn0.mRL6F6V7vjuGnjnodXRXkg';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/huydujh/cltp4trdw00op01qw0emb2ff2', // style URL
  center: [-87.62255, 41.8825], // starting position [lng, lat]
  zoom: 9 // starting zoom
});
const marker = new mapboxgl.Marker({ draggable: true });

map.on('click', (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['chicagoparks']
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>${feature.properties.title}</h3>
      <span>Longitude: ${feature.geometry.coordinates[0]}</span>
      <span>Latitude: ${feature.geometry.coordinates[1]}</span>
      <p>${feature.properties.description}</p>`
    )
    .addTo(map);
});

class removeMarkerControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl removeMarker";
    this._container.textContent = "Remove marker";
    this._container.addEventListener("click", () => {
      marker.remove();
    });
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

class addMarkerControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl addMarker";
    this._container.textContent = "Add marker";
    this._container.addEventListener("click", () => {
      const bounds = map.getBounds();
      const middlePoint = [(bounds._ne.lng + bounds._sw.lng) / 2, (bounds._ne.lat + bounds._sw.lat) / 2];
      marker.setLngLat(middlePoint).addTo(map);
    });
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  placeholder: "Search for places",
  proximity: {
    longitude: -87.55,
    latitude: 41.75
  },
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false // Do not use the default marker style
});
map.on("load", () => {
  map.resize();
  map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });

  map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  });

  // Listen for the `result` event from the Geocoder
  // `result` event is triggered when a user makes a selection
  //  Add a marker at the result's coordinates
  geocoder.on('result', (event) => {
    map.getSource('single-point').setData(event.result.geometry);
  });
})
map.addControl(geocoder);
const addMarker = new addMarkerControl();
map.addControl(addMarker, "top-left");
const markerControl = new removeMarkerControl();
map.addControl(markerControl, "top-left");
