import { database } from "../../database/index.js";

export async function listClientes(req, res) {
  try {
    const query = await database("clientes").select();

    res.status(200).send({
      message: "Dados consultados com sucesso.",
      data: query,
      error: false,
    });
  } catch (error) {
    res.status(500).send({
      message: "Erro no servidor.",
      data: "",
      error: true,
    });
  }
}

export async function listByIdClientes(req, res) {
  try {
    const { id } = req.params;
    const query = await database("clientes").where("id", id);

    if (!query.length) {
      return res.status(404).send({
        message: "Dados não encontrados!",
        data: null,
        error: false,
      });
    }

    return res.status(200).send({
      message: "Dados consultados com sucesso.",
      data: query[0],
      error: false,
    });
  } catch (error) {
    res.status(500).send({
      message: "Erro no servidor.",
      data: "",
      error: true,
    });
  }
}
