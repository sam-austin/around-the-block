import express from "express"
import { ValidationError } from "objection"

import cleanUserInput from "../../../services/cleanUserInput.js"
import Marker from "../../../models/Marker.js"
import MarkerSerializer from "../../../serializers/MarkerSerializer.js"
import upload from "../../../services/photoUpload.js"

const markersRouter = new express.Router()

markersRouter.get("/", async (req, res) => {
  try {
    const markers = await Marker.query()
    const serializedMarkers = await Promise.all(markers.map((marker) => MarkerSerializer.getSummary(marker)))
    return res.status(200).json({ markers: serializedMarkers })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

markersRouter.get("/:id", async (req, res) => {
  const id = req.params.id

  try {
    const marker = await Marker.query().findById(id)
    const serializedMarker = await MarkerSerializer.getSummary(marker)
    return res.status(200).json({ serializedMarker })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

markersRouter.post("/", upload.single("photo"), async (req, res) => {
  const body = req.body
  const cleanBody = cleanUserInput(body)
  let newData = {}

  if (req.file !== undefined) {
    newData = {
      ...cleanBody,
      photo: req.file.location,
      userId: req.user.id
    }
  }

  try {
    const newMarker = await Marker.query().insertAndFetch(newData)
    const newSerializedMarker = await MarkerSerializer.getSummary(newMarker)
    return res.status(201).json({ newSerializedMarker })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})  

export default markersRouter