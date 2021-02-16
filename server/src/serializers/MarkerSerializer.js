import UserSerializer from "./UserSerializer.js"

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
    return serializedMarker
  }
}

export default MarkerSerializer