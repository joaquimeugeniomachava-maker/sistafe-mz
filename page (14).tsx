"use client";
import { useState } from "react";
import { Users, ShieldCheck, Eye, Lock, ExternalLink, Calculator, Banknote, Building2, BookOpen, UserCheck } from "lucide-react";

interface Perfil { nome: string; atribuicao: string; pode: string; nivel: "consulta" | "execucao" | "controlo"; comum: boolean; }

const PERFIS: Perfil[] = [
  { nome: "Agente de Execução Orçamental", atribuicao: "Faz a cabimentação, liquidação e abertura/manutenção/encerramento de processos administrativos da despesa.", pode: "Registar despesas, fazer cabimento, liquidar e gerir o processo orçamental.", nivel: "execucao", comum: true },
  { nome: "Agente de Execução Financeira", atribuicao: "Executa a fase de pagamento e concessão de adiantamentos de fundos.", pode: "Processar pagamentos e adiantamentos (com processo válido).", nivel: "execucao", comum: true },
  { nome: "Agente de Património", atribuicao: "Gere os bens patrimoniais do Estado.", pode: "Registar, actualizar, movimentar e acompanhar património.", nivel: "execucao", comum: true },
  { nome: "Agente de Controlo Interno", atribuicao: "Regista conformidades processual e documental.", pode: "Verificar documentos, conferir conformidade e validar regularidade. Não executa a despesa.", nivel: "controlo", comum: true },
  { nome: "Agente Contabilista", atribuicao: "Faz registos contabilísticos da execução orçamental, financeira e patrimonial.", pode: "Lançamentos, conferências e apoio à contabilidade.", nivel: "execucao", comum: true },
  { nome: "Agente Financeiro", atribuicao: "Apoia a gestão financeira da unidade.", pode: "Operações financeiras e apoio à tesouraria.", nivel: "execucao", comum: true },
  { nome: "Agente de Consulta", atribuicao: "Só consulta informação.", pode: "Ver dados, relatórios e processos — sem alterar nada.", nivel: "consulta", comum: true },
  { nome: "Agente de Conformidade", atribuicao: "Confere se o processo está correcto e completo.", pode: "Verificar legalidade, documentos e sequência do processo.", nivel: "controlo", comum: false },
  { nome: "Ordenador de Despesas", atribuicao: "Autoriza a despesa.", pode: "Aprova e manda executar a despesa pública (autorização final).", nivel: "controlo", comum: false },
  { nome: "Agente Orçamental", atribuicao: "Atua na gestão orçamental geral.", pode: "Planificação e acompanhamento do orçamento.", nivel: "execucao", comum: false },
  { nome: "Agente Financeiro da Receita", atribuicao: "Trata da parte de receitas.", pode: "Registo e controlo de receitas arrecadadas.", nivel: "execucao", comum: false },
  { nome: "Agente de Programação Financeira", atribuicao: "Prepara a programação dos recursos financeiros.", pode: "Previsões de desembolso e planeamento financeiro.", nivel: "execucao", comum: false },
  { nome: "Administrador de Segurança", atribuicao: "Gere acessos e perfis.", pode: "Criar, alterar e controlar permissões. Não deve executar despesa.", nivel: "controlo", comum: false },
];

const NIVEL_UI = {
  consulta: { label: "👁 Consulta", cls: "bg-sky-500/10 text-sky-300 border-sky-500/30" },
  execucao: { label: "⚙️ Execução", cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
  controlo: { label: "🛡 Controlo / Autorização", cls: "bg-rose-500/10 text-rose-300 border-rose-500/30" },
};

const MEMORIZAR = [
  { papel: "Orçamento", accao: "planeia e cabimenta", icone: <Calculator size={22} />, cor: "text-blue-400" },
  { papel: "Financeiro", accao: "paga", icone: <Banknote size={22} />, cor: "text-emerald-400" },
  { papel: "Património", accao: "controla bens", icone: <Building2 size={22} />, cor: "text-teal-400" },
  { papel: "Controlo Interno", accao: "confere", icone: <ShieldCheck size={22} />, cor: "text-amber-400" },
  { papel: "Contabilidade", accao: "regista", icone: <BookOpen size={22} />, cor: "text-orange-400" },
  { papel: "Consulta", accao: "vê", icone: <Eye size={22} />, cor: "text-sky-400" },
  { papel: "Segurança", accao: "controla acessos", icone: <Lock size={22} />, cor: "text-purple-400" },
  { papel: "Ordenador", accao: "aprova", icone: <UserCheck size={22} />, cor: "text-rose-400" },
];

const REGRAS_PRATICAS = [
  "O Agente de Execução Orçamental mexe na fase orçamental, mas não deve aprovar sozinho.",
  "O Agente de Execução Financeira pode executar pagamento, mas precisa de processo válido.",
  "O Agente de Controlo Interno não executa a despesa; confere se o processo está conforme.",
  "O Ordenador de Despesas é quem dá a autorização final.",
  "O Agente de Consulta não altera nada.",
  "O Administrador de Segurança não deve executar despesa; só administra acessos.",
];

export default function PerfisPage() {
  const [filtro, setFiltro] = useState<"todos" | "comuns" | "consulta" | "execucao" | "controlo">("todos");

  const filtrados = PERFIS.filter(p =>
    filtro === "todos" ? true :
    filtro === "comuns" ? p.comum :
    p.nivel === filtro
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#120a10] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-fuchsia-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c026d333_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-300 via-pink-400 to-fuchsia-500">Perfis de Operação</h1>
        <p className="relative z-10 mt-4 text-fuchsia-200/70 max-w-2xl mx-auto">Quem faz o quê no e-SISTAFE — atribuições exatas e a segregação de funções que protege o dinheiro público.</p>
        <p className="relative z-10 mt-1 text-xs text-slate-500">Fonte principal: cedsif.gov.mz · confirmar atribuições exactas no manual oficial do CEDSIF.</p>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-14">
        {/* Leitura simples para memorizar */}
        <section className="rounded-3xl bg-gradient-to-r from-fuchsia-900/20 to-pink-900/20 border border-fuchsia-500/20 p-8">
          <h2 className="text-2xl font-black mb-6">Leitura simples para memorizar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MEMORIZAR.map(m => (
              <div key={m.papel} className="rounded-2xl bg-black/20 border border-white/5 p-4 text-center">
                <div className={`${m.cor} flex justify-center mb-2`}>{m.icone}</div>
                <p className="font-bold text-sm">{m.papel}</p>
                <p className="text-xs text-slate-400 mt-0.5">{m.accao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tabela de perfis */}
        <section>
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <h2 className="text-2xl font-black">Atribuições por perfil</h2>
            <div className="flex flex-wrap gap-2">
              {([["todos","Todos"],["comuns","Mais comuns"],["consulta","Consulta"],["execucao","Execução"],["controlo","Controlo"]] as const).map(([id, label]) => (
                <button key={id} onClick={() => setFiltro(id)} className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${filtro===id ? "bg-fuchsia-400 text-black" : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"}`}>{label}</button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {filtrados.map(p => {
              const n = NIVEL_UI[p.nivel];
              return (
                <div key={p.nome} className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{p.nome}</h3>
                      {p.comum && <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/20">COMUM</span>}
                    </div>
                    <span className={`shrink-0 px-2.5 py-1 rounded-md text-[11px] font-bold border ${n.cls}`}>{n.label}</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-2"><span className="text-fuchsia-300 font-semibold">Atribuição:</span> {p.atribuicao}</p>
                  <p className="text-xs text-slate-400 mt-1"><span className="text-emerald-300 font-semibold">Pode fazer:</span> {p.pode}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Regras práticas de segregação */}
        <section className="rounded-2xl bg-amber-950/20 border border-amber-500/20 p-6">
          <h3 className="font-black text-amber-200 mb-3 flex items-center gap-2"><Lock size={18} /> Em termos práticos — quem pode e quem não pode</h3>
          <ul className="space-y-2">
            {REGRAS_PRATICAS.map((r, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300"><span className="text-amber-400 font-black shrink-0">•</span>{r}</li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 mt-4 flex items-center gap-2">
            Princípio da segregação de funções: cada perfil faz só o que lhe compete.
            <a href="https://www.cedsif.gov.mz/cedsifportal/productos/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fuchsia-400 hover:underline">cedsif.gov.mz <ExternalLink size={11} /></a>
          </p>
        </section>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Perfis de Operação · e-SISTAFE · cedsif.gov.mz</footer>
    </main>
  );
}
