export async function seed(knex) {
 
  await knex("clientes").del();
  await knex("clientes").insert([
    {
      id: 1,
      nome: "Daniel Ventura",
      email: "daniel@email.com",
      cidade: "Juiz de Fora",
    },
    {
      id: 2,
      nome: "Danilu Samuel",
      email: "danilu@email.com",
      cidade: "Santana de Cataguases",
    },
    {
      id: 3,
      nome: "Larissa da Glória",
      email: "larissa@email.com",
      cidade: "Cataguases",
    },
    {
      id: 4,
      nome: "Lucas Araújo",
      email: "lucas.a@email.com",
      cidade: "Leopoldina",
    },
    {
      id: 5,
      nome: "João Pedro",
      email: "joao@email.com",
      cidade: "Rio de Janeiro",
    },
    {
      id: 6,
      nome: "Yasmin Dias",
      email: "yasmin@email.com",
      cidade: "São Paulo",
    },
  ]);
}

// id	nome	email	cidade
// 1	'Daniel Ventura',	'daniel@email.com',	'Juiz de Fora',
// 2	'Danilu Samuel',	'danilu@email.com',	'Santana de Cataguases',
// 3	'Larissa da Glória',	'larissa@email.com',	'Cataguases',
// 4	'Lucas Araújo',	'lucas.a@email.com',	'Leopoldina',
// 5	'João Pedro',	'joao@email.com',	'Rio de Janeiro',
// 6	'Yasmin Dias',	'yasmin@email.com',	'São Paulo'
