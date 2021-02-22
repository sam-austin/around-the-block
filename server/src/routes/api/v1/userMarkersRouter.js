import express from "express"
import { Marker, Like } from "../../../models/index.js"
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

userMarkersRouter.get("/likes", async (req, res) => {
  const currentUserId = req.user.id
  try {
    const userLikes = await Like.query().where({userId: currentUserId})
    let userLikedMarkerIds = await Promise.all(userLikes.map(userLike => userLike.markerId))
    
    let likedMarkers = []
    const markers = await Marker.query()
    for (let marker of markers) {
      if (userLikedMarkerIds.includes(marker.id)) {
        let serializedMarker = await MarkerSerializer.getSummary(marker)
        likedMarkers.push(serializedMarker)
      }  
    }
    return res.status(200).json({ likedMarkers })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default userMarkersRouter


