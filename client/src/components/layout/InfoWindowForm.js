import React, { useState } from "react"
import ErrorList from "./ErrorList.js"

const InfoWindowForm =({ selected, addNewMarker, errors }) => {
  const [ markerData, setMarkerData ] = useState({
    lat: selected.lat,  
    lng: selected.lng,
    caption: "",
  })

  const onChangeHandler = (event) => {
    setMarkerData({
      ...markerData,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const submitHandler = event => {
    event.preventDefault()
    addNewMarker(markerData)
  }

  return(
    <form onSubmit={submitHandler}>
      <ErrorList errors={errors} />
      <div className="grid-x grid-margin-x">
        <label className="cell small-12 text-left">
          Add a Caption:
          <input 
            name="caption"
            id="caption"
            type="text"
            value={markerData.caption}
            onChange={onChangeHandler}
          />
        </label>
        <div className="cell small-12 text-center">
          <input className="button" type="submit" value="Submit" />
        </div>
      </div>
    </form>

  )
}

export default InfoWindowForm