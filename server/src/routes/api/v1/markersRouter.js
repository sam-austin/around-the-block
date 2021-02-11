import express from "express"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import Marker from "../../../models/Marker.js"
import MarkerSerializer from "../../../serializers/MarkerSerializer.js"

const markersRouter = new express.Router()

markersRouter.get("/", async (req, res) => {
  try {
    const markers = await Marker.query()
    const serializedMarkers = markers.map((marker) => MarkerSerializer.getSummary(marker))
    return res.status(200).json({ markers: serializedMarkers })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

markersRouter.post('/', async (req, res) => {
  const body = req.body
  const userId = req.user.id
  const cleanBody = cleanUserInput(body)

  try {
    const newMarker = await Marker.query().insertAndFetch({...cleanBody, userId})
    return res.status(201).json({ newMarker })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default markersRouter