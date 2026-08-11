import { db } from "@/db";
import { interacoes } from "@/db/schema";
import { like } from "drizzle-orm";

export async function GET() {
  try {
    const todas = await db.select().from(interacoes);
    return Response.json(todas);
  } catch {
    return Response.json({ error: "Erro ao carregar registos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "Campo 'items' obrigatório (array)" }, { status: 400 });
    }

    // Limpa registos de testes anteriores para manter o log limpo
    await db.delete(interacoes).where(like(interacoes.pergunta, "[TESTE%"));

    const guardados = await db.insert(interacoes).values(
      items.map((i: {
        pergunta: string;
        respostaEssencial: string;
        estado: string;
        autoValidacao: boolean;
        fontes: string;
        incertezas: string;
        proximoPasso: string;
      }) => ({
        pergunta: i.pergunta,
        respostaEssencial: i.respostaEssencial,
        estado: i.estado,
        autoValidacao: i.autoValidacao,
        fontes: i.fontes,
        incertezas: i.incertezas,
        proximoPasso: i.proximoPasso,
      }))
    ).returning();

    return Response.json({ success: true, registados: guardados.length, registos: guardados });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
