/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {return knex.schema.createTable("likes", (t) => {
  t.bigIncrements("id")
  t.bigInteger("userId").notNullable().unsigned().index().references("users.id")
  t.bigInteger("markerId").notNullable().unsigned().index().references("markers.id")
  t.integer("liked").notNullable()
  t.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
  t.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
})
}

/**
* @param {Knex} knex
*/
exports.down = (knex) => {
return knex.schema.dropTableIfExists("likes")
}
