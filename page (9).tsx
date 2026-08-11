"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, CheckCircle2, AlertCircle, Loader2, Package } from "lucide-react";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
}

export default function LojaPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nome: "", telefone: "" });
  const [selected, setSelected] = useState<number | null>(null);
  const [state, setState] = useState<{ tipo: "idle" | "loading" | "success" | "error"; msg: string }>({ tipo: "idle", msg: "" });

  useEffect(() => {
    fetch("/api/seed").then(() => fetch("/api/produtos")).then(r => r.json()).then(d => { setProdutos(d); setLoading(false); });
  }, []);

  const comprar = async () => {
    if (!selected || !form.nome || !form.telefone) { setState({ tipo: "error", msg: "Preenche todos os campos" }); return; }
    setState({ tipo: "loading", msg: "" });
    const r = await fetch("/api/pedidos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, produtoId: selected }) });
    const d = await r.json();
    if (d.success) setState({ tipo: "success", msg: d.instrucao });
    else setState({ tipo: "error", msg: d.error });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0d0a] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c2410c33_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-rose-400 to-amber-500">Loja</h1>
        <p className="relative z-10 mt-4 text-amber-200/70">Produtos e serviços. Pagam-se via M-Pesa.</p>
        <p className="relative z-10 mt-1 text-xs text-slate-500">Sistema auto-sustentável · Joaquim Eugénio Machava · 2026</p>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {state.tipo === "success" && (
          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 text-center">
            <CheckCircle2 className="mx-auto text-emerald-400 mb-3" size={40} />
            <p className="font-bold text-emerald-200">Pedido criado!</p>
            <p className="text-sm text-slate-300 mt-2">{state.msg}</p>
          </div>
        )}
        {state.tipo === "error" && (
          <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-6 text-center">
            <AlertCircle className="mx-auto text-red-400 mb-3" size={40} />
            <p className="text-sm text-red-200">{state.msg}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-amber-400" size={40} /></div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {produtos.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)} className={`text-left rounded-2xl p-6 border transition ${selected === p.id ? "bg-amber-500/10 border-amber-400/40" : "bg-white/[0.03] border-white/5 hover:border-white/10"}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300">{p.categoria}</span>
                  <span className="font-black text-amber-300">{p.preco / 100} MT</span>
                </div>
                <h3 className="font-bold text-base mb-1">{p.nome}</h3>
                <p className="text-xs text-slate-400">{p.descricao}</p>
                {selected === p.id && <CheckCircle2 className="mt-3 text-amber-400" size={18} />}
              </button>
            ))}
          </div>
        )}

        {selected && (
          <div className="rounded-2xl bg-[#16121f]/80 border border-white/5 p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Package className="text-amber-400" size={24} />
              <h2 className="text-xl font-bold">Concluir Pedido</h2>
            </div>
            <input placeholder="Nome completo" className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" onChange={e => setForm({ ...form, nome: e.target.value })} />
            <input placeholder="Telemóvel (M-Pesa)" className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" onChange={e => setForm({ ...form, telefone: e.target.value })} />
            <button onClick={comprar} disabled={state.tipo === "loading"} className="w-full rounded-xl bg-amber-400 text-black font-black py-4 hover:bg-amber-300 transition shadow-lg shadow-amber-400/20 disabled:opacity-50">
              {state.tipo === "loading" ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Confirmar e Gerar Referência M-Pesa"}
            </button>
          </div>
        )}
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Sistema auto-sustentável · Fluxo Cidadão · 2026</footer>
    </main>
  );
}
