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

const libraries = ["places"]

const mapContainerStyle = {
  width: "96.8vw",
  height: "86.8vh"
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
    <Layout className="site-layout-background">
      <Header></Header>
      <Content style={{ padding: '24px 24px 24px 24px'}} 
      className="site-layout-background">
        <SearchPlacesBar panTo={panTo} />

        <GoogleMap 
          mapContainerStyle={mapContainerStyle} 
          zoom={14}
          center={center}
          options={options}
          onLoad={onMapLoad}
          onClick={onMapClick}
        >
          <IndexMarkers panTo={panTo} marker={marker} setMarker={setMarker}/>

          <LocateUser panTo={panTo} />

        </GoogleMap>
      </Content>
    </Layout>
  )
}

export default IndexMap 