import { database } from "../../database/index.js";
import { listClientes, listByIdClientes } from "../controllers/clientes.js";
import { list, listById } from "../controllers/marcas.js";
import {
  listByIdPed,
  listPedidos,
  listPedidosByCidade,
  storePedido,
} from "../controllers/pedidos.js";
import { listByIdProd, listProdutos } from "../controllers/produtos.js";

export const routes = async (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({ message: "API Ok." });
  }); // Rota de Marcas

  app.get("/marcas", list);
  app.get("/marcas/:id", listById);
  app.delete("/marcas/:id", async (req, res) => {
    const id = req.params.id;
    await database("marcas").where({ id }).del();
    res.status(204).send();
  }); // Rota de Clientes

  app.get("/clientes", listClientes);
  app.get("/clientes/:id", listByIdClientes);

  app.post("/clientes", async (req, res) => {
    const { nome, email, cidade } = req.body;
    const [id] = await database("clientes").insert({ nome, email, cidade });
    res.status(201).send({
      message: "Cliente cadastrado com sucesso.",
      data: { id, nome, email, cidade },
      error: false,
    });
  }); // Rota de Produtos

  app.get("/produtos", listProdutos);
  app.get("/produtos/:id", listByIdProd);
  app.post("/produtos", async (req, res) => {
    const { nome, preco, estoque, marca_id } = req.body;
    const [id] = await database("produtos").insert({
      nome,
      preco,
      estoque,
      marca_id,
    });
    res.status(201).send({
      message: "Produto cadastrado com sucesso.",
      data: { id, nome, preco, estoque, marca_id },
      error: false,
    });
  });

  // Rota de Pedidos

  app.get("/pedidos/cidade/:cidade", listPedidosByCidade);
  app.get("/pedidos/:id", listByIdPed);
  app.get("/pedidos", listPedidos);
  app.post("/pedidos", storePedido);
};
