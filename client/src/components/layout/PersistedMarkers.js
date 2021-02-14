import React, { useState, useEffect } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"
import getCurrentUser from "../../services/getCurrentUser"

const PersistedMarkers = ({ fetchedMarkers, panTo, markerIcon }) => {
  const [fetchedSelected, setFetchedSelected] = useState(null)
  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  return(
    <>
    {fetchedMarkers.map((marker) => (
      <Marker 
        key={`${marker.lat} - ${marker.lng}`}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={marker.userId == currentUser.id ? (
          markerIcon("blue")
        ) : markerIcon("red")}

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