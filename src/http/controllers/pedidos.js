import { database } from "../../database/index.js";

const agruparPedidosEItens = (rows) => {
  const pedidosMap = new Map();

  for (const row of rows) {
    const pedidoId = row.id_pedido;

    if (!pedidosMap.has(pedidoId)) {
      pedidosMap.set(pedidoId, {
        id: row.id_pedido,
        cliente_id: row.cliente_id,
        cidade: row.cidade,
        itens: [],
      });
    }

    const pedido = pedidosMap.get(pedidoId);

    if (row.produto_nome) {
      pedido.itens.push({
        id_produto: row.id_produto,
        produto_nome: row.produto_nome,
        quantidade: row.quantidade,
        preco_unitario: row.preco_unitario,
      });
    }
  }

  return Array.from(pedidosMap.values());
};

// Função base de consulta com todos os JOINs necessários
const getPedidosQuery = () => {
  return (
    database("pedidos")
      .select(
        "pedidos.id as id_pedido",
        "pedidos.cliente_id",
        "clientes.cidade as cidade",
        "itens_pedido.id_produto",
        "itens_pedido.quantidade",
        "itens_pedido.preco_unitario",
        "produtos.nome as produto_nome"
      )
        // JOIN 1: Pega os dados do cliente (da tabela 'clientes')
      .leftJoin("clientes", "pedidos.cliente_id", "clientes.id")
      // JOIN 2: Pega os itens (da tabela 'itens_pedido')
      .leftJoin("itens_pedido", "pedidos.id", "itens_pedido.id_pedido")
      // JOIN 3: Pega o nome do produto (da tabela 'produtos')
      .leftJoin("produtos", "itens_pedido.id_produto", "produtos.id")
  );
};

// GET /pedidos: Lista todos os pedidos com seus itens aninhados.
export async function listPedidos(req, res) {
  try {
    const query = await getPedidosQuery();
    const pedidosAninhados = agruparPedidosEItens(query);

    res.status(200).send({
      message: "Pedidos consultados com sucesso.",
      data: pedidosAninhados,
      error: false,
    });
  } catch (error) {
    console.error("Erro ao listar todos os pedidos:", error);
    res.status(500).send({
      message: "Erro interno no servidor ao listar pedidos.",
      data: null,
      error: true,
    });
  }
}

// GET /pedidos/:id: Lista o pedido com o id especificado.
export async function listByIdPed(req, res) {
  try {
    const { id } = req.params;
    const query = await getPedidosQuery().where("pedidos.id", id);

    if (!query.length) {
      return res.status(404).send({
        message: "Pedido não encontrado.",
        data: null,
        error: false,
      });
    }

    const pedidosAninhados = agruparPedidosEItens(query);

    res.status(200).send({
      message: "Pedido consultado com sucesso.",
      data: pedidosAninhados[0],
      error: false,
    });
  } catch (error) {
    console.error("Erro ao listar pedido por ID:", error);
    res.status(500).send({
      message: "Erro interno no servidor ao consultar o pedido.",
      data: null,
      error: true,
    });
  }
}

// GET /pedidos/:cidade: Implementando a listagem por cidade

export async function listPedidosByCidade(req, res) {
  try {
    const { cidade } = req.params;

    const query = await getPedidosQuery().where("clientes.cidade", cidade);
    if (!query.length) {
      return res.status(404).send({
        message: `Nenhum pedido encontrado na cidade de ${cidade}.`,
        data: null,
        error: false,
      });
    }

    const pedidosAninhados = agruparPedidosEItens(query);

    res.status(200).send({
      message: `Pedidos de ${cidade} consultados com sucesso.`,
      data: pedidosAninhados,
      error: false,
    });
  } catch (error) {
    console.error("Erro ao listar pedidos por cidade:", error);
    res.status(500).send({
      message: "Erro interno no servidor ao consultar pedidos por cidade.",
      data: null,
      error: true,
    });
  }
}
//  POST /pedidos: Cria um novo pedido com itens 
export async function storePedido(req, res) {
  const { cliente_id, itens } = req.body;

  // 1. Validação de Entrada (Mantida)
  if (!cliente_id || !itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).send({
      message:
        "Dados de entrada inválidos. O 'cliente_id' e o array de 'itens' são obrigatórios.",
      data: null,
      error: true,
    });
  }

  //  CÁLCULO DO TOTAL 
  const totalDoPedido = itens.reduce((soma, item) => {
    // Multiplica a quantidade pelo preço unitário e soma ao total acumulado
    const subtotal = item.quantidade * item.preco_unitario;
    return soma + subtotal;
  }, 0);
  // O .toFixed(2) garante que o valor tenha duas casas decimais, essencial para dinheiro.
  const totalFormatado = parseFloat(totalDoPedido.toFixed(2));

  const trx = await database.transaction();

  try {
    // 2. Insere o Pedido principal e obtém o ID
    const [pedidoId] = await trx("pedidos").insert({
      cliente_id: cliente_id,
      data: new Date(),
      total: totalFormatado, 
    });

    // 3. Prepara os Itens para Inserção (Não mudou)
    const itensParaInserir = itens.map((item) => ({
      id_pedido: pedidoId,
      id_produto: item.id_produto,
      quantidade: item.quantidade,
      preco_unitario: item.preco_unitario,
    }));

    // 4. Insere todos os Itens
    await trx("itens_pedido").insert(itensParaInserir);

    // 5. Confirma a transação
    await trx.commit();

    // 6. Resposta de Sucesso (201 Created)
    res.status(201).send({
      message: "Pedido e itens cadastrados com sucesso.",
      data: {
        id: pedidoId,
        cliente_id: cliente_id,
        data: new Date(),
        total: totalFormatado, // Retornando o total calculado
        itens: itensParaInserir,
      },
      error: false,
    });
  } catch (error) {
    // 7. Rollback em caso de falha
    await trx.rollback();

    console.error("Erro na transação de pedido (Rollback):", error);

    res.status(500).send({
      message:
        "Erro interno no servidor ao cadastrar pedido. A transação foi desfeita.",
      data: null,
      error: true,
    });
  }
}
