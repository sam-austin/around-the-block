import React, { useState, useEffect } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"
import getCurrentUser from "../../services/getCurrentUser"
import LikeTile from "./LikeTile"

import { Typography } from 'antd';
const { Title } = Typography;

const MapLikedMarkers = ({ likedMarkers, panTo, markerIcon }) => {
  const [likedSelected, setLikedSelected] = useState(null)
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
    {likedMarkers.map((marker) => (
      <Marker 
        key={`${marker.lat} - ${marker.lng}`}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={markerIcon("red")}
        onClick = {() => {
          setLikedSelected(null)
          setLikedSelected(marker)
        }}
        panTo={panTo}
      />
    ))}
    
    {likedSelected ? (
      <InfoWindow 
        position={{ lat: likedSelected.lat, lng: likedSelected.lng }}
        onCloseClick={() => {
          setLikedSelected(null);
        }}
      >
        <div className="fetched-window">
          <div className="infophoto-div">
            <img className="infowindow-photo" src={likedSelected.photo} />
          </div>       
          <Title level={5}>{likedSelected.title} 
            <LikeTile
              currentUser={currentUser} 
              fetchedSelected={likedSelected}
            />
          </Title> 
          <p>by {likedSelected.user.userName}</p>
          <p>{likedSelected.caption}</p>
          
        </div>
      </InfoWindow>
    ) : null}
    </>
  )
}

export default MapLikedMarkers