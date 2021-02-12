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
        <div>
          <img className="infowindow-photo" src={fetchedSelected.photo} />
          <p>{fetchedSelected.caption}</p>
        </div>
      </InfoWindow>
    ) : null}
    </>
  )
}

export default PersistedMarkers