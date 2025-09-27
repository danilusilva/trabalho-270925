// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = function(knex) {
//   return knex.schema
//     .createTable('itens_pedido', (table) => {
//         table.integer('id_pedido').unsigned().references('id').inTable('pedidos').onDelete('CASCADE');
//         table.integer('id_produto').unsigned().references('id').inTable('produtos').onDelete('CASCADE');
//         table.integer('quantidade').notNullable();
//         table.decimal('preco_unitario', 10, 2).notNullable();
//     })
// };

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = function(knex) {
//   return knex.schema
//     .dropTable('itens_pedido')
// };
