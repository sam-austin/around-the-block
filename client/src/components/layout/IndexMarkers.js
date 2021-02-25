import React, { useState, useEffect } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"
import { notification} from 'antd'

import InfoWindowForm from "./InfoWindowForm"
import PersistedMarkers from "./PersistedMarkers"
import translateServerErrors from "../../services/translateServerErrors"
import MarkerIcon from "../../functions/MarkerIcon"

const IndexMarkers = ({ setMarker, marker, panTo }) => {
  
  const [selected, setSelected] = useState(null)
  const [fetchedMarkers, setFetchedMarkers] = useState([])
  const [errors, setErrors] = useState({})

  const getMarkers = async () => {
    try {
      const response = await fetch("/api/v1/markers")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setFetchedMarkers(responseBody.markers)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getMarkers()
  }, [])

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Success',
      description:
        'Your upload was successful!',
      duration: 1.2,
    });
  };

  const addNewMarker = async (formRecord) => {
    let formData = new FormData()
      formData.append("lat", formRecord.lat)
      formData.append("lng", formRecord.lng)
      formData.append("photo", formRecord.photo)
      formData.append("title", formRecord.title)
      formData.append("caption", formRecord.caption)

    try {
      const response = await fetch("/api/v1/markers", {
        method: "POST",
        headers: new Headers({
          "Accept": "image/jpeg"
        }),
        body: formData
      })
      if (!response.ok) {
        if (response.status == 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      } else {
        const bodyResponse = await response.json()
        setFetchedMarkers([
          ...fetchedMarkers,
          bodyResponse.newSerializedMarker
        ])
        openNotificationWithIcon("success")
        setSelected(null)
        setMarker(null)
      }
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
      if (responseBody.serializedLike) {
        let newLikedMarkers = fetchedMarkers.map(fetchedMarker => {
          if (fetchedMarker.id == responseBody.serializedLike.markerId) {
            fetchedMarker.likes.push(responseBody.serializedLike)
          }
          return fetchedMarker
        })
      setFetchedMarkers(newLikedMarkers)
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
      if (responseBody) {
        let updatedLikedMarkers = fetchedMarkers.map(fetchedMarker => {
          if (fetchedMarker.id == responseBody.markerId) {
            fetchedMarker.likes = fetchedMarker.likes.filter(like => {
              like.markerId !== responseBody.markerId
            })
          }
          return fetchedMarker
        })
        setFetchedMarkers(updatedLikedMarkers)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  return(
    <>
    {marker !== null ? (
      <Marker 
      key={`${marker.lat} - ${marker.lng}`}
      position={{ lat: marker.lat, lng: marker.lng }}
      icon={MarkerIcon("blue", 0.6)}
      onClick = {() => {
        setSelected(marker)
        setErrors({})
      }}
      panTo={panTo}
    />) : null}  
    
    <PersistedMarkers 
      panTo={panTo} 
      fetchedMarkers={fetchedMarkers}
      addNewLike={addNewLike}
      removeLike={removeLike}
    />

    {selected ? (
      <InfoWindow 
        position={{ lat: selected.lat, lng: selected.lng }}
        onCloseClick={() => {
          setSelected(null);
        }}
      >
        <div className="form">
          <InfoWindowForm 
          selected={selected}
          addNewMarker={addNewMarker}
          errors={errors}
          />
        </div>
      </InfoWindow>
    ) : null}
    </>
  )
}

export default IndexMarkers
