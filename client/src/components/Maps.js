import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import CustomTextField from "./CustomTextField";
import { updateAddress, addAddress } from "../api/restaurantApi";
import { LoginContext } from "../context/LoginContext";

const Maps = ({
  draggable = false,
  showRoute = false,
  nickname,
  setNickname,
  landmark,
  setLandmark,
  currentLocation,
  setCurrentLocation,
  door,
  setDoor,
  adressId,
  address,
  setAddress,
  add = false,
}) => {
  const { email } = useContext(LoginContext);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false); // Track map load status

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const defaultCenter = {
    lat: 12.9716, // Default to Bangalore
    lng: 77.5946,
  };

  const destination = {
    lat: 12.973046385730271, // Example destination (Change this to any destination)
    lng: 80.251504685,
  };

  const customThemeStyle = [
    // // {
    // //   elementType: "geometry",
    // //   stylers: [{ color: "#F8FAFB" }],
    // // },
    // // {
    // //   elementType: "labels.text.fill",
    // //   stylers: [{ color: "#e87c00" }],
    // // },
    // {
    //   elementType: "labels.text.stroke",
    //   stylers: [{ color: "#f5e6c8" }],
    // },
    // {
    //   featureType: "administrative",
    //   elementType: "geometry",
    //   stylers: [{ color: "#e87c00" }],
    // },
    // {
    //   featureType: "administrative.land_parcel",
    //   elementType: "labels.text.fill",
    //   stylers: [{ color: "#ffb84d" }],
    // },
    // {
    //   featureType: "poi",
    //   elementType: "geometry",
    //   stylers: [{ color: "#ffe0b2" }],
    // },
    // {
    //   featureType: "poi.park",
    //   elementType: "geometry.fill",
    //   stylers: [{ color: "#9AC0F5" }],
    // },
    // {
    //   featureType: "road",
    //   elementType: "geometry.fill",
    //   stylers: [{ color: "#BBC9D6" }],
    // },
    // {
    //   featureType: "road",
    //   elementType: "geometry.stroke",
    //   stylers: [{ color: "#FFFFFF" }],
    // },
    // {
    //   featureType: "road.highway",
    //   elementType: "geometry.fill",
    //   stylers: [{ color: "#8BA5C1" }],
    // },
    // {
    //   featureType: "water",
    //   elementType: "geometry",
    //   stylers: [{ color: "#9AC0F5" }],
    // },
    // {
    //   featureType: "transit",
    //   elementType: "geometry",
    //   stylers: [{ color: "#ffab91" }],
    // },
    //
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [{ visibility: "off" }], // Hide administrative labels
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }], // Hide points of interest labels
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [{ visibility: "off" }], // Hide water labels
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "on" }], // Show street names
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }], // Hide transit labels
    },
  ];

  useEffect(() => {
    if (mapLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (currentLocation.lat === 0) {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            reverseGeocode({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          } else {
            setCurrentLocation({
              lat: currentLocation.lat,
              lng: currentLocation.lng,
            });
            reverseGeocode({
              lat: currentLocation.lat,
              lng: currentLocation.lng,
            });
          }
        },
        (error) => console.error("Error fetching location: ", error),
        { enableHighAccuracy: true }
      );
    }
  }, [mapLoaded]);

  // Function to calculate and display route
  const calculateRoute = (origin, destination) => {
    if (
      !origin ||
      !destination ||
      !mapLoaded ||
      !window.google ||
      !window.google.maps
    )
      return; // Ensure google.maps is available

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING, // Can change to WALKING, BICYCLING, etc.
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
    if (showRoute && currentLocation.lat !== 0) {
      calculateRoute(currentLocation, destination);
    }
    console.log("currentLocation", currentLocation);
  }, [currentLocation, mapLoaded]);

  // Function to handle dragging the marker
  const onMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    console.log("Marker dragged to: ", newLat, newLng);

    setCurrentLocation({ lat: newLat, lng: newLng });
    reverseGeocode({ lat: newLat, lng: newLng });
  };

  // Function to get the address from latitude and longitude
  const reverseGeocode = (location) => {
    if (!mapLoaded || !window.google || !window.google.maps) return; // Ensure google.maps is available

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          setAddress(results[0].formatted_address);
          console.log("Address:", results[0].formatted_address);
        } else {
          console.error("No results found");
        }
      } else {
        console.error("Geocoder failed due to:", status);
      }
    });
  };

  const bodyParams = {
    adressId: adressId,
    door: door,
    landmark: landmark,
    location: {
      lat: currentLocation?.lat.toString(),
      lng: currentLocation?.lng.toString(),
    },
    address: address,
    nickname: nickname,
  };

  const addbodyParams = {
    door: door,
    landmark: landmark,
    location: {
      lat: currentLocation?.lat.toString(),
      lng: currentLocation?.lng.toString(),
    },
    address: address,
    nickname: nickname,
  };

  const editAddress = (add, e) => {
    e.preventDefault();

    if (add === true) {
      addAddress(email, addbodyParams)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      updateAddress(email, adressId, bodyParams)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDEdqREu6S96D5ACHBJ-SBUIF7EQE3K8Hg"
      onLoad={() => setMapLoaded(true)}
    >
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          // center={currentLocation.lat !== 0 ? currentLocation : defaultCenter}
          center={currentLocation}
          zoom={17}
          options={{
            styles: customThemeStyle,
            disableDefaultUI: true, // Optional: Disable default UI controls (like zoom, street view)
          }}
        >
          {/* {currentLocation.lat !== 0 && ( */}
          <Marker
            // position={currentLocation.lat !== 0 ? currentLocation : defaultCenter}
            position={currentLocation}
            draggable={draggable}
            onDragEnd={onMarkerDragEnd}
            title="Drag to set your location"
          />
          {/* )} */}
          {/*gives the routes between two points*/}
          {directionsResponse && showRoute && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>

        {/* Display the address after marker is dropped */}

        {/* {address && ( */}
        <CustomTextField
          label="Address"
          value={address}
          editable={false}
          margin="0 0 10px 0"
        />
        {/* )} */}

        <CustomTextField
          label="Door/Flat NO."
          value={door}
          setValue={setDoor}
          margin="0 0 10px 0"
        />

        <CustomTextField
          label="Landmark"
          value={landmark}
          setValue={setLandmark}
          margin="0 0 10px 0"
        />

        <CustomTextField
          label="Nickname"
          value={nickname}
          setValue={setNickname}
          margin="0 0 10px 0"
        />

        <Box
          onClick={(e) => editAddress(add, e)}
          sx={{
            background: "#FC8019",
            height: "50px",
            color: "white",
            fontWeight: "700",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          SAVE ADDRESS AND PROCEED
        </Box>
      </div>
    </LoadScript>
  );
};

export default Maps;
