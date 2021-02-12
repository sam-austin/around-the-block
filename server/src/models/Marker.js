const Model = require("./Model.js")

class Marker extends Model {
  static get tableName() {
    return "markers"
  }
  
  static get relationMappings() {
    const { User } = require("./index.js")

    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "markers.userId",
          to: "users.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["caption", "photo"],
      properties: {
        caption: { type: "string" },
        userId: { type: ["integer", "string"] },
      },
    }
  }
}

module.exports = Marker