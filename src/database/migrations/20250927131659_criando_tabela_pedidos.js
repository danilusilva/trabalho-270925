/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('pedidos', (table) => {
        table.increments('id').primary();
        table.date('data').notNullable();
        table.decimal('total', 10, 2).notNullable();
        table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('CASCADE');
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable('pedidos')
}
