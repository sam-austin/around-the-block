import express from "express"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import Marker from "../../../models/Marker.js"
import MarkerSerializer from "../../../serializers/MarkerSerializer.js"
import upload from "../../../services/photoUpload.js"

const userMarkersRouter = new express.Router()

userMarkersRouter.get("/", async (req, res) => {
  const currentUserId = req.user.id 

  try {
    const markers = await Marker.query().where({userId: currentUserId})
    const serializedMarkers = markers.map((marker) => MarkerSerializer.getSummary(marker))
    return res.status(200).json({ markers: serializedMarkers })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

userMarkersRouter.post("/", upload.single("photo"), async (req, res) => {
  const body = req.body
  const cleanBody = cleanUserInput(body)

  const newData = {
    ...cleanBody,
    photo: req.file.location,
    userId: req.user.id
  }

  try {
    const newMarker = await Marker.query().insertAndFetch(newData)
    return res.status(201).json({ newMarker })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})  

export default userMarkersRouter