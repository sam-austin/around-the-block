import React, { useState, useEffect } from "react"

import PersistedMarkers from "./PersistedMarkers"

const IndexMarkers = ({ panTo }) => {
  const [fetchedMarkers, setFetchedMarkers] = useState([])

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

  return(
    <PersistedMarkers 
      panTo={panTo} 
      fetchedMarkers={fetchedMarkers} 
    />
  )
}

export default IndexMarkers
