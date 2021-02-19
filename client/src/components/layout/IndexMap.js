import React, { useState, useCallback, useRef } from "react"
import { Layout } from 'antd';

const { Header, Content } = Layout;

import {
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";

import SearchPlacesBar from "./SearchPlacesBar"
import IndexMarkers from "./IndexMarkers"
import LocateUser from "./LocateUser"
import MapLegend from "./MapLegend"

const libraries = ["places"]

const mapContainerStyle = {
  width: "100%",
  height: "91vh",
  overflow: "hidden",
  position: "relative",
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

  const panTo = useCallback(({lat, lng}) => {
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
    <div className="grid-container site-layout">
      <Header>
      </Header>
      <Content 
        style={{ 
        overflow: 'hidden',
        display: "block",
        margin: "auto",
        }}>
        <GoogleMap 
          mapContainerStyle={mapContainerStyle} 
          zoom={14}
          center={center}
          options={options}
          onLoad={onMapLoad}
          onClick={onMapClick}
        >
          <SearchPlacesBar panTo={panTo} />

          <IndexMarkers panTo={panTo} marker={marker} setMarker={setMarker} />

          <LocateUser panTo={panTo} />

          <MapLegend />

        </GoogleMap>
      </Content>
    </div>
  )
}

export default IndexMap 