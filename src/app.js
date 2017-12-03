import 'util/polyfills';
import uav from 'uav';
import router from 'uav-router';
import L from 'leaflet';
import socket from 'util/socket';

let map;

let geojson;

function queryGeo() {

    const bounds = map.getBounds();

    socket({
        type: 'geo',
        resource: 'features',
        args: {
            north: bounds.getNorth(),
            south: bounds.getSouth(),
            east: bounds.getEast(),
            west: bounds.getWest(),
            zoom: map.getZoom()
        }
    });

}

router.init(() => {

    uav.component(`
    <div>
        <div id="map"></div>
    </div>
    `, {}, '#app', () => {

        map = L.map('map', {
            center: [47.640982, -121.985211],
            zoom: 11
        });

        L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
            // maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        geojson = L.geoJSON()
            .bindPopup(layer => layer.feature.properties.name)
            .addTo(map);

        map.on('moveend', queryGeo);

        queryGeo();

    });

});

export default {

    updateGeo: rows => {

        geojson.clearLayers();

        rows.forEach(row => geojson.addData(row));

    }
};
