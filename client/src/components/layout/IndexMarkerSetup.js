import React, { useState, useEffect } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"

import InfoWindowForm from "./InfoWindowForm"
import IndexMarkersList from "./IndexMarkersList"
import translateServerErrors from "../../services/translateServerErrors"
import MarkerIcon from "../../functions/MarkerIcon"
import OpenNotificationWithIcon from "../../functions/OpenNotification"

const IndexMarkerSetup = ({ setMarker, marker, panTo }) => {
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
        OpenNotificationWithIcon("success")
        setMarker(null)
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
          setErrors({})
        }}
        panTo={panTo}/>
    ) : null}  

    {marker !== null ? (
      <InfoWindow 
        position={{ lat: marker.lat, lng: marker.lng }}
        onCloseClick={() => {
          setMarker(null);
        }}
        options={{pixelOffset: new google.maps.Size(-2, -25)}}
      >
        <div className="form">
          <InfoWindowForm 
            selected={marker}
            addNewMarker={addNewMarker}
            errors={errors}
          />
        </div>
      </InfoWindow>
    ) : null}

      <IndexMarkersList 
        panTo={panTo} 
        fetchedMarkers={fetchedMarkers}
      />
    </>
  )
}

export default IndexMarkerSetup
