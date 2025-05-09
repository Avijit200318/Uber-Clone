import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import markerLogo from "../../public/images/marker logo.png";
import L from 'leaflet';

function RecenterMap({ ltd, lng }) {
    const map = useMap();
    useEffect(() => {
        map.setView([ltd, lng]);
    }, [ltd, lng]);
    return null;
}


export default function LiveTracking({ location }) {
    console.log("pickup: ", location);
    const [currentPosition, setCurrentPosition] = useState({
        ltd: location.ltd,
        lng: location.lng
    });

    useEffect(() => {
        const handlePosition = (position) => {
            const { latitude, longitude } = position.coords;
            // console.log('Position updated (watchPosition):', latitude, longitude);
            setCurrentPosition({
                ltd: latitude,
                lng: longitude
            });
        };

        const handleError = (error) => {
            console.error('Geolocation error:', error.message);
        };

        // Initial update
        navigator.geolocation.getCurrentPosition(handlePosition, handleError);

        // Start watching the position
        const watchId = navigator.geolocation.watchPosition(handlePosition, handleError);

        // Optional fallback update using setInterval (in case watch fails or is delayed)
        const intervalId = setInterval(() => {
            // console.log("map updated")
            navigator.geolocation.getCurrentPosition(handlePosition, handleError);
        }, 5000);

        // Cleanup
        return () => {
            navigator.geolocation.clearWatch(watchId);
            clearInterval(intervalId);
        };
    }, [location]);

    const maerkerIcon = new L.Icon({
        iconUrl: markerLogo,
        iconSize: [35, 40],
        iconAnchor: [15, 35],
    });

    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });


    return (
        <MapContainer center={[currentPosition.ltd, currentPosition.lng]} zoom={16} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }} zoomControl={false}>
            <TileLayer attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>' url='https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=xpL7wNLWmyhEZZoEtLXq' />

            <RecenterMap ltd={currentPosition.ltd} lng={currentPosition.lng} />
            <CircleMarker center={[currentPosition.ltd, currentPosition.lng]} radius={12} color='white' fillColor='blue'>
            </CircleMarker>

            <Marker position={[currentPosition.ltd, currentPosition.lng]} icon={redIcon}></Marker>
        </MapContainer>
    );
}
