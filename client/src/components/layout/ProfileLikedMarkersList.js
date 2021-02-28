import React, { useState, useEffect } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"
import { Typography } from 'antd';
const { Title } = Typography;

import getCurrentUser from "../../services/getCurrentUser"
import LikeTile from "./LikeTile"

const ProfileLikedMarkersList = ({ likedMarkers, panTo, addNewLike, removeLike }) => {
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
    {likedMarkers.map((marker) => (
      <Marker 
        key={`${marker.lat} - ${marker.lng}`}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={{
          url: "https://around-the-block.s3.amazonaws.com/heart-icon.svg",
          origin: new window.google.maps.Point(0, 0),
          anchor: new google.maps.Point(16, 31),
          scaledSize: new window.google.maps.Size(30, 30),
        }}
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
        options={{pixelOffset: new google.maps.Size(-2, -25)}}
      >
        <div className="fetched-window">
          <div className="infophoto-div">
            <img className="infowindow-photo" src={selected.photo} />
          </div>       
          <Title level={5}>
            {selected.title} 
            {selected.userId !== currentUser.id ? (
              <LikeTile
              currentUser={currentUser} 
              fetchedSelected={selected}
              addNewLike={addNewLike}
              removeLike={removeLike}
              />
            ) : null}
          </Title> 
          <p>by {selected.user.userName}</p>
          <p>{selected.caption}</p>
          
        </div>
      </InfoWindow>
    ) : null}
    </>
  )
}

export default ProfileLikedMarkersList