import React, { useState } from "react"

import { Marker } from "@react-google-maps/api"

const MapMarkers = ({ markers, panTo }) => {
  
  const [selected, setSelected] = useState(null)

  return(
    <>
    {markers.map((marker) => (
      <Marker 
        key={`${marker.lat} - ${marker.lng}`}
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick = {() => {
          setSelected(marker)
        }}
        panTo={panTo}
      />
    ))}
    </>
  )
}

export default MapMarkers