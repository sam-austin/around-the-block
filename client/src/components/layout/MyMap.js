import React, { useState, useCallback, useRef } from "react"

import {
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";

import SearchPlacesBar from "./SearchPlacesBar"
import MapMarkers from "./MapMarkers"

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

  const [markers, setMarkers] = useState([])

  const mapRef = useRef()

  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(16)
  }, [])

  const onMapClick = useCallback(event => {
    setMarkers(current => [
      ...current, 
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }
    ])
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
        onClick={onMapClick}
      >
        <MapMarkers
          panTo={panTo}
          markers={markers}
        /> 
      </GoogleMap>
    </div>
  )
}

export default MyMap 