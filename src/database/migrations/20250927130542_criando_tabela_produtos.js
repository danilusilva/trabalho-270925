/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("produtos", (table) => {
    table.increments("id").primary();
    table.string("nome", 100).notNullable();
    table.decimal("preco", 10, 2).notNullable();
    table.integer("estoque").notNullable();
    table
      .integer("marca_id")
      .unsigned()
      .references("id")
      .inTable("marcas")
      .onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("produtos");
}
