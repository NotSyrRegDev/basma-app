import React, { useState, useEffect } from "react";
import {collection   , db , getDocs} from './firebase';

import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { useGeolocated } from "react-geolocated";
// import * as parkData from "./data/skateboard-parks.json";
import mapStyles from "./mapStyles";
import { Navigate } from "react-router-dom";

function Map() {

  

    
  const [selectedPark, setSelectedPark] = useState(null);

    const [parksData , setParksData] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(  () => {

    const getParksData = async () => { 
      const querySnapshot = await getDocs(collection(db, "cases"));
      const parksDataArray = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }));
        
      setParksData(parksDataArray);
     
    }
  

    getParksData();

  } , []);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    return !isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
  ) : coords ? (
    <>
       { !user ? <Navigate to="/signUp" replace /> : ''  }

       <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: coords.latitude, lng: coords.longitude }}
    defaultOptions={{ styles: mapStyles }}
  >
    {parksData ? parksData.map(park => (
      <Marker
        key={park.key}
        position={{
          lat: park.location.latitude,
          lng: park.location.longitude
        }}
        onClick={() => {
          setSelectedPark(park);
        }}
        icon={{
          url: `/skateboarding.svg`,
          scaledSize: new window.google.maps.Size(25, 25)
        }}
      />
    )) : ''}
 
    {selectedPark && (
      <InfoWindow
        onCloseClick={() => {
          setSelectedPark(null);
        }}
        position={{
          lat: selectedPark.location.latitude,
          lng: selectedPark.location.longitude
        }}
      >
        <div>
          {/* <h2>{selectedPark.properties.NAME}</h2>
          <p>{selectedPark.properties.DESCRIPTIO}</p> */}
        </div>
      </InfoWindow>
    ) }
  </GoogleMap>

    </>
 
  ) : (
      <div>Getting the location data&hellip; </div>
  );
    
   
    
   
 
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }&callback=Function.prototype`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
