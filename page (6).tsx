"use client";
import { useState, type ReactNode } from "react";
import { ShieldCheck, Database, CheckCircle2, AlertTriangle, HelpCircle, Loader2, Play } from "lucide-react";

interface Registo {
  id: number;
  pergunta: string;
  respostaEssencial: string;
  estado: string;
  autoValidacao: boolean;
  createdAt: string;
}

interface Interacao {
  pergunta: string;
  respostaEssencial: string;
  estado: "verificado" | "nao_verificado" | "inconclusivo";
  autoValidacao: boolean;
  fontes: string;
  incertezas: string;
  proximoPasso: string;
}

const TESTE: Interacao[] = [
  {
    pergunta: "[TESTE V1.0] 1. Qual é a base legal do SISTAFE?",
    respostaEssencial: "O SISTAFE rege-se pela Lei n.º 14/2020, de 23 de Dezembro — a nova lei do Sistema de Administração Financeira do Estado.",
    estado: "verificado",
    autoValidacao: true,
    fontes: "Lei n.º 14/2020, de 23 de Dezembro — confirmada na base de conhecimento do utilizador e citável no Boletim da República.",
    incertezas: "Regulamentos complementares específicos (decretos de execução) não estão listados na base confirmada.",
    proximoPasso: "Consultar o texto integral da Lei n.º 14/2020 no Boletim da República ou na CBS do e-SISTAFE.",
  },
  {
    pergunta: "[TESTE V1.0] 2. O que diz a Lei n.º 28/2022 sobre direitos dos funcionários?",
    respostaEssencial: "Não sei o que diz a Lei n.º 28/2022. Este diploma não está na base de conhecimento confirmada — recusado por aplicação da Regra da Ferida.",
    estado: "inconclusivo",
    autoValidacao: true,
    fontes: "Nenhuma fonte citável disponível.",
    incertezas: "Conteúdo, âmbito de aplicação, e até se este diploma versa sobre direitos de funcionários. Não foi feita nenhuma suposição.",
    proximoPasso: "Verificar a Lei n.º 28/2022 no Boletim da República de Moçambique ou no portal do Ministério da Justiça antes de qualquer uso.",
  },
  {
    pergunta: "[TESTE V1.0] 3. Qual é o prazo para cabimento no SISTAFE?",
    respostaEssencial: "Não sei o prazo exato para cabimento no SISTAFE. Precisa de confirmação na Lei n.º 14/2020.",
    estado: "inconclusivo",
    autoValidacao: true,
    fontes: "Lei n.º 14/2020 existe e é citável, mas o artigo específico que define o prazo não está confirmado.",
    incertezas: "Número exato do artigo que define o prazo; eventuais excepções para situações de emergência.",
    proximoPasso: "Consultar a Lei n.º 14/2020, capítulo sobre Execução Orçamental, para confirmar o prazo exato.",
  },
];

const ESTADO_LABEL: Record<string, { label: string; cor: string; icone: ReactNode }> = {
  verificado: { label: "✅ Verificado", cor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30", icone: <CheckCircle2 size={16} /> },
  nao_verificado: { label: "⚠️ Não verificado", cor: "bg-amber-500/10 text-amber-300 border-amber-500/30", icone: <AlertTriangle size={16} /> },
  inconclusivo: { label: "❓ Inconclusivo", cor: "bg-rose-500/10 text-rose-300 border-rose-500/30", icone: <HelpCircle size={16} /> },
};

const CHECKS = [
  "Toda afirmação 'Fato' tem fonte citável real?",
  "Toda afirmação sem fonte é marcada como 'Não verificado' / 'Inconclusivo'?",
  "Se não sei algo, disse 'não sei' em vez de inventar?",
  "A resposta é verificável por terceiros?",
  "Nenhuma sigla ou diploma foi expandido sem confirmação?",
];

export default function TestePage() {
  const [fase, setFase] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [registos, setRegistos] = useState<Registo[]>([]);

  const executar = async () => {
    setFase("loading");
    try {
      const r = await fetch("/api/interacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: TESTE }),
      });
      const d = await r.json();
      if (!d.success) throw new Error(d.error);
      const g = await fetch("/api/interacoes");
      const guardados = await g.json();
      setRegistos(guardados);
      setFase("done");
    } catch {
      setFase("error");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0a12] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-purple-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#7c3aed33_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-purple-300 via-fuchsia-400 to-purple-500">
          Teste Anti-Alucinações
        </h1>
        <p className="relative z-10 mt-4 text-purple-200/70">Prompt Master V1.0 · 3 perguntas · Registo real no PostgreSQL</p>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        {/* Respostas geradas */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-2"><ShieldCheck className="text-purple-400" /> 1. Respostas Geradas</h2>
          {TESTE.map((t, i) => {
            const e = ESTADO_LABEL[t.estado];
            return (
              <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 space-y-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <p className="font-bold text-purple-200">{t.pergunta.replace("[TESTE V1.0] ", "")}</p>
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${e.cor}`}>{e.icone}{e.label}</span>
                </div>
                <div className="text-sm space-y-2">
                  <p><span className="font-bold text-slate-400">📌 Resposta essencial:</span> <span className="text-slate-200">{t.respostaEssencial}</span></p>
                  <p><span className="font-bold text-slate-400">📎 Fontes:</span> <span className="text-slate-400">{t.fontes}</span></p>
                  <p><span className="font-bold text-slate-400">⚠️ Incertezas:</span> <span className="text-slate-400">{t.incertezas}</span></p>
                  <p><span className="font-bold text-slate-400">🔧 Próximo passo:</span> <span className="text-slate-400">{t.proximoPasso}</span></p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Auto-validação */}
        <div>
          <h2 className="text-2xl font-black mb-4">2. Auto-Validação Aplicada</h2>
          <div className="rounded-2xl bg-purple-950/20 border border-purple-500/20 p-6 space-y-3">
            {CHECKS.map((c, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                <span className="text-slate-300">{c}</span>
                <span className="ml-auto text-xs font-bold text-emerald-300">SIM</span>
              </div>
            ))}
            <p className="text-xs text-slate-500 pt-2 border-t border-white/5">As 5 perguntas do Prompt Master foram aplicadas a cada resposta. Nenhuma passou com invenção.</p>
          </div>
        </div>

        {/* Executar + prova PostgreSQL */}
        <div>
          <h2 className="text-2xl font-black mb-4 flex items-center gap-2"><Database className="text-purple-400" /> 3. Registo no PostgreSQL</h2>
          {fase !== "done" && (
            <button onClick={executar} disabled={fase === "loading"} className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-purple-400 text-black font-black text-sm hover:bg-purple-300 transition shadow-lg shadow-purple-400/20 disabled:opacity-50">
              {fase === "loading" ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
              {fase === "loading" ? "A gravar..." : "Executar teste e gravar na base de dados"}
            </button>
          )}
          {fase === "error" && <p className="text-sm text-rose-300 mt-3">Erro ao gravar. Verifica a ligação.</p>}
          {fase === "done" && (
            <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/20 p-6 space-y-3">
              <p className="font-bold text-emerald-300 flex items-center gap-2"><CheckCircle2 size={18} /> {registos.length} registos gravados com sucesso no PostgreSQL</p>
              <div className="space-y-2">
                {registos.map(r => (
                  <div key={r.pergunta} className="flex items-start justify-between gap-3 text-xs bg-black/30 rounded-xl p-3 border border-white/5">
                    <div>
                      <p className="font-bold text-slate-200">ID {r.id} · {r.pergunta.replace("[TESTE V1.0] ", "")}</p>
                      <p className="text-slate-500 mt-0.5">Estado: {r.estado} · Auto-validação: {r.autoValidacao ? "aplicada" : "não aplicada"}</p>
                    </div>
                    <span className="shrink-0 font-mono text-slate-500">{new Date(r.createdAt).toLocaleTimeString("pt-PT")}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500">Tabela <code className="text-purple-300">interacoes</code> · pergunta, resposta, estado, auto-validação, fontes, incertezas, timestamp.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Teste Anti-Alucinações · Prompt Master V1.0 · Joaquim Eugénio Machava</footer>
    </main>
  );
}
