import React, { useState, useEffect } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"
import { notification} from 'antd'

import InfoWindowForm from "./InfoWindowForm"
import PersistedMarkers from "./PersistedMarkers"
import translateServerErrors from "../../services/translateServerErrors"

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

  const markerIcon = color => {
    return ({
      path:
        "M10.453 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: color,
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 1.5,
      anchor: new google.maps.Point(13.2, 22),
    })
  };

  return(
    <>
    {marker !== null ? (
      <Marker 
      key={`${marker.lat} - ${marker.lng}`}
      position={{ lat: marker.lat, lng: marker.lng }}
      icon={markerIcon("blue")}
      onClick = {() => {
        setSelected(marker)
        setErrors({})
      }}
      panTo={panTo}
    />) : null}  
    
    <PersistedMarkers 
      panTo={panTo} 
      fetchedMarkers={fetchedMarkers}
      markerIcon={markerIcon}
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
