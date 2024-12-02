import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Maps = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  // Map container styling
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  // Default center of the map
  const defaultCenter = {
    lat: 12.9716, // Default to Bangalore
    lng: 77.5946,
  };

  // Function to get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(
          "Location fetched:",
          position.coords.latitude,
          position.coords.longitude
        ); // Check if location is being fetched
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error fetching location: ", error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    console.log("currentLocation", currentLocation);
  }, [currentLocation]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDEdqREu6S96D5ACHBJ-SBUIF7EQE3K8Hg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation.lat !== 0 ? currentLocation : defaultCenter}
        zoom={15}
      >
        {currentLocation.lat !== 0 && (
          <Marker position={currentLocation} title="You are here" />
        )}
        {/* Fallback marker (centered at Bangalore) if no location is available */}
        {currentLocation.lat === 0 && (
          <Marker
            position={defaultCenter} // Default location (Bangalore)
            title="Default Marker (Bangalore)"
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;
