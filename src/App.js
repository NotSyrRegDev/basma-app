import React, { useState, useEffect } from "react";
import {collection   , db , getDocs} from './firebase';

import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
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

  return (
    <>
    {  !user ? <Navigate to="/signIn" replace /> : '' }
      
       <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 16.896721, lng: 42.553600 }}
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
            url: `/ambulance.svg`,
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
   
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          "AIzaSyCMsrfVkncShzBcb1jWk6_okXOdcq5JQ5I"
        }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
