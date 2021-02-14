import React, { useState, useCallback, useRef } from "react"

import {
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";

import SearchPlacesBar from "./SearchPlacesBar"
import IndexMarkers from "./IndexMarkers"
import LocateUser from "./LocateUser"

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

const IndexMap = props => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBreZf4DTUyZTEkQEig023fllmvbcnSOKs",
    libraries,
  })

  const [marker, setMarker] = useState(null)

  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(15)
  }, [])

  const onMapClick = useCallback(event => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    })
  }, [])
  
  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) {
    return "Error loading maps"
  }
  if (!isLoaded) {
    return "Loading"
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
        <IndexMarkers panTo={panTo} marker={marker} />

        <LocateUser panTo={panTo} />

      </GoogleMap>
    </div>
  )
}

export default IndexMap 