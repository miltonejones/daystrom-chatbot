import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const CurrentLocationMap = ({
  latitude,
  longitude,
  title = "Your location",
}) => {
  const position = [latitude, longitude];
  const mapWidth = window.innerWidth - 180;

  return (
    <>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: `${mapWidth}px`, width: `${mapWidth}px` }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {position && (
          <Marker position={position}>
            <Popup>{title}</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default CurrentLocationMap;
