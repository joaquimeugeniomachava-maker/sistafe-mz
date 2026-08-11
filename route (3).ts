import { db } from "@/db";
import { produtos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const activos = await db.select().from(produtos).where(eq(produtos.activo, true));
    return Response.json(activos);
  } catch {
    return Response.json({ error: "Erro ao carregar produtos" }, { status: 500 });
  }
}
