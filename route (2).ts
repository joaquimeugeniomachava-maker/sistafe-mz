import { db } from "@/db";
import { produtos } from "@/db/schema";

export async function GET() {
  try {
    await db.delete(produtos);
    await db.insert(produtos).values([
      { nome: "Manual CBS — Catálogo de Bens e Serviços", descricao: "Guia completo de como usar o CBS no e-SISTAFE. Passo a passo com prints.", preco: 50000, categoria: "e-SISTAFE", activo: true },
      { nome: "Pack Completo e-SISTAFE", descricao: "3 manuais: CBS + Requisição + Subsistemas. Mais consultoria por WhatsApp.", preco: 300000, categoria: "Pack", activo: true },
      { nome: "Consultoria Individual", descricao: "1 hora de apoio personalizado via WhatsApp. Para dúvidas específicas.", preco: 150000, categoria: "Serviço", activo: true },
      { nome: "CV Profissional Formatado", descricao: "CV em formato PDF profissional com os teus dados. Recebe em 24h.", preco: 20000, categoria: "CV", activo: true },
    ]);
    return Response.json({ success: true, message: "Produtos carregados" });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
