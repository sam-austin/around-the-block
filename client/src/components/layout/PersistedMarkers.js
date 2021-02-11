import React, { useState } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"

const PersistedMarkers = ({ fetchedMarkers, panTo }) => {
  
  const [fetchedSelected, setFetchedSelected] = useState(null)

  return(
    <>
    {fetchedMarkers.map((marker) => (
      <Marker 
        key={`${marker.lat} - ${marker.lng}`}
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick = {() => {
          setFetchedSelected(marker)
        }}
        panTo={panTo}
      />
    ))}

    {fetchedSelected ? (
      <InfoWindow 
        position={{ lat: fetchedSelected.lat, lng: fetchedSelected.lng }}
        onCloseClick={() => {
          setFetchedSelected(null);
        }}
      >
        <p>{fetchedSelected.caption}</p>
      </InfoWindow>
    ) : null}
    </>
  )
}

export default PersistedMarkers