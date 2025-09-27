import { database } from "../../database/index.js";

export async function listProdutos(req, res) {
  try {
    const query = await database("produtos").select();

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

export async function listByIdProd(req, res) {
  try {
    const { id } = req.params;
    const query = await database("produtos").where("id", id);

    if (!query.length) {
      return res.status(200).send({
        message: "Dados consultados com sucesso.",
        data: {},
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
