"use client";
import { useState } from "react";
import { Search, CheckCircle2, AlertTriangle, HelpCircle, ExternalLink } from "lucide-react";

interface Sigla {
  sigla: string;
  nome: string;
  funcao: string;
  categoria: "entidade" | "sistema" | "subsistema" | "modulo" | "instrumento" | "legislacao";
  estado: "verificado" | "nao_verificado" | "inconclusivo";
  fonte?: { label: string; url?: string };
}

const SIGLAS: Sigla[] = [
  // ENTIDADES
  { sigla: "CEDSIF, IP", nome: "Centro de Desenvolvimento de Sistemas de Informação de Finanças, Instituto Público", funcao: "Desenvolve, gere e suporta os sistemas informáticos das finanças públicas, incluindo o e-SISTAFE.", categoria: "entidade", estado: "verificado", fonte: { label: "cedsif.gov.mz", url: "https://www.cedsif.gov.mz/cedsifportal/quem-somos/" } },
  { sigla: "UFSA", nome: "Unidade Funcional de Supervisão das Aquisições", funcao: "Coordena e supervisiona a contratação pública, gere dados centrais e apoia capacitação.", categoria: "entidade", estado: "verificado", fonte: { label: "ufsa.gov.mz", url: "https://www.ufsa.gov.mz/criacao_ufsa.php" } },
  { sigla: "MEF", nome: "Ministério da Economia e Finanças", funcao: "Tutela a política financeira e orçamental do Estado.", categoria: "entidade", estado: "verificado", fonte: { label: "mef.gov.mz", url: "https://www.mef.gov.mz/" } },
  { sigla: "TA", nome: "Tribunal Administrativo", funcao: "Fiscaliza a legalidade e a gestão financeira pública.", categoria: "entidade", estado: "verificado", fonte: { label: "cedsif.gov.mz", url: "https://www.cedsif.gov.mz/" } },
  { sigla: "UGEA", nome: "Unidade Gestora Executora das Aquisições", funcao: "Executa os processos de aquisição ao nível dos órgãos do Estado.", categoria: "entidade", estado: "verificado", fonte: { label: "ufsa.gov.mz", url: "http://ufsa.gov.mz/portal.php" } },

  // SISTEMAS
  { sigla: "SISTAFE", nome: "Sistema de Administração Financeira do Estado", funcao: "Base legal e operacional da gestão das finanças públicas (Lei n.º 14/2020).", categoria: "sistema", estado: "verificado", fonte: { label: "cedsif.gov.mz", url: "https://www.cedsif.gov.mz/cedsifportal/productos/" } },
  { sigla: "e-SISTAFE", nome: "e-SISTAFE", funcao: "Sistema informático que operacionaliza o SISTAFE: planificação, orçamento, execução, contabilidade e controlo.", categoria: "sistema", estado: "verificado", fonte: { label: "cedsif.gov.mz", url: "https://www.cedsif.gov.mz/cedsifportal/17-anos-do-e-sistafe/" } },

  // SUBSISTEMAS (Imprensa Nacional)
  { sigla: "SPO", nome: "Subsistema de Planeamento e Orçamento", funcao: "Integra planificação e orçamento no ciclo do PESOE.", categoria: "subsistema", estado: "verificado", fonte: { label: "Imprensa Nacional (26 Jul 2026)" } },
  { sigla: "SCP", nome: "Subsistema de Contabilidade Pública", funcao: "Registo contabilístico dos actos e factos da gestão pública.", categoria: "subsistema", estado: "verificado", fonte: { label: "Imprensa Nacional (26 Jul 2026)" } },
  { sigla: "STP", nome: "Subsistema do Tesouro Público", funcao: "Gere as disponibilidades financeiras e a CUT.", categoria: "subsistema", estado: "verificado", fonte: { label: "Imprensa Nacional (26 Jul 2026)" } },
  { sigla: "SAI", nome: "Subsistema de Auditoria Interna", funcao: "Controlo e auditoria interna da gestão financeira.", categoria: "subsistema", estado: "verificado", fonte: { label: "Imprensa Nacional (26 Jul 2026)" } },
  { sigla: "SMA", nome: "Sigla confirmada — significado por confirmar", funcao: "Subsistema do SISTAFE; o nome por extenso ainda não foi confirmado.", categoria: "subsistema", estado: "inconclusivo", fonte: { label: "Imprensa Nacional (26 Jul 2026)" } },

  // MÓDULOS e-SISTAFE
  { sigla: "MPO", nome: "Módulo de Planificação e Orçamentação", funcao: "Liga a planificação ao orçamento; apoia a elaboração do plano e do OE.", categoria: "modulo", estado: "verificado", fonte: { label: "cedsif.gov.mz", url: "https://www.cedsif.gov.mz/cedsifportal/productos/" } },
  { sigla: "MEX", nome: "Módulo de Execução", funcao: "Apoia a execução da despesa pública dentro do e-SISTAFE.", categoria: "modulo", estado: "verificado", fonte: { label: "cedsif.gov.mz", url: "https://www.cedsif.gov.mz/cedsifportal/productos/" } },
  { sigla: "MPE", nome: "Módulo de Gestão do Património do Estado", funcao: "Registo e gestão do património público.", categoria: "modulo", estado: "verificado", fonte: { label: "cedsif.gov.mz", url: "https://www.cedsif.gov.mz/cedsifportal/productos/" } },
  { sigla: "MDP", nome: "Módulo de Dívida Pública", funcao: "Gestão da dívida do Estado.", categoria: "modulo", estado: "verificado", fonte: { label: "cedsif.gov.mz", url: "https://www.cedsif.gov.mz/cedsifportal/productos/" } },
  { sigla: "MRR", nome: "Módulo de Receitas / Recolha de Recursos", funcao: "Gestão de entradas e receitas públicas.", categoria: "modulo", estado: "verificado", fonte: { label: "cedsif.gov.mz", url: "https://www.cedsif.gov.mz/cedsifportal/productos/" } },
  { sigla: "MAI", nome: "Módulo de Administração Interna", funcao: "Apoio à auditoria interna e rotinas administrativas.", categoria: "modulo", estado: "verificado", fonte: { label: "cedsif.gov.mz", url: "https://www.cedsif.gov.mz/cedsifportal/productos/" } },

  // INSTRUMENTOS
  { sigla: "PES", nome: "Plano Económico e Social", funcao: "Define metas e prioridades anuais do Governo.", categoria: "instrumento", estado: "verificado", fonte: { label: "mef.gov.mz", url: "https://www.mef.gov.mz/" } },
  { sigla: "OE", nome: "Orçamento do Estado", funcao: "Instrumento que autoriza a receita e a despesa pública.", categoria: "instrumento", estado: "verificado", fonte: { label: "mef.gov.mz", url: "https://www.mef.gov.mz/" } },
  { sigla: "PESOE", nome: "Plano Económico e Social e Orçamento do Estado", funcao: "Instrumento integrado que junta planificação e orçamento.", categoria: "instrumento", estado: "verificado", fonte: { label: "mef.gov.mz", url: "https://www.mef.gov.mz/" } },
  { sigla: "CBS", nome: "Catálogo de Bens e Serviços", funcao: "Registo centralizado de bens e serviços disponíveis para aquisição pelo Estado.", categoria: "instrumento", estado: "verificado", fonte: { label: "Confirmado pelo utilizador" } },
  { sigla: "CUT", nome: "Conta Única do Estado", funcao: "Centraliza todos os recursos do Estado (unidade de tesouraria).", categoria: "instrumento", estado: "verificado", fonte: { label: "Imprensa Nacional (26 Jul 2026)" } },

  // LEGISLAÇÃO
  { sigla: "Lei n.º 14/2020", nome: "Lei do SISTAFE", funcao: "Define os subsistemas e a CUT. Base do sistema financeiro público.", categoria: "legislacao", estado: "verificado", fonte: { label: "Boletim da República" } },
  { sigla: "Decreto n.º 79/2022", nome: "Regulamento de Contratação Pública", funcao: "Aprovado a 30 Dez 2022. Novo regime de contratação de obras, bens e serviços; reforça a contratação electrónica.", categoria: "legislacao", estado: "verificado", fonte: { label: "Imprensa Nacional (26 Jul 2026)" } },
  { sigla: "Decreto n.º 42/2018", nome: "Gestão Patrimonial", funcao: "Aprovado a 24 Jun 2018. Regulamenta a gestão patrimonial do Estado.", categoria: "legislacao", estado: "verificado", fonte: { label: "Imprensa Nacional (26 Jul 2026)" } },
  { sigla: "Lei n.º 4/2022", nome: "EGFAE — Estatuto Geral dos Funcionários e Agentes do Estado", funcao: "Regime da relação de trabalho entre o Estado e os seus funcionários.", categoria: "legislacao", estado: "verificado", fonte: { label: "maefp.gov.mz", url: "https://maefp.gov.mz/" } },

  // SIGNIFICADO OPERACIONAL (função prática; expansão literal varia conforme o manual)
  { sigla: "ACP", nome: "Função operacional: autorizar/verificar antes de comprometer", funcao: "Acto/controlo ligado ao cabimento ou autorização da despesa. A expansão literal da sigla varia conforme o manual/órgão — usar só a função, não o nome por extenso.", categoria: "instrumento", estado: "nao_verificado", fonte: { label: "Lógica prática — confirmar no manual do órgão" } },
  { sigla: "AGC", nome: "Função operacional: gerir o cabimento", funcao: "Ligado à gestão ou autorização do cabimento. A expansão literal varia conforme o manual/órgão — usar só a função.", categoria: "instrumento", estado: "nao_verificado", fonte: { label: "Lógica prática — confirmar no manual do órgão" } },
  { sigla: "CIPO", nome: "Função operacional: consultar/acompanhar o processo orçamental", funcao: "Sigla interna de consulta/controlo/informação de processos orçamentais. O circuito varia conforme a instituição — usar só a função.", categoria: "instrumento", estado: "nao_verificado", fonte: { label: "Lógica prática — confirmar no manual do órgão" } },
];

const CATEGORIAS = [
  { id: "todas", label: "Todas" },
  { id: "entidade", label: "Entidades" },
  { id: "sistema", label: "Sistemas" },
  { id: "subsistema", label: "Subsistemas" },
  { id: "modulo", label: "Módulos e-SISTAFE" },
  { id: "instrumento", label: "Instrumentos" },
  { id: "legislacao", label: "Legislação" },
] as const;

const ESTADO_UI = {
  verificado: { label: "✅", cls: "text-emerald-400" },
  nao_verificado: { label: "⚠️", cls: "text-amber-400" },
  inconclusivo: { label: "❓", cls: "text-rose-400" },
};

export default function SiglasPage() {
  const [cat, setCat] = useState<(typeof CATEGORIAS)[number]["id"]>("todas");
  const [busca, setBusca] = useState("");

  const filtradas = SIGLAS.filter(s =>
    (cat === "todas" || s.categoria === cat) &&
    (s.sigla.toLowerCase().includes(busca.toLowerCase()) || s.nome.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0a0d12] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-sky-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#0284c733_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-sky-300 via-cyan-400 to-sky-500">Glossário de Siglas</h1>
        <p className="relative z-10 mt-4 text-sky-200/70 max-w-2xl mx-auto">O ecossistema SISTAFE descodificado — com fontes citáveis. Nenhum significado inventado.</p>
        <p className="relative z-10 mt-1 text-xs text-slate-500">✅ verificado · ⚠️ não verificado · ❓ por confirmar</p>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Pesquisar sigla (ex: MPO, UFSA, CUT…)" className="w-full rounded-2xl bg-white/[0.04] border border-white/10 pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIAS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} className={`px-4 py-2 rounded-full text-xs font-bold transition ${cat === c.id ? "bg-sky-400 text-black shadow-lg shadow-sky-400/20" : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"}`}>{c.label}</button>
          ))}
        </div>

        <div className="space-y-3">
          {filtradas.map(s => {
            const e = ESTADO_UI[s.estado];
            return (
              <div key={s.sigla} className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 hover:border-sky-500/20 transition">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-[220px]">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-sky-300">{s.sigla}</h3>
                      <span className={`text-sm ${e.cls}`} title={s.estado}>{e.label}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-200 mt-0.5">{s.nome}</p>
                    <p className="text-xs text-slate-400 mt-1">{s.funcao}</p>
                  </div>
                  {s.fonte && (
                    s.fonte.url ? (
                      <a href={s.fonte.url} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[11px] font-semibold hover:bg-sky-500/20 transition">
                        {s.fonte.label} <ExternalLink size={11} />
                      </a>
                    ) : (
                      <span className="shrink-0 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[11px]">{s.fonte.label}</span>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtradas.length === 0 && (
          <p className="text-center text-slate-500 py-10">Nenhuma sigla encontrada para "{busca}".</p>
        )}

        <div className="rounded-2xl bg-amber-950/20 border border-amber-500/20 p-5 flex items-start gap-3">
          <HelpCircle className="text-amber-400 shrink-0 mt-0.5" size={18} />
          <p className="text-xs text-amber-100"><strong>Nota de rigor:</strong> as siglas ❓ (SMA, ACP/AGC, CIP/CIPO) foram confirmadas quanto à existência, mas o significado por extenso ainda não — não as expandas sem fonte. A antiga grafia "CEDECIF" foi corrigida para <strong>CEDSIF, IP</strong>.</p>
        </div>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Glossário · Fontes: cedsif.gov.mz · ufsa.gov.mz · mef.gov.mz · Imprensa Nacional</footer>
    </main>
  );
}
