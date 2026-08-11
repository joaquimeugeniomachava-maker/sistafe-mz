"use client";
import { useState, useEffect } from "react";
import { ClipboardCheck, TrendingUp, AlertTriangle, CheckCircle2, Archive, Layers } from "lucide-react";

interface Ativo { nome: string; tipo: string; papel: string; veredicto: "manter" | "conteudo" | "arquivar"; razao: string; }

const ATIVOS: Ativo[] = [
  { nome: "/formacao", tipo: "Página", papel: "Portal público de consulta e formação", veredicto: "manter", razao: "É o melhor ativo. É a face pública que ajuda a nação — gestores e técnicos de todo o país." },
  { nome: "/loja", tipo: "Página", papel: "Venda de produtos com referência M-Pesa", veredicto: "manter", razao: "É o mecanismo de retorno. Produto digital criado 1x vende N vezes." },
  { nome: "/alavancagem", tipo: "Página", papel: "Painel do dono: rendimentos reais da BD", veredicto: "manter", razao: "Onde vês o dinheiro. Ligado à base de dados real." },
  { nome: "/siglas", tipo: "Conteúdo", papel: "Glossário com fontes citáveis", veredicto: "conteudo", razao: "Serve o portal. Mantém, mas não precisa de navegação própria no topo." },
  { nome: "/perfis", tipo: "Conteúdo", papel: "Perfis de operação e-SISTAFE", veredicto: "conteudo", razao: "Serve o portal. Conteúdo forte de formação." },
  { nome: "/erros", tipo: "Conteúdo", papel: "10 erros comuns", veredicto: "conteudo", razao: "Serve o portal. Muito procurado por quem opera o sistema." },
  { nome: "/ciclo", tipo: "Conteúdo", papel: "Ciclo de compras + MEX + PLC", veredicto: "conteudo", razao: "Serve o portal. Conteúdo central de contratação." },
  { nome: "/legislacao", tipo: "Conteúdo", papel: "Base jurídica verificada", veredicto: "conteudo", razao: "Serve o portal. Dá a confiança (camada 3)." },
  { nome: "/", tipo: "Página", papel: "Home atual = 'Fluxo Cidadão' (transportes, CV, burocracia)", veredicto: "arquivar", razao: "Saturada e desatualizada face ao foco e-SISTAFE. Substituir por landing limpa dos 3 pilares." },
  { nome: "/mega", tipo: "Página", papel: "Modo Ultra Pro (dashboard + estratégia)", veredicto: "arquivar", razao: "Sobrepõe com /alavancagem. Dois dashboards confundem. Um só basta." },
  { nome: "/contratacao", tipo: "Página", papel: "Contratação pública (bases, fluxo, checklist)", veredicto: "arquivar", razao: "Sobrepõe com /ciclo + /legislacao. O conteúdo já vive lá." },
  { nome: "/manuais", tipo: "Página", papel: "CBS + requisição + prompt master", veredicto: "arquivar", razao: "Sobrepõe com /ciclo + /siglas + /legislacao. Conteúdo redistribuído." },
  { nome: "/teste", tipo: "Página", papel: "Teste anti-alucinação (uso interno)", veredicto: "arquivar", razao: "Ferramenta de rigor interna, não é para o público. Manter acessível fora da navegação." },
];

const VEREDICTO_UI = {
  manter: { label: "MANTER · Pilar", cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30", icone: <CheckCircle2 size={14} /> },
  conteudo: { label: "MANTER · Conteúdo do portal", cls: "bg-sky-500/10 text-sky-300 border-sky-500/30", icone: <Layers size={14} /> },
  arquivar: { label: "ARQUIVAR", cls: "bg-slate-500/10 text-slate-400 border-slate-500/30", icone: <Archive size={14} /> },
};

export default function AuditoriaPage() {
  const [stats, setStats] = useState<{ pedidos: number; recebido: number; pendente: number } | null>(null);

  useEffect(() => {
    fetch("/api/pedidos").then(r => r.json()).then(d => {
      const arr = Array.isArray(d) ? d : [];
      setStats({
        pedidos: arr.length,
        recebido: arr.filter(p => p.estado === "pago").reduce((s, p) => s + p.valor, 0),
        pendente: arr.filter(p => p.estado === "pendente").reduce((s, p) => s + p.valor, 0),
      });
    }).catch(() => setStats({ pedidos: 0, recebido: 0, pendente: 0 }));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0c0a] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c2410c33_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-rose-400 to-amber-500">Auditoria do Sistema</h1>
        <p className="relative z-10 mt-4 text-amber-200/70 max-w-2xl mx-auto">O que existe, o que se sobrepõe, o que manter — para avançar limpo e com retorno.</p>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Inventário real */}
        <section>
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><ClipboardCheck className="text-amber-400" size={24} /> O inventário real</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: "12", l: "páginas" },
              { n: "5", l: "APIs" },
              { n: "3", l: "tabelas na BD" },
              { n: "5", l: "downloads" },
            ].map(s => (
              <div key={s.l} className="rounded-2xl bg-[#0f0f12] border border-white/5 p-5 text-center">
                <p className="text-3xl font-black text-amber-300">{s.n}</p>
                <p className="text-xs text-slate-400 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 p-5 flex items-start gap-3">
            <AlertTriangle className="text-rose-400 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-rose-100"><strong>Diagnóstico:</strong> o sistema cresceu em <strong>largura</strong> (muitas páginas) em vez de <strong>profundidade</strong> (um funil claro). 4 páginas sobrepõem-se e a home está desatualizada face ao foco e-SISTAFE. Resultado: o visitante perde-se e o retorno dilui-se.</p>
          </div>
        </section>

        {/* Retorno atual (verdade) */}
        <section>
          <h2 className="text-2xl font-black mb-2 flex items-center gap-2"><TrendingUp className="text-emerald-400" size={24} /> A verdade sobre o retorno</h2>
          <p className="text-sm text-slate-400 mb-5">Números reais da base de dados, sem inventar:</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            <div className="rounded-2xl bg-[#0f0f12] border border-white/5 p-5 text-center">
              <p className="text-3xl font-black text-slate-300">{stats ? stats.pedidos : "…"}</p>
              <p className="text-xs text-slate-400 mt-1">pedidos até agora</p>
            </div>
            <div className="rounded-2xl bg-[#0f0f12] border border-white/5 p-5 text-center">
              <p className="text-3xl font-black text-emerald-300">{stats ? stats.recebido : "…"} MT</p>
              <p className="text-xs text-slate-400 mt-1">recebido</p>
            </div>
            <div className="rounded-2xl bg-[#0f0f12] border border-white/5 p-5 text-center">
              <p className="text-3xl font-black text-amber-300">{stats ? stats.pendente : "…"} MT</p>
              <p className="text-xs text-slate-400 mt-1">pendente</p>
            </div>
          </div>
          <div className="rounded-2xl bg-amber-950/20 border border-amber-500/20 p-5 text-sm text-amber-100 space-y-2">
            <p><strong>"Sombra da bananeira" — o que é real:</strong> um <strong>manual digital</strong> escreve-se uma vez e vende-se muitas. Isso é o mais próximo de rendimento automático que existe de forma honesta.</p>
            <p><strong>O que NÃO é automático:</strong> o tráfego. Sem pessoas a chegar ao portal, não há vendas. O retorno vem de: <strong>conteúdo útil (já tens) + partilha constante (WhatsApp, grupos) + tempo</strong>. Não há clique mágico — e qualquer sócio que te prometa isso está a enganar-te.</p>
          </div>
        </section>

        {/* Avaliação por ativo */}
        <section>
          <h2 className="text-2xl font-black mb-6">Avaliação ativo a ativo</h2>
          <div className="space-y-3">
            {ATIVOS.map(a => {
              const v = VEREDICTO_UI[a.veredicto];
              return (
                <div key={a.nome} className="rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-[220px]">
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-bold text-sm">{a.nome}</code>
                        <span className="text-[10px] text-slate-500 uppercase">{a.tipo}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{a.papel}</p>
                      <p className="text-xs text-slate-300 mt-1.5">{a.razao}</p>
                    </div>
                    <span className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${v.cls}`}>{v.icone}{v.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Estrutura limpa */}
        <section className="rounded-3xl bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 p-8">
          <h2 className="text-2xl font-black mb-2">A estrutura limpa — 3 pilares</h2>
          <p className="text-sm text-slate-300 mb-6">O subsistema que ajuda a nação e gera retorno, sem saturação:</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-black/25 border border-emerald-500/20 p-5">
              <p className="text-3xl mb-2">🏛</p>
              <h3 className="font-black text-emerald-200">1. Portal (público)</h3>
              <p className="text-xs text-slate-400 mt-1">Consulta e formação e-SISTAFE, grátis. Ajuda funcionários de <strong>todo o país</strong>. É o que constrói reputação e traz tráfego.</p>
            </div>
            <div className="rounded-2xl bg-black/25 border border-amber-500/20 p-5">
              <p className="text-3xl mb-2">💰</p>
              <h3 className="font-black text-amber-200">2. Loja (retorno)</h3>
              <p className="text-xs text-slate-400 mt-1">Manuais digitais + consultoria, via M-Pesa. O conteúdo gratuito do portal conduz até aqui.</p>
            </div>
            <div className="rounded-2xl bg-black/25 border border-sky-500/20 p-5">
              <p className="text-3xl mb-2">📊</p>
              <h3 className="font-black text-sky-200">3. Painel (gestão)</h3>
              <p className="text-xs text-slate-400 mt-1">Rendimentos reais, pedidos, registos. Só para ti — o dono do sistema.</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-6">O funil: <strong className="text-emerald-300">Portal (grátis, ajuda a nação)</strong> → <strong className="text-amber-300">Loja (manual pago)</strong> → <strong className="text-sky-300">Painel (medes o retorno)</strong>. As páginas arquivadas deixam a navegação, mas o conteúdo útil já vive dentro do portal.</p>
        </section>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Auditoria · Sistema Joaquim Eugénio Machava · 2026</footer>
    </main>
  );
}
