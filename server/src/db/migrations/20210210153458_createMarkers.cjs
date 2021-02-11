/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {return knex.schema.createTable("markers", (t) => {
  t.bigIncrements("id")
  t.specificType("lat", "double precision").notNullable()
  t.specificType("lng", "double precision").notNullable()
  t.string("caption").notNullable()
  t.bigInteger("userId").notNullable().unsigned().index().references("users.id")
  t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
  t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
})
}

/**
* @param {Knex} knex
*/
exports.down = (knex) => {
return knex.schema.dropTableIfExists("markers")
}
