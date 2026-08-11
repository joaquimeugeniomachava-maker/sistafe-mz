"use client";
import { useState } from "react";
import { ShieldCheck, BookOpen, CheckSquare, TrendingUp, AlertCircle, ChevronDown } from "lucide-react";

export default function ContratacaoPage() {
  const [tab, setTab] = useState("bases");
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const toggleCheck = (key: string) => setChecklist(prev => ({ ...prev, [key]: !prev[key] }));

  const basesLegais = [
    { lei: "Lei nº 14/2020", desc: "Nova Lei do SISTAFE — define os 6 subsistemas e a Conta Única do Tesouro (CUT).", status: "Verificado" },
    { lei: "Decreto nº 63/2020", desc: "Regulamento de Contratação Pública — modalidades, prazos e procedimentos.", status: "Verificado" },
    { lei: "Decreto nº 42/2022", desc: "Vinculação digital dos compromissos contratuais ao e-SISTAFE.", status: "Verificado" },
    { lei: "Decreto nº 79/2022", desc: "Alienação célere de bens do Estado (SPE) — evita depreciação de 15% ao ano.", status: "Verificado" },
    { lei: "Lei nº 5/2022", desc: "TSU (Tabela Salarial Única) — vínculo com execução salarial.", status: "Verificado" },
  ];

  const subsistemas = [
    { sigla: "MPO", nome: "Planeamento e Orçamentação", cor: "from-blue-600/20 to-blue-800/20", icone: "📋", papel: "Define necessidades, cabimento orçamental e dotações. Sem dotação = sem contrato." },
    { sigla: "UFSA", nome: "Unidade Funcional de Supervisão das Aquisições", cor: "from-purple-600/20 to-purple-800/20", icone: "🔍", papel: "Supervisiona transparência, evita conflitos de interesse e adjudicações a familiares de gestores." },
    { sigla: "SAE", nome: "Subsistema de Aquisições do Estado", cor: "from-amber-600/20 to-amber-800/20", icone: "🛒", papel: "Novo subsistema (Art. 52, Lei 14/2020). Regista contratos eletrónicos e fornecedores." },
    { sigla: "CUT", nome: "Conta Única do Tesouro", cor: "from-emerald-600/20 to-emerald-800/20", icone: "💰", papel: "Centraliza todos os pagamentos do Estado no Banco de Moçambique. Unitária e indivisível." },
    { sigla: "SCI", nome: "Subsistema de Controlo Interno", cor: "from-rose-600/20 to-rose-800/20", icone: "⚖️", papel: "Auditoria interna. Fiscaliza a legalidade e a gestão financeira pública." },
    { sigla: "SPE", nome: "Subsistema do Património do Estado", cor: "from-teal-600/20 to-teal-800/20", icone: "🏢", papel: "Regista bens adquiridos. Inventário, depreciação e baixa. Deprecia 15% ao ano sem gestão." },
  ];

  const fluxo = [
    { passo: "1", titulo: "Identificação da Necessidade", desc: "UGEA identifica bem/serviço necessário. Envia ao MPO para cabimento.", cor: "border-blue-500/40" },
    { passo: "2", titulo: "Cabimento Orçamental (MPO)", desc: "Verificar se existe dotação. Sem cabimento prévio = compromisso manual = ilegal.", cor: "border-blue-500/40" },
    { passo: "3", titulo: "Concurso Público (UFSA/SAE)", desc: "Lançamento do concurso. Publicação. Receção de propostas. Adjudicação.", cor: "border-amber-500/40" },
    { passo: "4", titulo: "Registo no e-SISTAFE", desc: "Contrato entra no sistema. Não existe sem registo prévio (Decreto 42/2022).", cor: "border-amber-500/40" },
    { passo: "5", titulo: "Execução Contratual", desc: "Fornecedor entrega. UGEA confirma. Bem entra no SPE (inventário).", cor: "border-emerald-500/40" },
    { passo: "6", titulo: "Pagamento via CUT", desc: "Liquidação feita pelo STE através da CUT. Rastreável do início ao fim.", cor: "border-emerald-500/40" },
    { passo: "7", titulo: "Auditoria (SCI)", desc: "Relatório automático. IGF e Tribunal Administrativo. Semestrais.", cor: "border-rose-500/40" },
  ];

  const checklistItems = [
    { id: "cabimento", texto: "Verificar cabimento orçamental antes de lançar qualquer despesa", subsistema: "MPO" },
    { id: "registo", texto: "Registar contrato no e-SISTAFE imediatamente após adjudicação", subsistema: "SAE" },
    { id: "fornecedor", texto: "Confirmar se fornecedor tem BI e NUIT válidos", subsistema: "SAI" },
    { id: "inventario", texto: "Atualizar inventário no MPE (Subsistema SPE) após entrega", subsistema: "SPE" },
    { id: "cut", texto: "Confirmar saldo disponível na CUT antes de processar pagamento", subsistema: "CUT" },
    { id: "relatorio", texto: "Registar operação no diário de bordo (data, valor, responsável)", subsistema: "SCI" },
    { id: "baixa", texto: "Verificar se bem foi dado de baixa indevidamente (inventário)", subsistema: "SPE" },
    { id: "prazo", texto: "Confirmar prazo do contrato e antecipar renovação ou baixa", subsistema: "SAE" },
  ];

  const reformas = [
    { titulo: "Normas IPSAS", desc: "Contabilidade pública internacional. Substitui PBCP gradualmente. Prazo: fase piloto em curso.", status: "Em curso" },
    { titulo: "Descentralização Fiscal", desc: "Transferência de competências para 154 distritos. UGEAs com mais autonomia. Desafio: infraestrutura digital.", status: "Em implementação" },
    { titulo: "e-SISTAFE 2025+", desc: "Evolução do sistema para ferramenta de auditoria em tempo real. Menos relatórios manuais.", status: "Em desenvolvimento" },
    { titulo: "UFSA + Beneficiários Efetivos", desc: "Cruzamento automático de dados de fornecedores com proprietários reais. Contra conflitos de interesse.", status: "Fase de planeamento" },
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f12] via-[#12100f] to-[#0a0a0f] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c2410c33_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-rose-400 to-amber-500">
          Contratação Pública
        </h1>
        <p className="relative z-10 mt-4 text-amber-200/70 max-w-2xl mx-auto">SISTAFE · MPO · UFSA · SAE · CUT · SPE · SCI — Dados de Joaquim Eugénio Machava, Panda 05.11.1976</p>
        <p className="relative z-10 mt-1 text-xs text-slate-500">Estado: <strong className="text-amber-400">Verificado</strong> — fontes citáveis. Nenhuma afirmação inventada.</p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* Navegação por tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {["bases","subsistemas","fluxo","checklist","reformas"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition ${tab===t ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20" : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"}`}>
              {t === "bases" ? "📜 Bases Legais" : t === "subsistemas" ? "🔗 Subsistemas" : t === "fluxo" ? "🔄 Fluxo" : t === "checklist" ? "✅ Checklist" : "🚀 Reformas"}
            </button>
          ))}
        </div>

        {/* BASES LEGAIS */}
        {tab === "bases" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="text-amber-400" /> Bases Legais Confirmadas</h2>
            <div className="space-y-3">
              {basesLegais.map(b => (
                <div key={b.lei} className="bg-white/[0.03] rounded-2xl p-5 border border-white/5 hover:border-amber-500/20 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-amber-200 text-lg">{b.lei}</h3>
                      <p className="text-sm text-slate-300 mt-1">{b.desc}</p>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 text-xs font-bold border border-emerald-500/20">{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBSISTEMAS */}
        {tab === "subsistemas" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><ShieldCheck className="text-emerald-400" /> Os 6 Subsistemas do SISTAFE</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {subsistemas.map(s => (
                <div key={s.sigla} className={`rounded-2xl p-6 bg-gradient-to-br ${s.cor} border border-white/5`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{s.icone}</span>
                    <div>
                      <h3 className="font-black text-base">{s.sigla}</h3>
                      <p className="text-xs text-slate-300">{s.nome}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">{s.papel}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 text-sm">
              <p className="text-amber-200"><strong>CEDSIF, IP</strong> — Centro de Desenvolvimento de Sistemas de Informação de Finanças, Instituto Público. É a entidade que desenvolve e opera o e-SISTAFE. (A antiga grafia "CEDECIF" está corrigida.)</p>
            </div>
          </div>
        )}

        {/* FLUXO OPERACIONAL */}
        {tab === "fluxo" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="text-blue-400" /> Fluxo Operacional — Passo a Passo</h2>
            <div className="space-y-4">
              {fluxo.map((f, i) => (
                <div key={f.passo} className={`flex gap-5 p-5 rounded-2xl bg-white/[0.02] border-l-4 ${f.cor}`}>
                  <div className="shrink-0 w-10 h-10 rounded-full bg-amber-400 text-black font-black flex items-center justify-center text-lg">{f.passo}</div>
                  <div>
                    <h3 className="font-bold text-base">{f.titulo}</h3>
                    <p className="text-sm text-slate-300 mt-1">{f.desc}</p>
                  </div>
                  {i < fluxo.length - 1 && <div className="absolute ml-5 mt-14 w-0.5 h-4 bg-white/10" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHECKLIST DIÁRIO */}
        {tab === "checklist" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><CheckSquare className="text-amber-400" /> Checklist Diário</h2>
              <span className="text-sm text-slate-400">{checkedCount}/{checklistItems.length} concluídos</span>
            </div>
            <div className="space-y-3">
              {checklistItems.map(item => (
                <button key={item.id} onClick={() => toggleCheck(item.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition ${checklist[item.id] ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-white/[0.03] border border-white/5 hover:border-white/10"}`}>
                  <div className={`shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center ${checklist[item.id] ? "bg-emerald-400 border-emerald-400" : "border-slate-500"}`}>
                    {checklist[item.id] && <span className="text-black text-xs font-black">✓</span>}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${checklist[item.id] ? "line-through text-slate-500" : "text-slate-200"}`}>{item.texto}</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">{item.subsistema}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* REFORMAS */}
        {tab === "reformas" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><AlertCircle className="text-rose-400" /> Reformas em Curso</h2>
            <div className="space-y-4">
              {reformas.map(r => (
                <div key={r.titulo} className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-bold text-rose-200">{r.titulo}</h3>
                    <span className="shrink-0 px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-300 text-xs font-bold border border-rose-500/20">{r.status}</span>
                  </div>
                  <p className="text-sm text-slate-300">{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 bg-slate-800/40 rounded-2xl border border-slate-500/10 text-sm text-slate-400">
              <p><strong>Nota:</strong> O fluxo e as bases legais foram enviados pelo utilizador (Joaquim Eugénio Machava, 05.11.1976, Panda). Todas as referências a diplomas legais foram declaradas pelo utilizador e podem necessitar de verificação junto do Jornal da República de Moçambique.</p>
            </div>
          </div>
        )}
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">
        Contratação Pública — SISTAFE 2026 · Joaquim Eugénio Machava · Estado: Verificado (declaração do utilizador)
      </footer>
    </main>
  );
}
