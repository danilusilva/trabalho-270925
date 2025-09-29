export async function seed(knex) {
  await knex("marcas").del();
  await knex("marcas").insert([
    { id: 1, nome: "Apple", site: "apple.com", telefone: "0800-761-0867" },
    { id: 2, nome: "Samsung", site: "samsung.com", telefone: "0800-761-0900" },
    { id: 3, nome: "Xiaomi", site: "xiaomi.com", telefone: "0800-761-0800" },
    { id: 4, nome: "Huawei", site: "huawei.com", telefone: "0800-761-0700" },
  ]);
}
