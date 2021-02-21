const Model = require("./Model.js")

class Marker extends Model {
  static get tableName() {
    return "markers"
  }
  
  static get relationMappings() {
    const { User, Like } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "markers.userId",
          to: "users.id"
        }
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "markers.id",
          through: {
            from: "likes.markerId",
            to: "likes.userId"
          },
          to: "users.id"
        }
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: "markers.id",
          to: "likes.markerId"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["caption", "photo", "title"],
      properties: {
        caption: { type: "string" },
        userId: { type: ["integer", "string"] },
        title: { type: "string" },
      },
    }
  }
}

module.exports = Marker