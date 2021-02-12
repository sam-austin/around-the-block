import express from "express"
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

export default markersRouter