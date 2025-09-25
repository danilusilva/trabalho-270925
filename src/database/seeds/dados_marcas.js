/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  await knex('marcas').del()
  await knex('marcas').insert([
    {id: 1, nome: 'Apple', site: 'apple.com', telefone: '0800-761-0867'},
    {id: 2, nome: 'Samsung', site: 'samsung.com', telefone: '0800-761-0087'},
  ]);
}
