import React, { useState, useCallback, useRef, useEffect } from "react";

import {
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";

import SearchPlacesBar from "./SearchPlacesBar"

const libraries = ["places"]

const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
}
const center = {
  lat: 42.3736,
  lng: -71.1097
}

const options = {
  disableDefaultUI: true,
  zoomControl:true,
}

const MyMap = props => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBreZf4DTUyZTEkQEig023fllmvbcnSOKs",
    libraries,
  })

  const mapRef = useRef()

  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(16)
  }, [])
  
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) {
    return "Error loading maps"
  }
  if (!isLoaded) {
    return "Loading Maps"
  }  

  return(
    <div>
      <SearchPlacesBar panTo={panTo} />

      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={14}
        center={center}
        options={options}
        onLoad={onMapLoad}
      > 
      </GoogleMap>
    </div>
  )
}

export default MyMap 