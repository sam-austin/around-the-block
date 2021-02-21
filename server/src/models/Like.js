const Model = require("./Model.js")

class Like extends Model {
  static get tableName() {
    return "likes"
  }

  static get relationMappings() {
    const { Marker, User } = require("./index.js")

    return {
      marker: {
        relation: Model.BelongsToOneRelation,
        modelClass: Marker,
        join: {
          from: "likes.markerId",
          to: "markers.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "likes.userId",
          to: "users.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["liked"],
      properties: {
        vote: { type: ["integer", "string"], maximum: 1 },
      },
    }
  }
}  


module.exports = Like;