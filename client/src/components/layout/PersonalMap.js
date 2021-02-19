import React, { useCallback, useRef } from "react"
import { Layout } from 'antd';

import {
  GoogleMap,
  useLoadScript
} from "@react-google-maps/api";

import SearchPlacesBar from "./SearchPlacesBar"
import LocateUser from "./LocateUser"
import PersistedMarkers from "./PersistedMarkers"

const libraries = ["places"]

const mapContainerStyle = {
  width: "100%",
  height: "91vh",
}
const center = {
  lat: 42.3736,
  lng: -71.1097
}

const options = {
  disableDefaultUI: true,
  zoomControl:true,
}

const PersonalMap = ({ userMarkers, markerIcon }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBreZf4DTUyZTEkQEig023fllmvbcnSOKs",
    libraries,
  })

  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(15)
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
    <Layout className="site-layout-background grid-container-photomap">
        <GoogleMap 
          mapContainerStyle={mapContainerStyle} 
          zoom={14}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          <SearchPlacesBar panTo={panTo} />

          <PersistedMarkers
            fetchedMarkers={userMarkers}
            markerIcon={markerIcon}
            panTo={panTo}
          />    

          <LocateUser panTo={panTo} />

        </GoogleMap>
    </Layout>
  )
}

export default PersonalMap 