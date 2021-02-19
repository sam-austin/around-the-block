import React, { useState, useEffect } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"
import getCurrentUser from "../../services/getCurrentUser"

import { Typography } from 'antd';
const { Title } = Typography;

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
        <div className="fetched-window">
          <div className="infophoto-div">
            <img className="infowindow-photo" src={fetchedSelected.photo} />
          </div>       
          <Title level={5}>{fetchedSelected.title}</Title> 
          <p>by {fetchedSelected.user.userName}</p>
          <p>{fetchedSelected.caption}</p>
          
        </div>
      </InfoWindow>
    ) : null}
    </>
  )
}

export default PersistedMarkers