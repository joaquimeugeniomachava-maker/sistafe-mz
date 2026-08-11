import { pgTable, serial, text, integer, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

export const produtos = pgTable("produtos", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  descricao: text("descricao").notNull(),
  preco: integer("preco").notNull(), // em centavos: 5000 = 50 MT
  categoria: varchar("categoria", { length: 50 }).notNull(),
  activo: boolean("activo").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const interacoes = pgTable("interacoes", {
  id: serial("id").primaryKey(),
  pergunta: text("pergunta").notNull(),
  respostaEssencial: text("resposta_essencial").notNull(),
  estado: varchar("estado", { length: 20 }).notNull(), // verificado | nao_verificado | inconclusivo
  autoValidacao: boolean("auto_validacao").default(false).notNull(),
  fontes: text("fontes").notNull(),
  incertezas: text("incertezas").notNull(),
  proximoPasso: text("proximo_passo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pedidos = pgTable("pedidos", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  produtoId: integer("produto_id").references(() => produtos.id).notNull(),
  estado: varchar("estado", { length: 20 }).default("pendente").notNull(), // pendente | pago | entregue
  referenciaMpesa: varchar("referencia_mpesa", { length: 50 }),
  valor: integer("valor").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
