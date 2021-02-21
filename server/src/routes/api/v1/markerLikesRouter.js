import express from "express"

import Like from "../../../models/Like.js"
import LikeSerializer from "../../../serializers/LikeSerializer.js"

const markerLikesRouter = new express.Router

markerLikesRouter.post("/", async (req, res) => {
  const liked = req.body.liked
  const markerId = req.body.markerId
  const userId = req.user.id

  try {
    const newLike = await Like.query().insertAndFetch({
      liked,
      userId,
      markerId,
    })
    const serializedLike = await LikeSerializer.getSummary(newLike)
    return res.status(201).json({ serializedLike })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

markerLikesRouter.patch("/", async (req, res) => {
  const markerId = req.body.markerId
  const userId = req.user.id

  try {
    await Like.query().findOne({ markerId, userId }).delete()
    return res.status(201).json({ markerId, userId })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default markerLikesRouter