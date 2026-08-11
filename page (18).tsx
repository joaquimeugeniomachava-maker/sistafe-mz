"use client";
import { Download, ShieldCheck, ExternalLink } from "lucide-react";

const ELEMENTOS = [
  { e: "📖 Livro aberto", s: "Simboliza a educação." },
  { e: "🔫 Arma (AK-47)", s: "A luta de resistência ao colonialismo, a Luta Armada de Libertação Nacional e a defesa da soberania." },
  { e: "⚒️ Enxada", s: "Simboliza o campesinato." },
  { e: "☀️ Sol nascente", s: "A nova vida em construção (avermelhado, sobre campo dourado)." },
  { e: "⚙️ Roda dentada", s: "A indústria e o operariado." },
  { e: "🌽 Milho e 🎋 cana-de-açúcar", s: "A riqueza agrícola (emolduram o conjunto, com uma maçaroca)." },
  { e: "⭐ Estrela vermelha fimbriada de ouro", s: "A solidariedade entre os povos (no topo)." },
  { e: "🎗️ Faixa presidencial vermelha", s: "Os dizeres 'República de Moçambique'." },
];

export default function EmblemaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0a0a] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-14 text-center border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c2410c33_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-rose-400 to-amber-500">Emblema da República</h1>
        <p className="relative z-10 mt-4 text-amber-200/70 max-w-xl mx-auto">A versão <strong>oficial vetorial</strong> — obtida da fonte pública, não gerada.</p>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-14 space-y-12">
        {/* O emblema */}
        <section className="rounded-3xl bg-white p-8 md:p-12 flex justify-center shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/emblema_oficial.svg" alt="Emblema oficial da República de Moçambique" className="w-full max-w-sm h-auto" />
        </section>

        {/* Download */}
        <section className="rounded-3xl bg-gradient-to-r from-amber-900/20 to-rose-900/20 border border-amber-500/20 p-8">
          <h2 className="text-xl font-black mb-2">Descarregar a versão oficial</h2>
          <p className="text-sm text-slate-300 mb-5">Ficheiro vetorial (SVG) — amplia sem perder qualidade, ideal para Word, PowerPoint, design e impressão.</p>
          <div className="flex flex-wrap gap-3">
            <a href="/emblema_oficial.svg" download className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-black font-black text-sm hover:bg-amber-300 transition shadow-lg shadow-amber-400/20">
              <Download size={16} /> Descarregar SVG oficial
            </a>
            <a href="https://pt.wikipedia.org/wiki/Emblema_de_Mo%C3%A7ambique" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-slate-200 font-bold text-sm hover:bg-white/10 transition">
              <ExternalLink size={16} /> Ver na fonte oficial (Wikipedia)
            </a>
          </div>
          <p className="text-xs text-slate-500 mt-4">Fonte: ficheiro vetorial oficial (Wikimedia Commons), referenciado na página do Emblema de Moçambique.</p>
        </section>

        {/* Elementos oficiais */}
        <section>
          <h2 className="text-xl font-black mb-2 flex items-center gap-2"><ShieldCheck className="text-amber-400" size={22} /> Os elementos oficiais</h2>
          <p className="text-sm text-slate-400 mb-5">Como confirmar que é o original — todos estes elementos devem estar presentes:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {ELEMENTOS.map(el => (
              <div key={el.e} className="rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                <p className="font-bold text-sm text-amber-200">{el.e}</p>
                <p className="text-xs text-slate-400 mt-1">{el.s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Composição oficial */}
        <section className="rounded-2xl bg-white/[0.03] border border-white/5 p-6">
          <h2 className="text-xl font-black mb-3">A composição oficial</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Livro aberto sobre o qual se cruzam uma <strong>arma</strong> e uma <strong>enxada</strong>, dispostos sobre o <strong>mapa de Moçambique</strong> visto do Oceano Índico. Por baixo do mapa, o <strong>mar</strong>; por cima, o <strong>sol nascente</strong> avermelhado sobre campo dourado, delimitado por uma <strong>roda dentada</strong>. À direita e à esquerda, uma planta de <strong>milho</strong> (com maçaroca) e uma de <strong>cana-de-açúcar</strong>; entre elas, no topo, uma <strong>estrela vermelha fimbriada de ouro</strong>. Por baixo, a <strong>faixa presidencial vermelha</strong> com "República de Moçambique".
          </p>
          <div className="flex flex-wrap gap-3 mt-4 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">Adotado em <strong>1990</strong></span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Significados segundo a <strong>Constituição da República</strong></span>
          </div>
        </section>

        {/* Confirmação de autenticidade */}
        <section className="rounded-2xl bg-emerald-950/20 border border-emerald-500/20 p-5 flex items-start gap-3">
          <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-emerald-100"><strong>Autenticidade confirmada:</strong> este é o ficheiro vetorial <code className="text-emerald-300">Emblem_of_Mozambique.svg</code> — o mesmo referenciado na página oficial da Wikipedia que fornece. Não é uma recriação nem versão simplificada.</p>
        </section>

        {/* Nota de respeito */}
        <section className="rounded-2xl bg-amber-950/20 border border-amber-500/20 p-5 text-sm text-amber-100">
          <p><strong>Nota:</strong> o emblema é um <strong>símbolo nacional</strong>. Usa-o com respeito — em contextos oficiais, educativos ou de referência. A versão correta respeita a composição oficial e a inscrição da faixa; evita versões simplificadas ou com cores alteradas.</p>
        </section>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Emblema da República de Moçambique · versão oficial vetorial</footer>
    </main>
  );
}
