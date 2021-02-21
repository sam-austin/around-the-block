import UserSerializer from "./UserSerializer.js"
import LikeSerializer from "./LikeSerializer.js"

class MarkerSerializer {
  static async getSummary(marker) {
    const allowedAttributes = [
      "id", 
      "lat",
      "lng",
      "caption",
      "userId",
      "photo",
      "title"
    ]

    let serializedMarker = {}
    for (const attribute of allowedAttributes) {
      serializedMarker[attribute] = marker[attribute]
    }

    const user = await marker.$relatedQuery("user")
    const serializedUser = await UserSerializer.getSummary(user)
    serializedMarker.user = serializedUser

    const likes = await marker.$relatedQuery("likes")
    serializedMarker.likes = await Promise.all(
      likes.map((like) => {
        return LikeSerializer.getSummary(like)
      })
    )
    return serializedMarker
  }
}

export default MarkerSerializer