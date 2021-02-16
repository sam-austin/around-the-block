import React, { useState, useEffect } from "react"
import ErrorList from "./ErrorList.js"
import Dropzone from 'react-dropzone'

const InfoWindowForm =({ selected, addNewMarker, errors }) => {
  const [ markerData, setMarkerData ] = useState({
    lat: selected.lat,  
    lng: selected.lng,
    caption: "",
    title:"",
    photo: {}
  })

  const [uploadedPhoto, setUploadedPhoto] = useState([{}])

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

  const handleFileUpload = (acceptedFiles) => {
    setUploadedPhoto(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))

    setMarkerData({
      ...markerData,
      photo: acceptedFiles[0]
    })
  }

  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const imgStyle = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  let uploadMessage = null
  if (markerData.photo.path) {
    uploadMessage = (
      <p>Photo: {markerData.photo.path}</p>
    )
  }

  let photoPreview = null
  if (uploadedPhoto[0].preview) {
    photoPreview = (
      <div style={thumb} key={uploadedPhoto[0].name}>
        <div style={thumbInner}>
          <img
            src={uploadedPhoto[0].preview}
            style={imgStyle}
          />
        </div>
      </div>
    )
  }

  useEffect(() => () => {
    uploadedPhoto.forEach(file => URL.revokeObjectURL(file.preview));
  }, [uploadedPhoto]);

  return(
    <form onSubmit={submitHandler}>
      <ErrorList errors={errors} />
      <div className="grid-x grid-margin-x">
        <label className="cell small-12 text-left">
          Title:
          <input 
            name="title"
            id="title"
            type="text"
            value={markerData.title}
            onChange={onChangeHandler}
          />
          </label>
        <label className="cell small-12 text-left">
          Caption:
          <input 
            name="caption"
            id="caption"
            type="text"
            value={markerData.caption}
            onChange={onChangeHandler}
          />
        </label>
      </div>
      
      <Dropzone onDrop={handleFileUpload}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
            {!markerData.photo.path ? (
            <div {...getRootProps({className: "dropzone"})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop or click to select a file!</p>
            </div>) : null}
            <aside style={thumbsContainer}>
              {photoPreview}
            </aside>
          </section>
        )}
      </Dropzone>
      
      {uploadMessage}
  
      <div className="cell small-12 text-center">
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default InfoWindowForm