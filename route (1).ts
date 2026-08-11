import { db } from "@/db";
import { pedidos, produtos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const todosPedidos = await db.select().from(pedidos);
    return Response.json(todosPedidos);
  } catch {
    return Response.json({ error: "Erro ao carregar pedidos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, telefone, produtoId } = body;

    if (!nome || !telefone || !produtoId) {
      return Response.json({ error: "Faltam campos obrigatórios" }, { status: 400 });
    }

    const produto = await db.select().from(produtos).where(eq(produtos.id, produtoId)).limit(1);
    if (!produto.length) {
      return Response.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    const novoPedido = await db.insert(pedidos).values({
      nome,
      telefone,
      produtoId,
      valor: produto[0].preco,
      estado: "pendente",
    }).returning();

    // Simular geração de referência M-Pesa
    const referencia = `MP${Date.now()}${produtoId}`;
    await db.update(pedidos).set({ referenciaMpesa: referencia }).where(eq(pedidos.id, novoPedido[0].id));

    return Response.json({
      success: true,
      pedido: { ...novoPedido[0], referenciaMpesa: referencia },
      instrucao: `Envie ${produto[0].preco / 100} MT para o número M-Pesa com a referência: ${referencia}`,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Erro ao criar pedido" }, { status: 500 });
  }
}
