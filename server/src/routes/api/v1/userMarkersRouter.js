import express from "express"
import Marker from "../../../models/Marker.js"
import MarkerSerializer from "../../../serializers/MarkerSerializer.js"

const userMarkersRouter = new express.Router()

userMarkersRouter.get("/", async (req, res) => {
  const currentUserId = req.user.id 

  try {
    const markers = await Marker.query().where({userId: currentUserId})
    const serializedMarkers = await Promise.all(markers.map((marker) => MarkerSerializer.getSummary(marker)))
    return res.status(200).json({ markers: serializedMarkers })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default userMarkersRouter