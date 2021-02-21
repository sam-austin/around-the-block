/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email", "userName"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get relationMappings() {
    const { Marker, Like } = require("./index.js")

    return {
      markers: {
        relation: Model.HasManyRelation,
        modelClass: Marker,
        join: {
          from: "users.id",
          to: "markers.userId"
        }
      },
      likesMarkers: {
        relation: Model.ManyToManyRelation,
        modelClass: Marker,
        join: {
          from: "users.id",
          through: {
            from: "likes.userId",
            to: "likes.markerId"
          },
          to: "markers.id"
        }
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: "users.id",
          to: "likes.userId"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "userName"],

      properties: {
        email: { type: "string" },
        cryptedPassword: { type: "string" },
        userName: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
