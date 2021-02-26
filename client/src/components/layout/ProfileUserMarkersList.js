import React, { useState, useEffect } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"
import { Typography } from 'antd';
const { Title } = Typography;

import getCurrentUser from "../../services/getCurrentUser"
import ProfileLikeTile from "./ProfileLikeTile"
import MarkerIcon from "../../functions/MarkerIcon"

const ProfileUserMarkersList = ({ userMarkers, panTo, addNewLikeProfile, removeLike }) => {
  const [selected, setSelected] = useState(null)
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

  const getMarker = async (marker) => {
    try {
      const response = await fetch(`/api/v1/markers/${marker.id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setSelected(responseBody.serializedMarker)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  return(
    <>
    {userMarkers.map((marker) => (
      <Marker 
        key={`${marker.lat} - ${marker.lng}`}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={MarkerIcon("blue", 0.6)}
        onClick = {() => {
          setSelected(null)
          getMarker(marker)
        }}
        panTo={panTo}
      />
    ))}
    
    {selected ? (
      <InfoWindow 
        position={{ lat: selected.lat, lng: selected.lng }}
        onCloseClick={() => {
          setSelected(null);
        }}
      >
        <div className="fetched-window">
          <div className="infophoto-div">
            <img className="infowindow-photo" src={selected.photo} />
          </div>       
          <Title level={5}>{selected.title} 
            <ProfileLikeTile
              currentUser={currentUser} 
              fetchedSelected={selected}
              addNewLikeProfile={addNewLikeProfile}
              removeLike={removeLike}
            />
          </Title> 
          <p>by {selected.user.userName}</p>
          <p>{selected.caption}</p>
          
        </div>
      </InfoWindow>
    ) : null}
    </>
  )
}

export default ProfileUserMarkersList