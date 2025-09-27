/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('clientes', (table) => {
      table.increments('id').primary();
      table.string('nome', 100).notNullable();
      table.string('email', 100).notNullable().unique();
      table.string('cidade', 50).notNullable();
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable('clientes');
}
