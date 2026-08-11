"use client";
import { useState, useMemo } from "react";
import { Search, BookOpen, Users, GitBranch, AlertTriangle, Download, ChevronRight, Home, ArrowRight } from "lucide-react";

interface Item { tipo: "Sigla" | "Perfil" | "Erro" | "Processo"; titulo: string; resumo: string; link: string; keywords: string[]; }

const ITENS: Item[] = [
  // SIGLAS
  { tipo: "Sigla", titulo: "CEDSIF, IP", resumo: "Centro de Desenvolvimento de Sistemas de Informação de Finanças. Desenvolve e opera o e-SISTAFE.", link: "/siglas", keywords: ["cedsif", "sistemas", "informação", "finanças", "tecnologia"] },
  { tipo: "Sigla", titulo: "UFSA", resumo: "Unidade Funcional de Supervisão das Aquisições. Supervisiona a contratação pública.", link: "/siglas", keywords: ["ufsa", "aquisições", "contratação", "supervisão"] },
  { tipo: "Sigla", titulo: "e-SISTAFE", resumo: "Sistema informático que operacionaliza o SISTAFE: planificação, orçamento, execução e controlo.", link: "/siglas", keywords: ["sistafe", "sistema", "electrónico", "plataforma"] },
  { tipo: "Sigla", titulo: "MPO", resumo: "Módulo de Planificação e Orçamentação. Liga prioridades aos recursos.", link: "/siglas", keywords: ["mpo", "planificação", "orçamento", "módulo"] },
  { tipo: "Sigla", titulo: "MEX", resumo: "Módulo de Execução. Apoia a execução da despesa pública.", link: "/siglas", keywords: ["mex", "execução", "despesa", "módulo"] },
  { tipo: "Sigla", titulo: "MPE", resumo: "Módulo de Gestão do Património do Estado. Registo e gestão de bens.", link: "/siglas", keywords: ["mpe", "património", "bens", "módulo"] },
  { tipo: "Sigla", titulo: "CBS", resumo: "Catálogo de Bens e Serviços. Registo centralizado para aquisições.", link: "/siglas", keywords: ["cbs", "catálogo", "bens", "serviços"] },
  { tipo: "Sigla", titulo: "CUT", resumo: "Conta Única do Estado. Centraliza os recursos do Estado.", link: "/siglas", keywords: ["cut", "conta", "tesouro", "tesouraria"] },
  { tipo: "Sigla", titulo: "PESOE", resumo: "Plano Económico e Social e Orçamento do Estado. Junta planificação e orçamento.", link: "/siglas", keywords: ["pesoe", "plano", "orçamento", "económico"] },
  // PERFIS
  { tipo: "Perfil", titulo: "Agente de Execução Financeira", resumo: "Processa pagamentos e adiantamentos (com processo válido).", link: "/perfis", keywords: ["pagamento", "financeira", "paga", "adiantamento"] },
  { tipo: "Perfil", titulo: "Agente de Execução Orçamental", resumo: "Faz cabimentação, liquidação e gestão do processo da despesa.", link: "/perfis", keywords: ["cabimento", "orçamental", "liquidação", "dotação"] },
  { tipo: "Perfil", titulo: "Agente de Património", resumo: "Regista, actualiza e acompanha os bens do Estado.", link: "/perfis", keywords: ["património", "bens", "inventário", "registo"] },
  { tipo: "Perfil", titulo: "Agente de Controlo Interno / Conformidade", resumo: "Confere conformidade processual e documental. Não executa.", link: "/perfis", keywords: ["conformidade", "controlo", "confere", "valida", "auditoria"] },
  { tipo: "Perfil", titulo: "Ordenador de Despesa", resumo: "Autoriza a despesa — a autorização final.", link: "/perfis", keywords: ["autoriza", "aprova", "ordenador", "despesa"] },
  { tipo: "Perfil", titulo: "Agente de Consulta", resumo: "Só visualiza dados e relatórios; não altera nada.", link: "/perfis", keywords: ["consulta", "vê", "visualiza", "relatórios"] },
  { tipo: "Perfil", titulo: "Administrador de Segurança", resumo: "Gere acessos e perfis. Não deve executar despesa.", link: "/perfis", keywords: ["segurança", "acessos", "perfis", "permissões"] },
  // ERROS
  { tipo: "Erro", titulo: "Cabimento sem saldo suficiente", resumo: "Despesa lançada sem cobertura na dotação. Como evitar: confirmar saldo e rubrica antes.", link: "/erros", keywords: ["saldo", "cabimento", "dotação", "insuficiente"] },
  { tipo: "Erro", titulo: "Documentação incompleta", resumo: "Faltam anexos/despacho/factura. O processo é devolvido. Como evitar: conferir tudo antes.", link: "/erros", keywords: ["documentos", "anexos", "incompleta", "devolvido"] },
  { tipo: "Erro", titulo: "Perfil errado no utilizador", resumo: "Permissões inadequadas criam risco de fraude. Como evitar: rever acessos.", link: "/erros", keywords: ["perfil", "acesso", "permissão", "fraude"] },
  { tipo: "Erro", titulo: "Registo tardio", resumo: "Registo depois da execução cria desencontro. Como evitar: registar logo após a operação.", link: "/erros", keywords: ["registo", "atraso", "tardio", "tempo real"] },
  { tipo: "Erro", titulo: "Classificação orçamental errada", resumo: "Rubrica/actividade errada. Como evitar: verificar antes de lançar.", link: "/erros", keywords: ["rubrica", "classificação", "actividade", "errada"] },
  // PROCESSOS
  { tipo: "Processo", titulo: "Cabimento orçamental", resumo: "Verificar se existe verba antes de executar. Passo 4 do ciclo.", link: "/ciclo", keywords: ["cabimento", "verba", "dotação", "orçamento"] },
  { tipo: "Processo", titulo: "Liquidação", resumo: "Conferir a entrega e autorizar o pagamento. Passo 7 do ciclo.", link: "/ciclo", keywords: ["liquidação", "conferir", "entrega", "autorizar"] },
  { tipo: "Processo", titulo: "Pagamento (ordem de pagamento)", resumo: "O AEF autoriza a saída do dinheiro via CUT. Passo 8 do ciclo.", link: "/ciclo", keywords: ["pagamento", "ordem", "paga", "cut"] },
  { tipo: "Processo", titulo: "Plano de Contratação (PLC)", resumo: "Os 7 passos do perfil ACP/AGC, da proposta ao plano efetivo.", link: "/ciclo", keywords: ["contratação", "plc", "concurso", "plano"] },
  { tipo: "Processo", titulo: "Requisição de compra", resumo: "O pedido formal com especificações. Passo 3 do ciclo.", link: "/ciclo", keywords: ["requisição", "compra", "pedido", "especificações"] },
];

const TIPO_COR: Record<Item["tipo"], string> = {
  Sigla: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  Perfil: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30",
  Erro: "bg-orange-500/10 text-orange-300 border-orange-500/30",
  Processo: "bg-lime-500/10 text-lime-300 border-lime-500/30",
};

const INTENCOES = [
  { titulo: "Consultar", desc: "Siglas, perfis e definições", href: "/siglas", icone: <Search size={22} />, cor: "text-sky-400" },
  { titulo: "Aprender", desc: "Módulos, guias e passos", href: "#modulos", icone: <BookOpen size={22} />, cor: "text-violet-400" },
  { titulo: "Resolver erro", desc: "Falhas comuns e correções", href: "/erros", icone: <AlertTriangle size={22} />, cor: "text-orange-400" },
  { titulo: "Documentos", desc: "Base legal e downloads", href: "/legislacao", icone: <Download size={22} />, cor: "text-emerald-400" },
];

const CARTOES = [
  { label: "Siglas", href: "/siglas", icone: <Search size={20} />, cor: "text-sky-400" },
  { label: "Perfis", href: "/perfis", icone: <Users size={20} />, cor: "text-fuchsia-400" },
  { label: "Fluxo de Processos", href: "/ciclo", icone: <GitBranch size={20} />, cor: "text-lime-400" },
  { label: "Erros Comuns", href: "/erros", icone: <AlertTriangle size={20} />, cor: "text-orange-400" },
  { label: "Base Legal", href: "/legislacao", icone: <BookOpen size={20} />, cor: "text-emerald-400" },
  { label: "Downloads", href: "/alavancagem", icone: <Download size={20} />, cor: "text-amber-400" },
];

const RESPOSTA_RAPIDA = [
  { tema: "Cabimento", definicao: "Verificar se existe verba antes de executar a despesa.", impacto: "Sem cabimento, a despesa é irregular e o processo trava.", risco: "Compromisso manual — passivo oculto (Lei 14/2020).", responsavel: "Agente de Execução Orçamental", proximo: "Confirmar saldo e rubrica na Ficha MPE.", link: "/ciclo" },
  { tema: "Liquidação", definicao: "Conferir a entrega do bem/serviço e autorizar o pagamento.", impacto: "Só após a liquidação o pagamento pode ser emitido.", risco: "Pagar sem liquidação é a irregularidade mais grave.", responsavel: "Agente de Execução Orçamental + Controlo Interno", proximo: "Conferir factura e termo de recepção.", link: "/ciclo" },
  { tema: "Segregação de funções", definicao: "Cada perfil faz só o que lhe compete; sem acumular papéis incompatíveis.", impacto: "Reduz fraude, erro e acúmulo de poder.", risco: "Mesma pessoa preparar, validar e executar = fragilidade de controlo.", responsavel: "Administrador de Segurança (acessos)", proximo: "Rever perfis e permissões.", link: "/perfis" },
];

const CAMINHOS_PERFIL = [
  { perfil: "Gestor sénior", cor: "border-violet-500/40", icone: "🎯", temas: [{ t: "Resumo executivo", h: "#resposta-rapida" }, { t: "Risco e impacto", h: "#resposta-rapida" }, { t: "Decisão e autorização", h: "/perfis" }, { t: "Documentos de suporte", h: "/legislacao" }] },
  { perfil: "Técnico de orçamento", cor: "border-blue-500/40", icone: "📊", temas: [{ t: "Cabimento", h: "/ciclo" }, { t: "Dotação", h: "/ciclo" }, { t: "Classificação", h: "/erros" }, { t: "Execução", h: "/ciclo" }] },
  { perfil: "Técnico financeiro", cor: "border-emerald-500/40", icone: "💰", temas: [{ t: "Liquidação", h: "/ciclo" }, { t: "Pagamento", h: "/ciclo" }, { t: "Registo", h: "/erros" }, { t: "Conciliação", h: "/siglas" }] },
  { perfil: "Património e controlo", cor: "border-teal-500/40", icone: "🏛", temas: [{ t: "Registo de bens", h: "/ciclo" }, { t: "Movimentação", h: "/siglas" }, { t: "Conformidade", h: "/perfis" }, { t: "Responsabilização", h: "/legislacao" }] },
];

export default function FormacaoPage() {
  const [busca, setBusca] = useState("");

  const resultados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return [];
    return ITENS.filter(i =>
      i.titulo.toLowerCase().includes(q) ||
      i.resumo.toLowerCase().includes(q) ||
      i.keywords.some(k => k.includes(q) || q.includes(k))
    );
  }, [busca]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0a12] to-[#050505] text-slate-100">
      {/* Topo */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/85 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <a href="/formacao" className="flex items-center gap-2 font-black text-violet-300 text-sm"><BookOpen size={18} /> Manual e-SISTAFE</a>
          <nav className="flex items-center gap-1.5 text-xs text-slate-400">
            <a href="/" className="flex items-center gap-1 hover:text-violet-300 transition"><Home size={13} /> Início</a>
            <ChevronRight size={12} />
            <span className="text-slate-200 font-semibold">Portal de Consulta</span>
          </nav>
        </div>
      </header>

      {/* Hero + Pesquisa */}
      <section className="relative overflow-hidden px-6 pt-16 pb-12 text-center border-b border-violet-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#7c3aed33_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-3xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-violet-300 via-fuchsia-400 to-violet-500">Manual Inteligente de Contabilidade Pública e e-SISTAFE</h1>
        <p className="relative z-10 mt-3 text-violet-200/80 max-w-2xl mx-auto text-sm md:text-base font-medium">Consulta rápida, formação prática e apoio à decisão para administração pública, contabilidade, orçamento, património e contratação.</p>
        <p className="relative z-10 mt-2 text-slate-400 max-w-xl mx-auto text-xs md:text-sm">Encontrar rápido · entender rápido · agir com segurança.</p>
        <div className="relative z-10 max-w-2xl mx-auto mt-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Pesquisar: cabimento, MPO, liquidação, perfil…" className="w-full rounded-2xl bg-white/[0.05] border border-white/15 pl-12 pr-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-violet-400" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 space-y-16">
        {/* Resultados da pesquisa */}
        {busca.trim() && (
          <section>
            <h2 className="text-xl font-black mb-4">Resultados para "{busca}" <span className="text-sm font-semibold text-slate-500">({resultados.length})</span></h2>
            {resultados.length === 0 && <p className="text-sm text-slate-400 bg-white/[0.03] border border-white/5 rounded-xl p-4">Nada encontrado. Tente outra palavra (ex: "cabimento", "património", "pagamento").</p>}
            <div className="space-y-3">
              {resultados.map((r, i) => (
                <a key={i} href={r.link} className="flex items-start justify-between gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-4 hover:border-violet-500/30 hover:bg-white/[0.05] transition group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${TIPO_COR[r.tipo]}`}>{r.tipo.toUpperCase()}</span>
                      <h3 className="font-bold text-sm group-hover:text-violet-200 transition">{r.titulo}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">{r.resumo}</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-600 group-hover:text-violet-400 transition shrink-0 mt-1" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Menu por intenção */}
        {!busca.trim() && (
          <>
            <section>
              <h2 className="text-xl font-black mb-1">O que queres fazer?</h2>
              <p className="text-sm text-slate-400 mb-5">Navega por intenção, não por sigla.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {INTENCOES.map(i => (
                  <a key={i.titulo} href={i.href} className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 text-center hover:border-violet-500/30 hover:bg-white/[0.05] transition group">
                    <div className={`${i.cor} flex justify-center mb-2`}>{i.icone}</div>
                    <p className="font-bold text-sm group-hover:text-violet-200 transition">{i.titulo}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{i.desc}</p>
                  </a>
                ))}
              </div>
            </section>

            {/* Cartões de acesso rápido */}
            <section>
              <h2 className="text-xl font-black mb-5">Consulta rápida</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {CARTOES.map(c => (
                  <a key={c.label} href={c.href} className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 text-center hover:border-white/15 transition group">
                    <div className={`${c.cor} flex justify-center mb-2`}>{c.icone}</div>
                    <p className="text-xs font-bold group-hover:text-violet-200 transition">{c.label}</p>
                  </a>
                ))}
              </div>
            </section>

            {/* Resposta rápida para gestores */}
            <section id="resposta-rapida">
              <h2 className="text-xl font-black mb-1">Resposta rápida <span className="text-sm font-semibold text-slate-500">· para gestores</span></h2>
              <p className="text-sm text-slate-400 mb-5">Definição, impacto, risco, responsável e próximo passo — em 30 segundos.</p>
              <div className="space-y-4">
                {RESPOSTA_RAPIDA.map(r => (
                  <div key={r.tema} className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                      <h3 className="font-black text-violet-300">{r.tema}</h3>
                      <a href={r.link} className="text-xs font-bold text-violet-400 hover:underline flex items-center gap-1">Ver completo <ArrowRight size={12} /></a>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-300">
                      <p><span className="text-slate-500 font-semibold">Definição:</span> {r.definicao}</p>
                      <p><span className="text-slate-500 font-semibold">Impacto:</span> {r.impacto}</p>
                      <p><span className="text-rose-300 font-semibold">Risco:</span> {r.risco}</p>
                      <p><span className="text-slate-500 font-semibold">Responsável:</span> {r.responsavel}</p>
                    </div>
                    <p className="text-xs mt-2 text-emerald-300"><span className="font-semibold">→ Próximo passo:</span> {r.proximo}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Caminhos por perfil */}
        <section>
          <h2 className="text-xl font-black mb-1">Caminhos por perfil</h2>
          <p className="text-sm text-slate-400 mb-5">Cada utilizador vai direto ao que lhe compete.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAMINHOS_PERFIL.map(p => (
              <div key={p.perfil} className={`rounded-2xl bg-white/[0.03] border-l-4 ${p.cor} border border-white/5 p-4`}>
                <p className="font-bold text-sm flex items-center gap-2">{p.icone} {p.perfil}</p>
                <ul className="mt-3 space-y-1.5">
                  {p.temas.map(t => (
                    <li key={t.t}>
                      <a href={t.h} className="text-xs text-slate-300 hover:text-violet-300 transition flex items-center gap-1.5">
                        <ChevronRight size={11} className="text-slate-600" />{t.t}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Módulos */}
        <section id="modulos">
          <h2 className="text-xl font-black mb-5">Aprende por módulos</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { n: 1, t: "Fundamentos", d: "SISTAFE, e-SISTAFE, SPO, PES, OE, PESOE.", href: "/siglas", cor: "border-sky-500/40" },
              { n: 2, t: "Perfis", d: "Quem faz o quê: execução, conformidade, segurança.", href: "/perfis", cor: "border-fuchsia-500/40" },
              { n: 3, t: "Contratação", d: "Concurso, cabimento, adjudicação, contrato, pagamento.", href: "/ciclo", cor: "border-lime-500/40" },
              { n: 4, t: "Erros frequentes", d: "Os 10 erros que travam processos — e as correções.", href: "/erros", cor: "border-orange-500/40" },
              { n: 5, t: "Base legal", d: "Lei 14/2020, Decretos 79/2022 e 42/2018, EGFAE.", href: "/legislacao", cor: "border-emerald-500/40" },
              { n: 6, t: "Downloads", d: "Manuais, kit do exército de IA e prompt master.", href: "/alavancagem", cor: "border-amber-500/40" },
            ].map(m => (
              <a key={m.n} href={m.href} className={`rounded-2xl bg-white/[0.03] border-l-4 ${m.cor} border border-white/5 p-4 hover:bg-white/[0.05] transition group`}>
                <p className="text-[11px] font-black text-violet-400">MÓDULO {m.n}</p>
                <p className="font-bold text-sm mt-1 group-hover:text-violet-200 transition">{m.t}</p>
                <p className="text-xs text-slate-400 mt-1">{m.d}</p>
              </a>
            ))}
          </div>
        </section>
      </section>

      {/* Rodapé útil */}
      <footer className="border-t border-white/5 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="text-center text-violet-300 font-black text-lg mb-6">"Encontre, entenda e execute com segurança."</p>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="space-y-1">
              <p className="font-semibold text-slate-400">Manual Inteligente de Contabilidade Pública e e-SISTAFE</p>
              <p>Contacto: joaquimeugeniomachava@gmail.com · 844 898 420</p>
              <p>Versão do conteúdo: 2.0 · Última atualização: 26 de Julho de 2026</p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="/legislacao" className="hover:text-violet-300 transition">Base legal</a>
              <a href="/alavancagem" className="hover:text-violet-300 transition">Download de manuais</a>
              <a href="mailto:joaquimeugeniomachava@gmail.com?subject=Pedido de apoio" className="hover:text-violet-300 transition">Pedido de apoio</a>
              <a href="mailto:joaquimeugeniomachava@gmail.com?subject=Sugestão de melhoria" className="hover:text-violet-300 transition">Sugestão de melhoria</a>
              <a href="#top" className="hover:text-violet-300 transition">↑ Voltar ao início</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
