class MarkerSerializer {
  static getSummary(marker) {
    const allowedAttributes = [
      "id", 
      "lat",
      "lng",
      "caption",
      "userId"
    ]

    let serializedMarker = {}
    for (const attribute of allowedAttributes) {
      serializedMarker[attribute] = marker[attribute]
    }
    return serializedMarker
  }
}

export default MarkerSerializer