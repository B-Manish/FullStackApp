import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const Maps = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const defaultCenter = {
    lat: 12.9716, // Default to Bangalore
    lng: 77.5946,
  };

  // const destination = {
  //   lat: 12.9352, // Example destination (Change this to any destination)
  //   lng: 77.6245,
  // };

  const destination = { lat: 12.973046385730271, lng: 80.25150468514555 }; // office

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error fetching location: ", error),
      { enableHighAccuracy: true }
    );
  }, []);

  // Function to calculate and display route
  const calculateRoute = (origin, destination) => {
    if (!origin || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING, // Use DRIVING, BICYCLING, TRANSIT, or WALKING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  };

  useEffect(() => {
    if (currentLocation.lat !== 0) {
      calculateRoute(currentLocation, destination);
    }
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
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Maps;
