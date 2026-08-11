"use client";
import { useState } from "react";
import { Scale, ExternalLink, CheckCircle2, AlertTriangle, Landmark, Users, ShoppingCart } from "lucide-react";

interface Diploma {
  tipo: "constituicao" | "egfae" | "contratacao";
  nome: string;
  numero: string;
  data: string;
  descricao: string;
  estado: "verificado" | "nao_verificado";
  fontes: { label: string; url?: string }[];
  nota?: string;
}

const DIPLOMAS: Diploma[] = [
  {
    tipo: "constituicao",
    nome: "Constituição da República de Moçambique",
    numero: "CRM 2004",
    data: "Publicada no BR em 22 de Dezembro de 2004 · Vigência 20 de Janeiro de 2005",
    descricao: "Lei fundamental do Estado. 306 artigos, 17 títulos. Define princípios do Estado de Direito Democrático, direitos fundamentais, organização dos poderes e finanças públicas.",
    estado: "verificado",
    fontes: [{ label: "SciELO — Constitucionalismo de Moçambique" }, { label: "Boletim da República (Imprensa Nacional)" }],
  },
  {
    tipo: "constituicao",
    nome: "Revisão Pontual da Constituição",
    numero: "Lei n.º 1/2018",
    data: "12 de Junho de 2018 · BR I Série, n.º 115",
    descricao: "Revisão pontual da CRM para ajustá-la à consolidação da reforma democrática, democracia participativa e garantia da paz.",
    estado: "verificado",
    fontes: [{ label: "FAOLEX — PDF oficial (Lei 1/2018)", url: "https://faolex.fao.org/docs/pdf/moz117331POR.pdf" }],
  },
  {
    tipo: "egfae",
    nome: "Estatuto Geral dos Funcionários e Agentes do Estado (EGFAE) — VIGENTE",
    numero: "Lei n.º 4/2022",
    data: "11 de Fevereiro de 2022 · BR n.º 116 · Promulgada em 12 de Janeiro de 2022",
    descricao: "Aprova o NOVO EGFAE e revoga a Lei n.º 10/2017. Estabelece as normas da relação de trabalho entre o Estado e os seus funcionários e agentes. Entra em vigor 180 dias após publicação.",
    estado: "verificado",
    fontes: [{ label: "MAEFP — PDF oficial (Lei 4/2022)", url: "https://maefp.gov.mz/wp-content/uploads/2025/04/Lei-4_2022_11_Fevereiro-Novo-EGFAE-2022.pdf" }],
    nota: "Linhagem: Lei 14/2009 → Lei 10/2017 → Lei 4/2022 (actual).",
  },
  {
    tipo: "egfae",
    nome: "Regulamento do EGFAE (REGFAE)",
    numero: "Decreto n.º 28/2022",
    data: "BR n.º 116 · Revoga o Decreto n.º 5/2018, de 26 de Fevereiro",
    descricao: "Aprova o Regulamento do EGFAE. Regulamenta a Lei n.º 4/2022. Define procedimentos de nomeação, promoção, transferência e regime disciplinar.",
    estado: "verificado",
    fontes: [{ label: "Referência BR n.º 116 · Conselho de Ministros" }],
    nota: "⚠️ CORRECÇÃO: Não existe 'Lei 28/2022' sobre funcionários. O diploma correcto é o DECRETO n.º 28/2022 (Regulamento), que regulamenta a LEI n.º 4/2022 (Estatuto).",
  },
  {
    tipo: "contratacao",
    nome: "Lei do SISTAFE",
    numero: "Lei n.º 14/2020",
    data: "23 de Dezembro de 2020",
    descricao: "Nova lei do Sistema de Administração Financeira do Estado. Define os 6 subsistemas (SPO, STE, SCP, SPE, SCI, SAE) e a Conta Única do Tesouro (CUT).",
    estado: "verificado",
    fontes: [{ label: "Confirmada na base de conhecimento do utilizador · citável no BR" }],
  },
  {
    tipo: "contratacao",
    nome: "Regulamento de Contratação Pública",
    numero: "Decreto n.º 63/2020",
    data: "Referenciado pelo utilizador",
    descricao: "Regulamenta os processos de contratação pública: modalidades de concurso, prazos e procedimentos.",
    estado: "nao_verificado",
    fontes: [{ label: "A confirmar no Boletim da República / inBR1" }],
    nota: "Referenciado pelo utilizador e em uso corrente; obter texto integral no BR para citação exacta.",
  },
  {
    tipo: "contratacao",
    nome: "Regulamento do SISTAFE",
    numero: "Decreto n.º 79/2022",
    data: "30 de Dezembro de 2022 · Confirmado na Imprensa Nacional",
    descricao: "Define as normas de execução do SISTAFE e as responsabilidades dos Agentes de Execução Financeira.",
    estado: "verificado",
    fontes: [{ label: "Imprensa Nacional — confirmado pelo utilizador (26 Jul 2026)" }],
    nota: "✅ RESOLVIDO: é 79/2022, de 30 de Dezembro. O '79/2020' do JUSLEX V2.0 estava errado.",
  },
  {
    tipo: "contratacao",
    nome: "Gestão Patrimonial",
    numero: "Decreto n.º 42/2018",
    data: "24 de Junho de 2018 · Confirmado na Imprensa Nacional",
    descricao: "Regulamenta aspectos específicos da gestão patrimonial do Estado.",
    estado: "verificado",
    fontes: [{ label: "Imprensa Nacional — confirmado pelo utilizador (26 Jul 2026)" }],
    nota: "✅ RESOLVIDO: é 42/2018, de 24 de Junho (patrimonial). A referência anterior a '42/2022' estava errada para este assunto.",
  },
  {
    tipo: "contratacao",
    nome: "Subsistemas do SISTAFE — siglas oficiais",
    numero: "SPO · SCP · STP · SMA · SAI",
    data: "Confirmadas na Imprensa Nacional (26 Jul 2026)",
    descricao: "SPO = Planeamento e Orçamento · SCP = Contabilidade Pública · STP = Tesouro Público (CUT) · SAI = Auditoria Interna. CUT = Conta Única do Estado.",
    estado: "verificado",
    fontes: [{ label: "Imprensa Nacional — confirmado pelo utilizador (26 Jul 2026)" }],
    nota: "❓ SMA — sigla confirmada, mas o significado por extenso ainda não foi confirmado. As siglas antigas STE/SCI foram substituídas por STP/SAI.",
  },
  {
    tipo: "contratacao",
    nome: "UFSA — Unidades Funcionais de Supervisão das Aquisições",
    numero: "Diplomas 261/2004 e 30/2017",
    data: "Referenciado no JUSLEX V2.0",
    descricao: "Estrutura em três níveis: Supervisão (define políticas), Intermédias (coordenam) e Executoras — UGEA, CEDSIF IP, etc. (executam a gestão financeira).",
    estado: "nao_verificado",
    fontes: [{ label: "Sigla confirmada · números dos diplomas a confirmar" }],
    nota: "⚠️ A sigla UFSA foi confirmada na Imprensa Nacional (26 Jul 2026), mas os números dos diplomas (261/2004 e 30/2017) ainda carecem de confirmação.",
  },
];

const PORTAIS = [
  { nome: "Imprensa Nacional de Moçambique", desc: "Editora oficial do Boletim da República, em Maputo.", url: "https://www.inm.gov.mz", estado: "verificado" },
  { nome: "Portal do Governo — Boletins da República", desc: "Arquivo oficial dos Boletins da República.", url: "https://www.portaldogoverno.gov.mz/por/Governo/Legislacao/Boletins-da-Republica", estado: "verificado" },
  { nome: "inBR1 — Legislação Moçambicana Online", desc: "Base de dados da I Série do BR desde 25 de Junho de 1975.", url: "https://inbr1mz.com", estado: "verificado" },
];

const ESTADO_UI = {
  verificado: { label: "✅ Verificado", cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
  nao_verificado: { label: "⚠️ Não verificado", cls: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
};

const TABS = [
  { id: "constituicao", label: "Constituição", icone: <Landmark size={16} /> },
  { id: "egfae", label: "EGFAE — Funcionários", icone: <Users size={16} /> },
  { id: "contratacao", label: "Contratação & SISTAFE", icone: <ShoppingCart size={16} /> },
] as const;

export default function LegislacaoPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("constituicao");
  const filtrados = DIPLOMAS.filter(d => d.tipo === tab);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0a0f0d] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-emerald-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#05966933_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-emerald-300 via-teal-400 to-emerald-500">
          Base Jurídica
        </h1>
        <p className="relative z-10 mt-4 text-emerald-200/70 max-w-2xl mx-auto">Constituição · EGFAE · Contratação Pública — pesquisado na Imprensa Nacional / Boletim da República.</p>
        <p className="relative z-10 mt-1 text-xs text-slate-500">Fontes citáveis · Estados de confiança · Nenhuma invenção.</p>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition ${tab === t.id ? "bg-emerald-400 text-black shadow-lg shadow-emerald-400/20" : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"}`}>
              {t.icone}{t.label}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {filtrados.map(d => {
            const e = ESTADO_UI[d.estado];
            return (
              <div key={d.numero} className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 space-y-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-xs font-bold text-emerald-400">{d.numero} · {d.data}</p>
                    <h2 className="text-lg font-bold mt-1">{d.nome}</h2>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${e.cls}`}>{e.label}</span>
                </div>
                <p className="text-sm text-slate-300">{d.descricao}</p>
                {d.nota && <p className="text-xs text-amber-200 bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">{d.nota}</p>}
                <div className="flex flex-wrap gap-2 pt-1">
                  {d.fontes.map(f => (
                    f.url ? (
                      <a key={f.label} href={f.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/20 transition">
                        {f.label} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span key={f.label} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs">{f.label}</span>
                    )
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Portais oficiais */}
        <div>
          <h2 className="text-xl font-black mb-4 flex items-center gap-2"><Scale className="text-emerald-400" size={22} /> Portais Oficiais — Imprensa Nacional & Boletim da República</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {PORTAIS.map(p => (
              <a key={p.nome} href={p.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-emerald-950/20 border border-emerald-500/20 p-5 hover:border-emerald-400/40 transition group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">🇲🇿</span>
                  <ExternalLink size={16} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <h3 className="font-bold text-emerald-200 text-sm">{p.nome}</h3>
                <p className="text-xs text-slate-400 mt-1">{p.desc}</p>
              </a>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4 flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Todos os portais confirmados como fontes oficiais do Boletim da República.</p>
        </div>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Base Jurídica · Imprensa Nacional de Moçambique · Joaquim Eugénio Machava</footer>
    </main>
  );
}
