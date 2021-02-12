class MarkerSerializer {
  static getSummary(marker) {
    const allowedAttributes = [
      "id", 
      "lat",
      "lng",
      "caption",
      "userId",
      "photo"
    ]

    let serializedMarker = {}
    for (const attribute of allowedAttributes) {
      serializedMarker[attribute] = marker[attribute]
    }
    return serializedMarker
  }
}

export default MarkerSerializer