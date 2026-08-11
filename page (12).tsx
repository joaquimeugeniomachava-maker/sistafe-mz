"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle, HelpCircle, Tractor, FileText } from "lucide-react";

const CICLO = [
  { n: 1, titulo: "Ficha MPE", sub: "Mapa de Previsão de Execução", desc: "O início. Onde o plano das despesas se encontra — o mapa do tesouro. Contém o Plano de Actividades do Sector.", estado: "inconclusivo", nota: "MPE pode significar 'Mapa de Previsão de Execução' (orçamento) OU o módulo de 'Gestão do Património' do SPE. Confirmar qual se aplica." },
  { n: 2, titulo: "Planeamento da Actividade", sub: "Definir o quê e o porquê", desc: "Definir o que se vai comprar e porquê. Autorização do chefe da UGEA sobre a necessidade.", estado: "verificado" },
  { n: 3, titulo: "Requisição de Compra", sub: "O pedido formal", desc: "Preencher o formulário com especificações técnicas do bem ou serviço.", estado: "verificado" },
  { n: 4, titulo: "Cabimento Orçamental", sub: "Verificar se existe verba", desc: "Verificar na Ficha MPE / plano orçamental se há dotação disponível. Sem cabimento, não avança.", estado: "verificado" },
  { n: 5, titulo: "Procedimento de Contratação", sub: "Ajuste directo, concurso, etc.", desc: "Escolher a modalidade conforme o valor e a lei: ajuste directo, concurso público, etc.", estado: "nao_verificado", nota: "Limites exactos de cada modalidade por tipo de bem carecem de confirmação no diploma aplicável." },
  { n: 6, titulo: "Nota de Empenho", sub: "Reservar o dinheiro", desc: "O sector financeiro (UGEA) emite a Nota de Empenho, reservando a verba para a despesa.", estado: "verificado" },
  { n: 7, titulo: "Recebimento e Liquidação", sub: "Conferir e autorizar", desc: "Entrega do bem. O Agente de Execução Financeira (AEF) confere a mercadoria e autoriza o pagamento.", estado: "verificado" },
  { n: 8, titulo: "Pagamento", sub: "Ordem de pagamento", desc: "O AEF autoriza a saída do dinheiro via Ordem de Pagamento / liquidação, com registo rastreável.", estado: "verificado" },
];

const ESTADO_UI = {
  verificado: { label: "✅ Verificado", cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30", icone: <CheckCircle2 size={14} /> },
  nao_verificado: { label: "⚠️ Não verificado", cls: "bg-amber-500/10 text-amber-300 border-amber-500/30", icone: <AlertTriangle size={14} /> },
  inconclusivo: { label: "❓ A clarificar", cls: "bg-rose-500/10 text-rose-300 border-rose-500/30", icone: <HelpCircle size={14} /> },
};

const ALERTAS = [
  { titulo: "Decreto do Regulamento do SISTAFE", texto: "O prompt refere 'Decreto n.º 79/2020', mas fontes anteriores citavam 'Decreto n.º 79/2022' (alienação de bens/SPE). O número exacto e o ano precisam de confirmação na Imprensa Nacional antes de qualquer uso.", estado: "nao_verificado" },
  { titulo: "Decreto n.º 42 — gestão patrimonial", texto: "O prompt refere 'Decreto n.º 42/2018' para gestão patrimonial, mas fontes anteriores citavam 'Decreto n.º 42/2022' (vinculação digital de compromissos). São anos e assuntos diferentes — um deles está errado.", estado: "nao_verificado" },
  { titulo: "UFSA — Diplomas 261/2004 e 30/2017", texto: "Os diplomas que criam as Unidades Funcionais de Supervisão das Aquisições não foram confirmados nesta conversa. Não usar como citáveis até verificação.", estado: "nao_verificado" },
  { titulo: "'Manual de Execução Orçamental, pág. 33'", texto: "Referência específica não verificável sem o documento em mão. Marcar como não verificada até ter o manual físico/PDF.", estado: "nao_verificado" },
];

const PLC_PASSOS = [
  { n: 1, titulo: "Criar Proposta de Plano de Contratação", sigla: "ACP" },
  { n: 2, titulo: "Conformidade para Proposta do PLC", sigla: "AGC" },
  { n: 3, titulo: "Ajuste à Proposta de Plano de Contratação", sigla: "ACP" },
  { n: 4, titulo: "Conformidade para Proposta do PLC", sigla: "AGC" },
  { n: 5, titulo: "Criar Plano de Contratação", sigla: "ACP" },
  { n: 6, titulo: "Conformidade do Plano de Contratação", sigla: "AGC" },
  { n: 7, titulo: "Criar Plano de Contratação Efetivo", sigla: "ACP" },
];

const MEX_FLUXO = [
  { n: 1, titulo: "Plano de contratação", modulo: "MPO" },
  { n: 2, titulo: "Orçamento de tesouraria", modulo: "MPO" },
  { n: 3, titulo: "Gestão de concurso", modulo: "MEX" },
  { n: 4, titulo: "Cativo do valor", modulo: "MEX" },
  { n: 5, titulo: "Programação financeira", modulo: "MEX" },
  { n: 6, titulo: "Cabimentação", modulo: "MEX" },
  { n: 7, titulo: "Receber e aceitar bens / serviços", modulo: "MEX" },
  { n: 8, titulo: "Liquidação", modulo: "MEX" },
  { n: 9, titulo: "Incorporar e liquidar bens / serviços", modulo: "MPE" },
  { n: 10, titulo: "Pagamento", modulo: "MEX" },
  { n: 11, titulo: "Gestão patrimonial", modulo: "MPE" },
];

const ENTIDADES = [
  { sigla: "CUT", nome: "Conta Única do Estado", estado: "verificado" },
  { sigla: "CEDSIF IP", nome: "Entidade gestora do e-SISTAFE", estado: "verificado" },
  { sigla: "e-SISTAFE", nome: "Sistema electrónico do SISTAFE", estado: "verificado" },
  { sigla: "CIP / CIPO", nome: "Sigla referida — significado por confirmar", estado: "inconclusivo" },
  { sigla: "ACP / AGC", nome: "Papéis do perfil do Plano de Contratação — significado por confirmar", estado: "inconclusivo" },
];

export default function CicloPage() {
  const [fase, setFase] = useState<"ciclo" | "mex" | "plc" | "trator" | "alertas">("ciclo");

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0f0a] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-lime-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#65a30d33_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-lime-300 via-emerald-400 to-lime-500">
          Ciclo de Compras Públicas
        </h1>
        <p className="relative z-10 mt-4 text-lime-200/70 max-w-2xl mx-auto">Da Ficha MPE até à liquidação — o roteiro completo, explicado como no campo.</p>
        <p className="relative z-10 mt-1 text-xs text-slate-500">JUSLEX V2.0 · Estados de confiança aplicados · Nenhuma invenção.</p>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {([["ciclo", "Os 8 Passos"], ["mex", "Fluxo MEX (11)"], ["plc", "Plano de Contratação"], ["trator", "Exemplo: Trator"], ["alertas", "⚠️ Alertas de Rigor"]] as const).map(([id, label]) => (
            <button key={id} onClick={() => setFase(id)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition ${fase === id ? "bg-lime-400 text-black shadow-lg shadow-lime-400/20" : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"}`}>{label}</button>
          ))}
        </div>

        {fase === "ciclo" && (
          <div className="space-y-3">
            {CICLO.map((c, i) => {
              const e = ESTADO_UI[c.estado as keyof typeof ESTADO_UI];
              return (
                <div key={c.n} className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-9 h-9 rounded-full bg-lime-400 text-black font-black flex items-center justify-center">{c.n}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="font-bold">{c.titulo}</h3>
                          <p className="text-xs text-lime-300/80">{c.sub}</p>
                        </div>
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${e.cls}`}>{e.icone}{e.label}</span>
                      </div>
                      <p className="text-sm text-slate-300 mt-2">{c.desc}</p>
                      {c.nota && <p className="text-xs text-amber-200 bg-amber-500/5 border border-amber-500/20 rounded-lg p-2 mt-2">{c.nota}</p>}
                    </div>
                  </div>
                  {i < CICLO.length - 1 && <div className="ml-4 mt-3 text-lime-500/40"><ArrowRight size={16} className="rotate-90" /></div>}
                </div>
              );
            })}
          </div>
        )}

        {fase === "mex" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-r from-sky-900/20 to-cyan-900/20 border border-sky-500/20 p-6">
              <h3 className="font-black text-sky-300 mb-1">🔁 Fluxo Operacional MEX / MPO / MPE</h3>
              <p className="text-sm text-slate-300">Os 11 passos do ciclo de execução no e-SISTAFE. MPO = planificação e orçamento · MEX = execução · MPE = património.</p>
            </div>
            <div className="space-y-3">
              {MEX_FLUXO.map(m => (
                <div key={m.n} className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 flex items-center gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-sky-400 text-black font-black flex items-center justify-center text-sm">{m.n}</div>
                  <p className="flex-1 text-sm font-medium">{m.titulo}</p>
                  <span className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-black border ${m.modulo === "MPO" ? "bg-blue-500/10 text-blue-300 border-blue-500/30" : m.modulo === "MPE" ? "bg-teal-500/10 text-teal-300 border-teal-500/30" : "bg-sky-500/10 text-sky-300 border-sky-500/30"}`}>{m.modulo}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">Planificação gera prioridade (MPO) · orçamento dá o dinheiro · execução transforma o plano em compra real (MEX) · património regista o bem (MPE). Se a planificação falha, o orçamento dispersa; se a execução falha, o dinheiro anda mas o resultado não aparece.</p>
          </div>
        )}

        {fase === "plc" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-r from-lime-900/20 to-emerald-900/20 border border-lime-500/20 p-6">
              <h3 className="font-black text-lime-300 mb-1">📑 Perfil do Plano de Contratação (PLC)</h3>
              <p className="text-sm text-slate-300">Os 7 passos confirmados na Imprensa Nacional (26 Jul 2026), com o padrão de papéis ACP / AGC.</p>
            </div>

            <div className="space-y-3">
              {PLC_PASSOS.map((p, i) => (
                <div key={p.n} className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 flex items-center gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-lime-400 text-black font-black flex items-center justify-center">{p.n}</div>
                  <p className="flex-1 text-sm font-medium">{p.titulo}</p>
                  <span className="shrink-0 px-2.5 py-1 rounded-md text-xs font-black bg-rose-500/10 text-rose-300 border border-rose-500/30">{p.sigla}</span>
                  {i < PLC_PASSOS.length - 1 && null}
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
              <h4 className="font-bold text-lime-300 mb-2">🏛 Entidades e siglas confirmadas</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {ENTIDADES.map(e => {
                  const ui = ESTADO_UI[e.estado as keyof typeof ESTADO_UI];
                  return (
                    <div key={e.sigla} className="flex items-start justify-between gap-2 rounded-xl bg-black/20 border border-white/5 p-3">
                      <div>
                        <p className="font-bold text-sm">{e.sigla}</p>
                        <p className="text-xs text-slate-400">{e.nome}</p>
                      </div>
                      <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold border ${ui.cls}`}>{ui.label}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-amber-200 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 mt-3">❓ Os significados de <strong>ACP</strong>, <strong>AGC</strong>, <strong>CIP/CIPO</strong> e <strong>SMA</strong> ainda não foram confirmados — só as siglas e o padrão do fluxo. Não os expandas sem fonte.</p>
            </div>
          </div>
        )}

        {fase === "trator" && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-r from-lime-900/20 to-emerald-900/20 border border-lime-500/20 p-6 flex items-center gap-3">
              <Tractor className="text-lime-400" size={32} />
              <p className="font-bold text-lime-200">Roteiro prático: como uma UGEA compra um trator, explicado no campo.</p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6">
              <h3 className="font-black text-lime-300 mb-4">📋 FASE 1 — Planeamento e Preparação</h3>
              <ol className="space-y-3 text-sm text-slate-200">
                <li className="flex gap-3"><span className="font-black text-lime-400">1.</span><span><strong>Ficha MPE:</strong> verifica onde consta o Plano de Actividades do Sector — é o mapa do tesouro. <em className="text-amber-300">(❓ confirmar se é o Mapa de Previsão de Execução)</em></span></li>
                <li className="flex gap-3"><span className="font-black text-lime-400">2.</span><span><strong>Autorização:</strong> o chefe da UGEA (posto ou distrito) autoriza a necessidade do trator.</span></li>
              </ol>
              <p className="text-xs text-amber-200 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 mt-4">⚠️ Incerteza: o limite exacto para Ajuste Directo de equipamentos agrícolas precisa de confirmação no regulamento aplicável.</p>
              <p className="text-xs text-lime-300 mt-3">🔧 Próximo passo: abrir a Requisição de Compra no e-SISTAFE (funciona offline).</p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6">
              <h3 className="font-black text-emerald-300 mb-4">💰 FASE 2 — Execução e Pagamento</h3>
              <ol className="space-y-3 text-sm text-slate-200">
                <li className="flex gap-3"><span className="font-black text-emerald-400">3.</span><span><strong>Requisição:</strong> preencher o formulário com as especificações técnicas do trator.</span></li>
                <li className="flex gap-3"><span className="font-black text-emerald-400">4.</span><span><strong>Cabimento:</strong> confirmar na Ficha MPE que há verba para o trator.</span></li>
                <li className="flex gap-3"><span className="font-black text-emerald-400">5.</span><span><strong>Empenho:</strong> o sector financeiro (UGEA) emite a Nota de Empenho — reserva o dinheiro.</span></li>
                <li className="flex gap-3"><span className="font-black text-emerald-400">6.</span><span><strong>Liquidação:</strong> o trator é entregue; o Agente de Execução Financeira confere e assina.</span></li>
                <li className="flex gap-3"><span className="font-black text-emerald-400">7.</span><span><strong>Pagamento:</strong> o AEF autoriza a saída do dinheiro no sistema.</span></li>
              </ol>
            </div>
          </div>
        )}

        {fase === "alertas" && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-amber-950/20 border border-amber-500/30 p-5 flex items-start gap-3">
              <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-amber-100">O próprio Prompt Master exige: <strong>nenhuma afirmação é ✅ sem fonte citável</strong>. As referências abaixo vieram do JUSLEX V2.0 mas <strong>não puderam ser confirmadas</strong> — por isso ficam ⚠️. Corrigi-las antes de usar evita a "ferida" (inventar decretos).</p>
            </div>
            {ALERTAS.map(a => (
              <div key={a.titulo} className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-amber-200 text-sm">{a.titulo}</h3>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">⚠️ Não verificado</span>
                </div>
                <p className="text-xs text-slate-400">{a.texto}</p>
              </div>
            ))}
            <p className="text-xs text-slate-500 flex items-center gap-2"><FileText size={14} /> O que está ✅ (Lei 14/2020 e a estrutura geral do ciclo) mantém-se; o resto aguarda confirmação na Imprensa Nacional.</p>
          </div>
        )}
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Ciclo de Compras · JUSLEX V2.0 · Joaquim Eugénio Machava</footer>
    </main>
  );
}
