"use client";
import { useState } from "react";
import { BookOpen, ShoppingCart, FileText, Download, ChevronRight, CheckCircle2, AlertTriangle } from "lucide-react";

export default function ManuaisPage() {
  const [activeTab, setActiveTab] = useState("cbs");
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setChecklist(p => ({ ...p, [k]: !p[k] }));

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0d0a] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c2410c33_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-rose-400 to-amber-500">
          Manuais de Formação
        </h1>
        <p className="relative z-10 mt-4 text-amber-200/70 max-w-2xl mx-auto">
          CBS · Requisição de Compra · e-SISTAFE — O que não ensinam na formação.
        </p>
        <p className="relative z-10 mt-1 text-xs text-slate-500">
          Estado: <strong className="text-amber-400">Não verificado</strong> — baseado em informação do utilizador. Precisam de confirmação com o CEDSIF IP.
        </p>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Documentos Oficiais */}
        <section className="rounded-3xl bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-emerald-400" size={28} />
            <h2 className="text-2xl font-black">Documentos Oficiais — República de Moçambique</h2>
          </div>
          <p className="text-sm text-slate-300 mb-6">Fontes primárias. Tudo o que está aqui deve ser verificado no Journal da República. Estes são os documentos que sustentam qualquer operação no e-SISTAFE.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#0f0f12] rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🇲🇿</span>
                <div>
                  <h4 className="font-bold text-emerald-200">Constituição da República</h4>
                  <p className="text-xs text-slate-400">CRM 2004 · Revisão Lei nº 1/2018</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-3">306 artigos, 17 títulos. Base do ordenamento jurídico. Finanças públicas, propriedade do Estado e direitos dos cidadãos.</p>
              <a href="/legislacao" className="inline-block text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md hover:bg-emerald-500/20 transition">✅ Verificado · Ver base jurídica</a>
            </div>
            <div className="bg-[#0f0f12] rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📋</span>
                <div>
                  <h4 className="font-bold text-emerald-200">Estatuto Geral dos Funcionários (EGFAE)</h4>
                  <p className="text-xs text-slate-400">Lei nº 4/2022 + Decreto nº 28/2022 (REGFAE)</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-3">Lei nº 4/2022 (11 Fev) aprova o novo EGFAE; Decreto nº 28/2022 regulamenta. Direitos, deveres, carreiras e regime disciplinar.</p>
              <a href="/legislacao" className="inline-block text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md hover:bg-emerald-500/20 transition">✅ Verificado · Ver base jurídica</a>
            </div>
            <div className="bg-[#0f0f12] rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">⚖️</span>
                <div>
                  <h4 className="font-bold text-emerald-200">Código de Contratação Pública</h4>
                  <p className="text-xs text-slate-400">Decreto nº 63/2020</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-3">Modalidades de concurso, prazos, critérios de adjudicação e execução contratual. Base legal das aquisições públicas.</p>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">Disponível offline</span>
            </div>
            <div className="bg-[#0f0f12] rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">💰</span>
                <div>
                  <h4 className="font-bold text-emerald-200">Lei do SISTAFE</h4>
                  <p className="text-xs text-slate-400">Lei nº 14/2020</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-3">Os 6 subsistemas, CUT, regras de execução orçamental e responsabilidadé fiscal. A base de tudo.</p>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">Disponível offline</span>
            </div>
          </div>
        </section>

        {/* CBS — Catálogo de Bens e Serviços */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="text-amber-400" size={28} />
            <h2 className="text-2xl font-black">CBS — Caixa Bibliográfica do SISTAFE</h2>
          </div>
          <p className="text-sm text-slate-400 mb-6">Módulo de consulta e arquivo de documentos no e-SISTAFE. Muitos operadores saem da formação sem saber usar correctamente.</p>

          <div className="space-y-4">
            <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
              <h3 className="font-bold text-amber-200 mb-3">📥 CBS — Catálogo de Bens e Serviços</h3>
              <p className="text-sm text-slate-300 mb-4">O <strong>CBS (Catálogo de Bens e Serviços)</strong> é o registo centralizado de todos os bens e serviços disponíveis para aquisição pelo Estado. Cada item tem um código, descrição, unidade de medida e preço de referência. Sem item no CBS, não há requisição de compra válida no e-SISTAFE.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">e-SISTAFE</span>
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-500/20">CEDSIF IP</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">DNO</span>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
              <h3 className="font-bold text-amber-200 mb-3">🔍 Como Pesquisar no CBS (Catálogo)</h3>
              <ol className="space-y-3 text-sm text-slate-200">
                <li className="flex gap-3"><span className="font-black text-amber-400 shrink-0">01.</span> Aceder ao e-SISTAFE → Menu de Aquisições → CBS</li>
                <li className="flex gap-3"><span className="font-black text-amber-400 shrink-0">02.</span> Procurar por código do item, descrição ou categoria (ex: "material de escritório", "combustível")</li>
                <li className="flex gap-3"><span className="font-black text-amber-400 shrink-0">03.</span> Verificar se o item existe no catálogo antes de requisição</li>
                <li className="flex gap-3"><span className="font-black text-amber-400 shrink-0">04.</span> Confirmar unidade de medida e preço de referência</li>
                <li className="flex gap-3"><span className="font-black text-amber-400 shrink-0">05.</span> Se item não existe → solicitar inclusão ao UFSA antes de comprar</li>
              </ol>
            </div>

            <div className="bg-amber-500/5 rounded-2xl p-5 border border-amber-500/10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-amber-200 font-bold mb-1">Problema real: CBS mal usada = requisição bloqueada</p>
                  <p className="text-xs text-slate-400">Muitos operadores tentam comprar itens que não estão no catálogo. Sem item no CBS, o sistema não permite avançar. Este é o erro nº 1 que bloqueia aquisições no e-SISTAFE.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requisição de Compra */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <ShoppingCart className="text-rose-400" size={28} />
            <h2 className="text-2xl font-black">Requisição de Compra — Passo a Passo</h2>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {["passo-a-passo","diagrama","erros-comuns","checklist"].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab===t ? "bg-rose-400 text-black" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>
                {t === "passo-a-passo" ? "Passo a Passo" : t === "diagrama" ? "Diagrama" : t === "erros-comuns" ? "Erros Comuns" : "Checklist"}
              </button>
            ))}
          </div>

          {activeTab === "passo-a-passo" && (
            <div className="space-y-3">
              {[
                { passo: "1", titulo: "UGEA identifica a necessidade", desc: "O serviço ou departamento identifica que necessita de um bem ou serviço. Justifica a necessidade com base no plano de actividades.", cor: "border-blue-500/30" },
                { passo: "2", titulo: "Verificação do cabimento (MPO)", desc: "Antes de qualquer compra, o MPO confirma se existe dotação orçamental disponível. Sem cabimento, a requisição não avança.", cor: "border-blue-500/30" },
                { passo: "3", titulo: "Elaboração da Requisição de Compra", desc: "Preenche o formulário de requisição no e-SISTAFE (módulo de aquisições). Inclui: descrição, quantidade, preço estimado, fornecedor pretendido.", cor: "border-amber-500/30" },
                { passo: "4", titulo: "Aprovação do Gestor da UGEA", desc: "O chefe da UGEA aprova a requisição. Assinatura digital no sistema. Sem aprovação, não há contrato.", cor: "border-amber-500/30" },
                { passo: "5", titulo: "Processo de Contratação (UFSA/SAE)", desc: "A requisição approveda segue para o processo de concurso público ou contratação directa (conforme o valor). O SAE regista todo o processo no e-SISTAFE.", cor: "border-purple-500/30" },
                { passo: "6", titulo: "Adjudicação e Contrato", desc: "Fornecedor seleccionado. Contrato assinado. Registo no e-SISTAFE. Nenhum pagamento sem contrato registado (Decreto 42/2022).", cor: "border-purple-500/30" },
                { passo: "7", titulo: "Receção e Conformidade", desc: "UGEA recebe o bem/serviço. Confirma conformidade. Actualiza inventário no SPE (MPE).", cor: "border-emerald-500/30" },
                { passo: "8", titulo: "Pagamento via CUT", desc: "STE processa o pagamento através da Conta Única do Tesouro. Liquidação completa e rastreável.", cor: "border-emerald-500/30" },
              ].map(f => (
                <div key={f.passo} className={`flex gap-4 p-4 rounded-2xl bg-white/[0.02] border-l-4 ${f.cor}`}>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-amber-400 text-black font-black flex items-center justify-center text-sm">{f.passo}</div>
                  <div>
                    <h4 className="font-bold text-sm">{f.titulo}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "diagrama" && (
            <div className="bg-[#0f0f12] rounded-2xl border border-white/5 p-6 font-mono text-xs leading-7 space-y-1">
              <p className="text-amber-300">[INÍCIO] Necessidade identificada pela UGEA</p>
              <p className="text-slate-500">↓</p>
              <p className="text-blue-300">[MPO] Verificar cabimento orçamental</p>
              <p className="text-slate-500">↓</p>
              <p className="text-red-400">[SEM CABIMENTO] → Requisição bloqueada. Fim.</p>
              <p className="text-emerald-400">[COM CABIMENTO] → Avança</p>
              <p className="text-slate-500">↓</p>
              <p className="text-amber-300">[SAE] Elaborar requisição no e-SISTAFE</p>
              <p className="text-slate-500">↓</p>
              <p className="text-amber-300">[UFSA] Aprovação do gestor + processo de contratação</p>
              <p className="text-slate-500">↓</p>
              <p className="text-purple-300">[e-SISTAFE] Registo do contrato (obrigatório)</p>
              <p className="text-slate-500">↓</p>
              <p className="text-emerald-300">[SPE] Receção + actualização do inventário</p>
              <p className="text-slate-500">↓</p>
              <p className="text-emerald-300">[STE + CUT] Pagamento liquidado</p>
              <p className="text-slate-500">↓</p>
              <p className="text-rose-300">[SCI] Auditoria e relatório</p>
              <p className="text-slate-500">↓</p>
              <p className="text-amber-300">[FIM] Ciclo completo</p>
            </div>
          )}

          {activeTab === "erros-comuns" && (
            <div className="space-y-3">
              {[
                { erro: "Comprar sem cabimento prévio", consequence: "Compromisso manual — ilegal (Art. 14, Lei 14/2020)", freq: "Muito frequente" },
                { erro: "Não registar contrato no e-SISTAFE", consequence: "Nulidade do contrato — pagamento bloqueado pelo Decreto 42/2022", freq: "Frequente" },
                { erro: "Fornecedor sem NUIT válido", consequence: "Registo não valida — risco de sanção pela IGF", freq: "Frequente" },
                { erro: "Não actualizar inventário (SPE)", consequence: "Bem dado como desaparecido — responsável responde", freq: "Muito frequente" },
                { erro: "Valor acima do cabimento sem reprogramação", consequence: "Execução irregular — Tribunal Administrativo", freq: "Médio" },
                { erro: "Assinar fora do sistema (papel)", consequence: "Compromisso manual — passivo oculto", freq: "Frequente" },
              ].map(e => (
                <div key={e.erro} className="bg-red-950/20 rounded-2xl p-4 border border-red-500/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-red-200 text-sm">{e.erro}</p>
                      <p className="text-xs text-slate-400 mt-1">Consequência: {e.consequence}</p>
                    </div>
                    <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-md bg-red-500/10 text-red-300 border border-red-500/20">{e.freq}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "checklist" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Checklist do Operador — Antes de Processar Requisição</h3>
                <span className="text-xs text-slate-400">{checkedCount}/8</span>
              </div>
              <div className="space-y-2">
                {[
                  { id: "c1", texto: "Verifiquei o cabimento orçamental no MPO", tag: "MPO" },
                  { id: "c2", texto: "O fornecedor tem BI e NUIT válidos", tag: "SAI" },
                  { id: "c3", texto: "A requisição está preenchida com todos os campos", tag: "SAE" },
                  { id: "c4", texto: "O gestor da UGEA aprovou no sistema", tag: "UFSA" },
                  { id: "c5", texto: "O processo está no e-SISTAFE (não em papel)", tag: "SAE" },
                  { id: "c6", texto: "O valor não ultrapassa o cabimento", tag: "MPO" },
                  { id: "c7", texto: "Tenho o diploma base para esta aquisição", tag: "CBS" },
                  { id: "c8", texto: "O bem vai ser registado no inventário após entrega", tag: "SPE" },
                ].map(item => (
                  <button key={item.id} onClick={() => toggle(item.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-left text-sm transition ${checklist[item.id] ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-white/[0.03] border border-white/5 hover:border-white/10"}`}>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${checklist[item.id] ? "bg-emerald-400 border-emerald-400" : "border-slate-500"}`}>
                      {checklist[item.id] && <span className="text-black text-xs font-black">✓</span>}
                    </div>
                    <span className="flex-1">{item.texto}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300">{item.tag}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* O que vende — Produto */}
        <section className="rounded-3xl bg-gradient-to-r from-amber-700/15 to-rose-700/15 border border-amber-500/20 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-amber-300" size={24} />
            <h2 className="text-xl font-black">Isto vende. Pack de Manuais para Alunos.</h2>
          </div>
          <p className="text-sm text-slate-300 mb-6">Muitos formam-se no CEDSIF e saem sem saber operar o e-SISTAFE. Este pack resolve esse problema. Preço sugerido: 500-1.500 MT por manual, ou 3.000-5.000 MT o pack completo.</p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-[#0f0f12] rounded-xl p-4 border border-white/5">
              <h4 className="font-bold text-amber-200 mb-2">Manual 1: CBS Completo</h4>
              <p className="text-slate-400">Como pesquisar diplomas, filtrar por tema, guardar e imprimir. 10 páginas.</p>
            </div>
            <div className="bg-[#0f0f12] rounded-xl p-4 border border-white/5">
              <h4 className="font-bold text-rose-200 mb-2">Manual 2: Requisição de Compra</h4>
              <p className="text-slate-400">Passo a passo com prints do e-SISTAFE. Erros comuns e como evitá-los. 15 páginas.</p>
            </div>
            <div className="bg-[#0f0f12] rounded-xl p-4 border border-white/5">
              <h4 className="font-bold text-emerald-200 mb-2">Manual 3: Os 6 Subsistemas</h4>
              <p className="text-slate-400">Guia rápido de cada subsistema com a ligação prática ao e-SISTAFE. 8 páginas.</p>
            </div>
            <div className="bg-[#0f0f12] rounded-xl p-4 border border-white/5">
              <h4 className="font-bold text-blue-200 mb-2">Pack Completo + Certificado</h4>
              <p className="text-slate-400">Os 3 manuais + 1 hora de consultoria por WhatsApp. 5.000 MT.</p>
            </div>
          </div>
        </section>

      </section>

      {/* Prompt Master — Anti-Alucinações */}
      <section className="rounded-3xl bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/20 p-8 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-purple-400" size={24} />
          <h2 className="text-xl font-black">Prompt Master — Sistema Anti-Alucinações V1.0</h2>
        </div>
        <p className="text-sm text-slate-300 mb-4">O prompt que governa todo o sistema. Baseado em 5 pilares: Temperature baixa, contexto explícito, regras de verificação, estados de confiança e auto-validação.</p>
        <div className="grid sm:grid-cols-3 gap-3 text-xs mb-4">
          <div className="bg-purple-950/40 rounded-xl p-3 border border-purple-500/10"><strong className="text-purple-300">Temperature</strong><br /><span className="text-slate-400">0.1 a 0.3 — previsibilidade</span></div>
          <div className="bg-purple-950/40 rounded-xl p-3 border border-purple-500/10"><strong className="text-purple-300">Estados</strong><br /><span className="text-slate-400">Verificado · Não verificado · Inconclusivo</span></div>
          <div className="bg-purple-950/40 rounded-xl p-3 border border-purple-500/10"><strong className="text-purple-300">Auto-Validação</strong><br /><span className="text-slate-400">5 perguntas antes de responder</span></div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/prompt-master-v1.md" download className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-400 text-black font-bold text-sm hover:bg-purple-300 transition shadow-lg shadow-purple-400/20">
            <Download size={16} /> Baixar Prompt Master
          </a>
          <span className="text-xs text-slate-400 self-center">Formato: .md · Compatível: Obsidian, Logseq, Ollama, qualquer editor</span>
        </div>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">
        Manuais de Formação e-SISTAFE · Joaquim Eugénio Machava · Estado: Não verificado (informação do utilizador)
      </footer>
    </main>
  );
}
