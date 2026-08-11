"use client";
import { useState, useEffect } from "react";
import { TrendingUp, Download, Cpu, LayoutDashboard, FileText, ShoppingCart, BookOpen, Scale, ShieldCheck, TestTube, Zap } from "lucide-react";

interface Pedido { id: number; nome: string; telefone: string; estado: string; valor: number; referenciaMpesa: string | null; createdAt: string; }

const FERRAMENTAS = [
  { href: "/", label: "Home (landing)", desc: "A porta de entrada limpa — os 3 pilares e o funil de retorno.", icone: <LayoutDashboard size={20} />, cor: "text-violet-400" },
  { href: "/formacao", label: "Portal de Consulta", desc: "A face pública: pesquisa, caminhos por perfil, formação. Ajuda a nação.", icone: <LayoutDashboard size={20} />, cor: "text-violet-400" },
  { href: "/loja", label: "Loja", desc: "Produtos digitais e serviços com pagamento via M-Pesa.", icone: <ShoppingCart size={20} />, cor: "text-amber-400" },
  { href: "/siglas", label: "Glossário de Siglas", desc: "CEDSIF IP, UFSA, MPO, MEX, MPE — com fontes citáveis.", icone: <BookOpen size={20} />, cor: "text-sky-400" },
  { href: "/perfis", label: "Perfis de Operação", desc: "Quem faz o quê no e-SISTAFE — segregação de funções.", icone: <ShieldCheck size={20} />, cor: "text-fuchsia-400" },
  { href: "/erros", label: "Erros Comuns", desc: "Os 10 erros que travam processos — e como evitá-los.", icone: <ShieldCheck size={20} />, cor: "text-orange-400" },
  { href: "/ciclo", label: "Ciclo de Compras", desc: "Da Ficha MPE à liquidação — com o exemplo do trator.", icone: <LayoutDashboard size={20} />, cor: "text-lime-400" },
  { href: "/legislacao", label: "Base Jurídica", desc: "Lei 14/2020, Decretos 79/2022 e 42/2018, EGFAE — fontes oficiais.", icone: <Scale size={20} />, cor: "text-teal-400" },
  { href: "/auditoria", label: "Auditoria", desc: "O inventário do sistema e o que foi arquivado na limpeza.", icone: <ShieldCheck size={20} />, cor: "text-slate-400" },
  { href: "/teste", label: "Teste Anti-Alucinação", desc: "Prova de rigor com registo real no PostgreSQL.", icone: <TestTube size={20} />, cor: "text-purple-400" },
];

const DOWNLOADS = [
  { href: "/kit-joaquim.sh", nome: "kit-joaquim.sh", desc: "TUDO-EM-UM: instala Ollama + estrutura + modelos + Prompt Master + teste. Um só ficheiro.", tag: "RECOMENDADO" },
  { href: "/exercito-ia-v2.md", nome: "exercito-ia-v2.md", desc: "Documentação completa do Exército de IA v2.0 (quando usar cada modelo, validação, fallback).", tag: "MANUAL" },
  { href: "/juslex-v2.md", nome: "juslex-v2.md", desc: "Prompt Master JUSLEX V2.0 — ciclo de compras + base jurídica com estados de confiança.", tag: "PROMPT ATUAL" },
  { href: "/prompt-master-v1.md", nome: "prompt-master-v1.md", desc: "Prompt Master Anti-Alucinações V1.0 — as regras que governam o sistema.", tag: "PROMPT" },
];

const PLANO = [
  { mes: "Mês 1", foco: "Sistema a funcionar", meta: "5 produtos na loja · 1 manual vendido · flash configurado com o exército", cor: "border-amber-500/40" },
  { mes: "Mês 2", foco: "Conteúdo consistente", meta: "1 publicação/dia · 500 seguidores · 3 manuais vendidos", cor: "border-rose-500/40" },
  { mes: "Mês 3", foco: "Primeira renda extra", meta: "5.000–10.000 MT fora do salário · 2 consultorias · registo de tudo na BD", cor: "border-emerald-500/40" },
];

export default function AlavancagemPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pedidos").then(r => r.json()).then(d => { setPedidos(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const totalGeral = pedidos.reduce((s, p) => s + p.valor, 0);
  const totalPago = pedidos.filter(p => p.estado === "pago").reduce((s, p) => s + p.valor, 0);
  const totalPendente = pedidos.filter(p => p.estado === "pendente").reduce((s, p) => s + p.valor, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0a05] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c2410c44_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-rose-400 to-amber-600">Alavancagem</h1>
        <p className="relative z-10 mt-4 text-amber-200/70">O painel central do Joaquim. Tudo o que construímos, a render.</p>
        <p className="relative z-10 mt-1 text-xs text-slate-500">Rendimentos reais da base de dados · Sem inventar números.</p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* Rendimentos reais */}
        <section>
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><TrendingUp className="text-amber-400" size={26} /> Rendimentos — em tempo real da base de dados</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-2xl bg-[#0f0f12] border border-white/5 p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">Recebido (pago)</p>
              <p className="text-3xl font-black text-emerald-300 mt-1">{loading ? "…" : `${totalPago} MT`}</p>
            </div>
            <div className="rounded-2xl bg-[#0f0f12] border border-white/5 p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">A receber (pendente)</p>
              <p className="text-3xl font-black text-amber-300 mt-1">{loading ? "…" : `${totalPendente} MT`}</p>
            </div>
            <div className="rounded-2xl bg-[#0f0f12] border border-white/5 p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">Pedidos registados</p>
              <p className="text-3xl font-black text-rose-300 mt-1">{loading ? "…" : pedidos.length}</p>
            </div>
          </div>
          {!loading && pedidos.length === 0 && (
            <p className="text-sm text-slate-400 bg-white/[0.03] border border-white/5 rounded-xl p-4">Ainda não há pedidos. Assim que venderes na <a href="/loja" className="text-amber-400 font-bold hover:underline">Loja</a>, os valores aparecem aqui — gravados no PostgreSQL.</p>
          )}
          {!loading && pedidos.length > 0 && (
            <div className="rounded-2xl bg-[#0f0f12] border border-white/5 overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[560px]">
                <thead className="bg-amber-500/10 text-amber-200 uppercase text-xs">
                  <tr><th className="p-3">Cliente</th><th className="p-3">Contacto</th><th className="p-3">Referência</th><th className="p-3">Valor</th><th className="p-3">Estado</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pedidos.map(p => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="p-3">{p.nome}</td>
                      <td className="p-3 font-mono text-xs">{p.telefone}</td>
                      <td className="p-3 font-mono text-xs">{p.referenciaMpesa ?? "—"}</td>
                      <td className="p-3 font-bold">{p.valor} MT</td>
                      <td className="p-3"><span className={`px-2 py-0.5 rounded-md text-xs font-bold ${p.estado === "pago" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>{p.estado}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Sistema completo */}
        <section>
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><LayoutDashboard className="text-rose-400" size={26} /> O Sistema Completo</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FERRAMENTAS.map(f => (
              <a key={f.href} href={f.href} className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 hover:border-white/15 hover:bg-white/[0.05] transition group">
                <div className={`${f.cor} mb-3`}>{f.icone}</div>
                <h3 className="font-bold group-hover:text-amber-200 transition">{f.label}</h3>
                <p className="text-xs text-slate-400 mt-1">{f.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Exército de IA + Downloads */}
        <section className="rounded-3xl bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 p-8 md:p-10">
          <h2 className="text-2xl font-black mb-2 flex items-center gap-2"><Cpu className="text-indigo-400" size={26} /> O Exército de IA — Flash 32GB (v2.0)</h2>
          <p className="text-sm text-slate-300 mb-6">Três modelos com papel fixo (Cérebro 8B · Raciocínio 7B · Batedor 3B), Prompt Master embutido, camada de validação, logging e fallback. Feito para durar 20 anos.</p>
          <div className="space-y-3">
            {DOWNLOADS.map(d => (
              <a key={d.href} href={d.href} download className="flex items-center gap-4 rounded-2xl bg-[#0f0f12] border border-white/5 p-4 hover:border-indigo-400/40 transition group">
                <Download className="text-indigo-400 shrink-0 group-hover:scale-110 transition" size={22} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-200">{d.nome}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">{d.tag}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{d.desc}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">No desktop com Wi-Fi: descarrega o <code className="text-indigo-300">kit-joaquim.sh</code> para o flash e corre <code className="text-indigo-300">chmod +x kit-joaquim.sh && ./kit-joaquim.sh</code>. Ele faz tudo sozinho e corre o teste anti-alucinação no fim.</p>
        </section>

        {/* Plano de alavancagem */}
        <section>
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><FileText className="text-emerald-400" size={26} /> Plano de Alavancagem — 90 dias</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {PLANO.map(p => (
              <div key={p.mes} className={`rounded-2xl bg-white/[0.03] border-l-4 ${p.cor} p-5`}>
                <p className="text-xs font-black text-amber-400 uppercase">{p.mes} · {p.foco}</p>
                <p className="text-sm text-slate-300 mt-2">{p.meta}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">A alavancagem real: o exército multiplica o teu tempo, a validação mantém a confiança, a venda traz a renda. Sem validação, sem confiança. Sem venda, sem renda.</p>
        </section>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Alavancagem · Joaquim Eugénio Machava · 2026</footer>
    </main>
  );
}
