import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const CurrentLocationMap = ({ latitude, longitude }) => {
  const position = [latitude, longitude];

  return (
    <>
      <MapContainer center={position} zoom={13} style={{ width: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {position && (
          <Marker position={position}>
            <Popup>Your current location</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default CurrentLocationMap;
