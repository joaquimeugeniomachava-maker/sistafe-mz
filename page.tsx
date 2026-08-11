import { BookOpen, ShoppingCart, LayoutDashboard, ClipboardCheck, ArrowRight, Search, Users, AlertTriangle, GitBranch, Scale } from "lucide-react";

export default function HomePage() {
  const nProdutos = { length: 4 };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0a12] to-[#050505] text-slate-100">
      {/* Navegação limpa */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/85 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <span className="font-black text-violet-300 text-sm flex items-center gap-2"><BookOpen size={16} /> Manual e-SISTAFE</span>
          <div className="flex items-center gap-1.5 text-xs">
            <a href="/formacao" className="px-3 py-1.5 rounded-full bg-violet-400 text-black font-bold hover:bg-violet-300 transition">Portal</a>
            <a href="/loja" className="px-3 py-1.5 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5 transition">Loja</a>
            <a href="/alavancagem" className="px-3 py-1.5 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5 transition">Painel</a>
            <a href="/auditoria" className="px-3 py-1.5 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5 transition">Auditoria</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#7c3aed40_0%,transparent_60%)]" />
        <p className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-violet-400 mb-4">Um subsistema para toda a nação</p>
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-violet-300 via-fuchsia-400 to-violet-500 max-w-3xl mx-auto leading-tight">
          Manual Inteligente de Contabilidade Pública e e-SISTAFE
        </h1>
        <p className="relative z-10 mt-5 text-violet-200/80 max-w-2xl mx-auto text-base md:text-lg font-medium">
          Consulta rápida, formação prática e apoio à decisão — para gestores e técnicos da administração pública em todo o país.
        </p>
        <p className="relative z-10 mt-3 text-slate-400 text-sm">Encontrar rápido · entender rápido · agir com segurança.</p>
        <div className="relative z-10 mt-9 flex items-center justify-center gap-3 flex-wrap">
          <a href="/formacao" className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-violet-400 text-black font-black hover:bg-violet-300 transition shadow-lg shadow-violet-400/25">
            Aceder ao Portal <ArrowRight size={18} />
          </a>
          <a href="/loja" className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 border border-white/15 text-slate-200 font-bold hover:bg-white/10 transition">
            <ShoppingCart size={18} /> Ver Manuais
          </a>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 pb-24 space-y-24">
        {/* O que o portal oferece */}
        <section>
          <h2 className="text-2xl font-black mb-6 text-center">O que encontras, em segundos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icone: <Search size={22} />, n: "27+", l: "siglas e conceitos", cor: "text-sky-400", h: "/siglas" },
              { icone: <Users size={22} />, n: "13", l: "perfis de operação", cor: "text-fuchsia-400", h: "/perfis" },
              { icone: <AlertTriangle size={22} />, n: "10", l: "erros comuns", cor: "text-orange-400", h: "/erros" },
              { icone: <GitBranch size={22} />, n: "26", l: "passos de processo", cor: "text-lime-400", h: "/ciclo" },
            ].map(s => (
              <a key={s.l} href={s.h} className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 text-center hover:border-white/15 hover:bg-white/[0.05] transition group">
                <div className={`${s.cor} flex justify-center mb-2`}>{s.icone}</div>
                <p className="text-2xl font-black">{s.n}</p>
                <p className="text-xs text-slate-400 mt-0.5 group-hover:text-slate-300 transition">{s.l}</p>
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-2"><Scale size={13} /> Base legal verificada: Lei 14/2020 · Decreto 79/2022 · Decreto 42/2018 · Lei 4/2022 (EGFAE)</p>
        </section>

        {/* Os 3 pilares */}
        <section>
          <h2 className="text-2xl font-black mb-2 text-center">Um sistema, três pilares</h2>
          <p className="text-sm text-slate-400 text-center mb-8">Limpo, focado e pensado para gerar retorno.</p>
          <div className="grid md:grid-cols-3 gap-5">
            <a href="/formacao" className="rounded-3xl bg-gradient-to-b from-violet-900/30 to-violet-950/20 border border-violet-500/25 p-7 hover:border-violet-400/50 transition group">
              <div className="flex items-center justify-between mb-3">
                <BookOpen className="text-violet-400" size={28} />
                <ArrowRight size={18} className="text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition" />
              </div>
              <h3 className="font-black text-lg text-violet-200">Portal — ajuda a nação</h3>
              <p className="text-xs text-slate-400 mt-2">Consulta e formação gratuitas. É o que constrói a tua reputação e traz visitantes de todo o país.</p>
            </a>
            <a href="/loja" className="rounded-3xl bg-gradient-to-b from-amber-900/30 to-amber-950/20 border border-amber-500/25 p-7 hover:border-amber-400/50 transition group">
              <div className="flex items-center justify-between mb-3">
                <ShoppingCart className="text-amber-400" size={28} />
                <ArrowRight size={18} className="text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
              </div>
              <h3 className="font-black text-lg text-amber-200">Loja — gera o retorno</h3>
              <p className="text-xs text-slate-400 mt-2">{nProdutos.length} produtos digitais e serviços, com pagamento via M-Pesa. Escreve uma vez, vende muitas.</p>
            </a>
            <a href="/alavancagem" className="rounded-3xl bg-gradient-to-b from-sky-900/30 to-sky-950/20 border border-sky-500/25 p-7 hover:border-sky-400/50 transition group">
              <div className="flex items-center justify-between mb-3">
                <LayoutDashboard className="text-sky-400" size={28} />
                <ArrowRight size={18} className="text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition" />
              </div>
              <h3 className="font-black text-lg text-sky-200">Painel — medes tudo</h3>
              <p className="text-xs text-slate-400 mt-2">Rendimentos reais da base de dados, pedidos e registos. Só para ti, o dono do sistema.</p>
            </a>
          </div>
        </section>

        {/* O funil */}
        <section className="rounded-3xl bg-gradient-to-r from-violet-900/20 via-fuchsia-900/15 to-amber-900/20 border border-white/10 p-8 md:p-10">
          <h2 className="text-2xl font-black mb-6 text-center">Como o retorno acontece</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
            <div className="text-center">
              <p className="text-3xl mb-1">🏛</p>
              <p className="font-bold text-sm text-violet-200">Portal gratuito</p>
              <p className="text-[11px] text-slate-400">atrai o país inteiro</p>
            </div>
            <ArrowRight size={20} className="text-slate-500 rotate-90 md:rotate-0" />
            <div className="text-center">
              <p className="text-3xl mb-1">📖</p>
              <p className="font-bold text-sm text-amber-200">Manual pago</p>
              <p className="text-[11px] text-slate-400">quem quer profundidade, compra</p>
            </div>
            <ArrowRight size={20} className="text-slate-500 rotate-90 md:rotate-0" />
            <div className="text-center">
              <p className="text-3xl mb-1">💰</p>
              <p className="font-bold text-sm text-emerald-200">M-Pesa</p>
              <p className="text-[11px] text-slate-400">recebes no teu número</p>
            </div>
            <ArrowRight size={20} className="text-slate-500 rotate-90 md:rotate-0" />
            <div className="text-center">
              <p className="text-3xl mb-1">📊</p>
              <p className="font-bold text-sm text-sky-200">Painel</p>
              <p className="text-[11px] text-slate-400">vês o rendimento real</p>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-6">Este é o caminho honesto: <strong className="text-slate-300">utilidade pública → confiança → venda</strong>. Sem truques, sem promessas vazias.</p>
        </section>

        {/* Nota de auditoria */}
        <section className="text-center">
          <a href="/auditoria" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-300 transition">
            <ClipboardCheck size={16} /> Ver a auditoria completa do sistema — o que mantemos e o que arquivámos
          </a>
        </section>
      </section>

      <footer className="border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <p>Manual Inteligente de Contabilidade Pública e e-SISTAFE · Joaquim Eugénio Machava</p>
          <p>"Encontre, entenda e execute com segurança."</p>
        </div>
      </footer>
    </main>
  );
}
