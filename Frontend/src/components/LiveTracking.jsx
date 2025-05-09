import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import markerLogo from "../../public/images/marker logo.png";
import L from 'leaflet';


export default function LiveTracking({ pickup }) {
    const [currentPosition, setCurrentPosition] = useState({
        ltd: pickup.ltd,
        lng: pickup.lng
    });

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Position updated:', latitude, longitude);
                    setCurrentPosition({
                        lat: latitude,
                        lng: longitude
                    });
                },
                (error) => {
                    console.error('Geolocation error:', error.message);
                }
            );
        };
    
        updatePosition(); // Run immediately once
    
        const intervalId = setInterval(updatePosition, 3000); // Run every second
    
        // return () => clearInterval(intervalId); // 🔥 Cleanup on component unmount
    }, [pickup]);

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

            <CircleMarker center={[currentPosition.ltd, currentPosition.lng]} radius={12} color='white' fillColor='blue'>
            </CircleMarker>
            {/* <Marker position={[currentPosition.ltd, currentPosition.lng]} icon={maerkerIcon}></Marker> */}
            <Marker position={[currentPosition.ltd, currentPosition.lng]} icon={redIcon}></Marker>
        </MapContainer>
    );
}
