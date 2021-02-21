class LikeSerializer {
  static async getSummary(like) {
    const allowedAttributes = ["userId", "markerId", "liked"]

    let serializedLike = {}
    for (const attribute of allowedAttributes) {
      serializedLike[attribute] = like[attribute]
    }
    
    return serializedLike
  }
}

export default LikeSerializer