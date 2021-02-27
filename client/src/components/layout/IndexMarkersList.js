import React, { useState, useEffect } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"

import MarkerIcon from "../../functions/MarkerIcon"
import getCurrentUser from "../../services/getCurrentUser"
import LikeTile from "./LikeTile"

import { Typography } from 'antd';
const { Title } = Typography;

const IndexMarkersList = ({ panTo, fetchedMarkers }) => {
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

  const getMarker = async (marker) => {
    try {
      const response = await fetch(`/api/v1/markers/${marker.id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setFetchedSelected(responseBody.serializedMarker)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

    const addNewLike = async (liked) => {
    try {
      const response = await fetch(`/api/v1/markers/likes`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(liked)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      if (fetchedSelected.id == responseBody.serializedLike.markerId) {
        fetchedSelected.likes.push(responseBody.serializedLike)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const removeLike = async (markerInfo) => {
    try {
      const response = await fetch(`/api/v1/markers/likes`, 
      {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(markerInfo)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      if (fetchedSelected.id == responseBody.markerId) {
        fetchedSelected.likes = fetchedSelected.likes.filter(like => {
        like.markerId !== responseBody.markerId
        })
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  return(
    <>
    {fetchedMarkers.map((marker) => (
      <Marker 
        key={`${marker.lat} - ${marker.lng}`}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={marker.userId == currentUser.id ? (
          MarkerIcon("blue", 0.6)
        ) : MarkerIcon("red", 0.6)}
        onClick = {() => {
          setFetchedSelected(null)
          getMarker(marker)
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
          <Title level={5}>
            {fetchedSelected.title} 
            {fetchedSelected.userId !== currentUser.id ? (
              <LikeTile
              currentUser={currentUser} 
              fetchedSelected={fetchedSelected}
              addNewLike={addNewLike}
              removeLike={removeLike}
              />
            ) : null}
          </Title> 
          <p>by {fetchedSelected.user.userName}</p>
          <p>{fetchedSelected.caption}</p>
        </div>
      </InfoWindow>
    ) : null}
    </>
  )
}

export default IndexMarkersList