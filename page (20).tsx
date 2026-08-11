"use client";
import { ExternalLink, CheckCircle2 } from "lucide-react";

const PASSOS = [
  {
    fase: "FASE 1 — Contas gratuitas (10 minutos)",
    cor: "border-sky-500/40",
    steps: [
      { n: 1, titulo: "Criar conta no GitHub (grátis)", desc: "Vai a github.com → Sign up → usa o teu email joaquimeugeniomachava@gmail.com → confirma.", link: "https://github.com/signup" },
      { n: 2, titulo: "Criar conta no Vercel (grátis)", desc: "Vai a vercel.com → Sign up → escolhe 'Continue with GitHub' → autoriza. Sem cartão de crédito.", link: "https://vercel.com/signup" },
      { n: 3, titulo: "Criar base de dados no Neon (grátis)", desc: "Vai a neon.tech → Sign up com GitHub → cria um projecto 'manual-sistafe' → copia a CONNECTION STRING (parece: postgres://user:pass@ep-xxx.neon.tech/neondb).", link: "https://neon.tech" },
    ],
  },
  {
    fase: "FASE 2 — Subir o código (5 minutos)",
    cor: "border-amber-500/40",
    steps: [
      { n: 4, titulo: "Criar repositório no GitHub", desc: "No GitHub → botão '+' → New repository → nome: 'manual-sistafe' → Public → Create repository." },
      { n: 5, titulo: "Subir os ficheiros", desc: "Na página do repositório criado → clica 'uploading an existing file' → arrasta TODOS os ficheiros do projecto → Commit changes." },
    ],
  },
  {
    fase: "FASE 3 — Publicar no Vercel (3 minutos)",
    cor: "border-emerald-500/40",
    steps: [
      { n: 6, titulo: "Importar no Vercel", desc: "Vai a vercel.com/new → Import → selecciona 'manual-sistafe' do GitHub → Import." },
      { n: 7, titulo: "Configurar a base de dados", desc: "Antes de clicar Deploy: vai a 'Environment Variables' → adiciona: Name = DATABASE_URL, Value = (a connection string do Neon que copiaste no passo 3)." },
      { n: 8, titulo: "Deploy!", desc: "Clica Deploy. Espera 2-3 minutos. O Vercel dá-te o link permanente: manual-sistafe.vercel.app" },
    ],
  },
  {
    fase: "FASE 4 — Activar a base de dados (2 minutos)",
    cor: "border-violet-500/40",
    steps: [
      { n: 9, titulo: "Criar as tabelas", desc: "No painel do Neon (console.neon.tech) → SQL Editor → cola e executa o SQL abaixo (está nesta página)." },
      { n: 10, titulo: "Testar", desc: "Abre o teu link (manual-sistafe.vercel.app) → navega → testa a Loja → se funciona, PARTILHA!" },
    ],
  },
];

const SQL = `-- Cola isto no SQL Editor do Neon e clica Run
CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  preco INTEGER NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pedidos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  produto_id INTEGER REFERENCES produtos(id) NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'pendente',
  referencia_mpesa VARCHAR(50),
  valor INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS interacoes (
  id SERIAL PRIMARY KEY,
  pergunta TEXT NOT NULL,
  resposta_essencial TEXT NOT NULL,
  estado VARCHAR(20) NOT NULL,
  auto_validacao BOOLEAN NOT NULL DEFAULT FALSE,
  fontes TEXT NOT NULL,
  incertezas TEXT NOT NULL,
  proximo_passo TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Produtos iniciais
INSERT INTO produtos (nome, descricao, preco, categoria) VALUES
('Manual CBS — Catálogo de Bens e Serviços', 'Guia completo de como usar o CBS no e-SISTAFE.', 50000, 'e-SISTAFE'),
('Pack Completo e-SISTAFE', '3 manuais: CBS + Requisição + Subsistemas + consultoria WhatsApp.', 300000, 'Pack'),
('Consultoria Individual', '1 hora de apoio personalizado via WhatsApp.', 150000, 'Serviço'),
('CV Profissional Formatado', 'CV em PDF profissional com os teus dados. Recebe em 24h.', 20000, 'CV');`;

export default function PublicarPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0a0d12] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-emerald-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#05966933_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-emerald-300 via-teal-400 to-emerald-500">Publicar Grátis</h1>
        <p className="relative z-10 mt-4 text-emerald-200/70 max-w-xl mx-auto">Link permanente, gratuito, sem cartão de crédito. 20 minutos.</p>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        {/* Resumo */}
        <section className="rounded-2xl bg-emerald-950/20 border border-emerald-500/20 p-6">
          <h2 className="font-black text-emerald-300 mb-3">O que vais precisar (tudo grátis)</h2>
          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-black/20 rounded-xl p-3 border border-white/5">
              <p className="font-bold text-sky-300 mb-1">GitHub</p>
              <p className="text-slate-400">Guarda o teu código (como um flash na nuvem).</p>
            </div>
            <div className="bg-black/20 rounded-xl p-3 border border-white/5">
              <p className="font-bold text-emerald-300 mb-1">Vercel</p>
              <p className="text-slate-400">Publica o site com link permanente (.vercel.app).</p>
            </div>
            <div className="bg-black/20 rounded-xl p-3 border border-white/5">
              <p className="font-bold text-violet-300 mb-1">Neon</p>
              <p className="text-slate-400">Base de dados PostgreSQL na nuvem (para a Loja funcionar).</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">Tudo com conta grátis. Sem mensalidade. Sem cartão de crédito. O link fica activo para sempre enquanto a conta existir.</p>
        </section>

        {/* Passos */}
        {PASSOS.map(f => (
          <section key={f.fase}>
            <h2 className="text-xl font-black mb-4">{f.fase}</h2>
            <div className="space-y-3">
              {f.steps.map(s => (
                <div key={s.n} className={`flex gap-4 p-4 rounded-2xl bg-white/[0.03] border-l-4 ${f.cor} border border-white/5`}>
                  <span className="shrink-0 w-9 h-9 rounded-full bg-emerald-400 text-black font-black flex items-center justify-center">{s.n}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{s.titulo}</h3>
                    <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
                    {"link" in s && s.link && (
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-emerald-400 hover:underline">
                        Abrir <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* SQL */}
        <section>
          <h2 className="text-xl font-black mb-3">SQL para o Neon (passo 9)</h2>
          <p className="text-sm text-slate-400 mb-3">Copia tudo e cola no SQL Editor do Neon. Clica <strong>Run</strong>.</p>
          <div className="rounded-2xl bg-[#0f0f12] border border-white/5 p-5 overflow-x-auto">
            <pre className="text-xs text-emerald-200 font-mono whitespace-pre leading-5">{SQL}</pre>
          </div>
        </section>

        {/* Resultado */}
        <section className="rounded-3xl bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 p-8 text-center">
          <CheckCircle2 className="mx-auto text-emerald-400 mb-3" size={40} />
          <h2 className="text-2xl font-black text-emerald-200">Depois do passo 10</h2>
          <p className="text-sm text-slate-300 mt-2">O teu link permanente será algo como:</p>
          <p className="text-lg font-mono font-black text-emerald-300 mt-3">manual-sistafe.vercel.app</p>
          <p className="text-xs text-slate-500 mt-3">Podes escolher outro nome no Vercel. Este link é gratuito, permanente e funciona no telemóvel e no computador de qualquer pessoa em Moçambique.</p>
        </section>

        {/* Depois de publicar */}
        <section className="rounded-2xl bg-amber-950/20 border border-amber-500/20 p-6">
          <h2 className="font-black text-amber-200 mb-2">Depois de publicar</h2>
          <ol className="space-y-2 text-sm text-slate-200">
            <li className="flex gap-3"><span className="font-black text-amber-400">1.</span> Copia o link permanente.</li>
            <li className="flex gap-3"><span className="font-black text-amber-400">2.</span> Abre <a href="/lancamento" className="text-amber-400 font-bold hover:underline">/lancamento</a> — substitui [COLE O SEU LINK AQUI] pelo link real.</li>
            <li className="flex gap-3"><span className="font-black text-amber-400">3.</span> Cola no WhatsApp e no Facebook.</li>
            <li className="flex gap-3"><span className="font-black text-amber-400">4.</span> Espera. Responde. Vende.</li>
          </ol>
        </section>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Publicar Grátis · Vercel + Neon + GitHub · Custo: 0 MT</footer>
    </main>
  );
}
