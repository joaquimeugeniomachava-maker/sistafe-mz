"use client";
import { Brain, BookOpen, Calculator, Users, Heart, Compass, Download, ArrowRight, Cpu } from "lucide-react";

const CEREBROS = [
  { nome: "MESTRE", papel: "Coordenador geral", desc: "Recebe qualquer pergunta, classifica e dirige para o cérebro certo. Tem a base de conhecimento confirmada embutida (leis, siglas, Regra da Ferida).", modelo: "llama3.1:8b", temp: "0.2", cmd: "ollama run mestre", icone: <Brain size={28} />, cor: "text-violet-400", bg: "from-violet-900/30 to-violet-950/20", border: "border-violet-500/25", inteligencia: "Todas" },
  { nome: "LINGUISTA", papel: "Textos, CVs, conteúdo", desc: "Escreve em português de Moçambique. Adapta o tom: formal (documentos), informal (WhatsApp), persuasivo (Facebook). Formata CVs e documentos oficiais.", modelo: "llama3.1:8b", temp: "0.3", cmd: "ollama run linguista", icone: <BookOpen size={28} />, cor: "text-sky-400", bg: "from-sky-900/30 to-sky-950/20", border: "border-sky-500/25", inteligencia: "Linguística" },
  { nome: "LÓGICO", papel: "Cálculos, orçamentos, tabelas", desc: "Mostra cálculos passo a passo. Usa meticais (MT). Orçamentos, cabimentação, dotações, preços. Se o número não é exacto, diz que é estimativa.", modelo: "qwen2.5:7b", temp: "0.1", cmd: "ollama run logico", icone: <Calculator size={28} />, cor: "text-emerald-400", bg: "from-emerald-900/30 to-emerald-950/20", border: "border-emerald-500/25", inteligencia: "Lógico-Matemática" },
  { nome: "ESTRATEGA", papel: "Planos, negócios, relações", desc: "Planeia, negoceia, organiza. Visualiza processos, mapeia relações entre pessoas e instituições. Estratégia de vendas e parcerias. Dá planos com prazos.", modelo: "llama3.1:8b", temp: "0.3", cmd: "ollama run estratega", icone: <Compass size={28} />, cor: "text-amber-400", bg: "from-amber-900/30 to-amber-950/20", border: "border-amber-500/25", inteligencia: "Espacial + Interpessoal" },
  { nome: "CONSELHEIRO", papel: "Reflexão, motivação, prioridades", desc: "Gestão de tempo, prioridades, equilíbrio trabalho-família, disciplina, hábitos. Honesto mas encorajador. Pergunta antes de assumir.", modelo: "llama3.1:8b", temp: "0.4", cmd: "ollama run conselheiro", icone: <Heart size={28} />, cor: "text-rose-400", bg: "from-rose-900/30 to-rose-950/20", border: "border-rose-500/25", inteligencia: "Intrapessoal" },
];

const FLUXO = [
  { n: 1, titulo: "Tu perguntas", desc: "Escreves a dúvida no MESTRE." },
  { n: 2, titulo: "MESTRE classifica", desc: "Identifica: é texto? cálculo? plano? reflexão?" },
  { n: 3, titulo: "Dirige ao cérebro", desc: "Diz: 'Para isto, usa o LÓGICO: ollama run logico'" },
  { n: 4, titulo: "Cérebro responde", desc: "Resposta especializada com o rigor daquele papel." },
  { n: 5, titulo: "Log gravado", desc: "A interacção fica no log (pasta logs/)." },
];

const PLANO = [
  { dia: "Dia 1", accao: "Descarrega o kit e instala o Ollama (20 min)", feito: false },
  { dia: "Dia 1", accao: "Corre o kit-elite-windows.bat (espera os downloads)", feito: false },
  { dia: "Dia 2", accao: "Abre INICIAR.bat → testa cada cérebro com 1 pergunta", feito: false },
  { dia: "Dia 3", accao: "Usa o LINGUISTA para escrever 1 post para o Facebook", feito: false },
  { dia: "Dia 4", accao: "Usa o LÓGICO para calcular 1 orçamento", feito: false },
  { dia: "Dia 5", accao: "Usa o ESTRATEGA para planear a semana de vendas", feito: false },
  { dia: "Dia 6", accao: "Usa o CONSELHEIRO para reflectir sobre prioridades", feito: false },
  { dia: "Dia 7", accao: "Decide: qual cérebro mais usaste? É esse o teu principal.", feito: false },
];

export default function IAElitePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0a12] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-violet-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#7c3aed44_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-violet-300 via-fuchsia-400 to-violet-500">Sistema de IA Local de Elite</h1>
        <p className="relative z-10 mt-4 text-violet-200/70 max-w-2xl mx-auto">5 cérebros especializados. Offline. Windows. Sem internet. Sem mensalidade. Para sempre.</p>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* Arquitectura visual */}
        <section>
          <h2 className="text-2xl font-black mb-2 text-center">A arquitectura — 5 inteligências</h2>
          <p className="text-sm text-slate-400 text-center mb-8">Cada cérebro tem um papel fixo. O modelo por trás pode mudar — o papel nunca muda.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CEREBROS.map(c => (
              <div key={c.nome} className={`rounded-3xl bg-gradient-to-b ${c.bg} border ${c.border} p-6`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={c.cor}>{c.icone}</div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10">{c.inteligencia}</span>
                </div>
                <h3 className="font-black text-lg">{c.nome}</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">{c.papel}</p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{c.desc}</p>
                <div className="mt-4 flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-slate-500">{c.modelo} · temp {c.temp}</span>
                  <code className="text-violet-300 font-mono bg-violet-500/10 px-2 py-0.5 rounded-md">{c.cmd}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fluxo automático */}
        <section>
          <h2 className="text-2xl font-black mb-6 text-center">Fluxo automático — como funciona</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-1">
            {FLUXO.map((f, i) => (
              <div key={f.n} className="flex items-center gap-1">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-center w-40">
                  <span className="text-xl font-black text-violet-400">{f.n}</span>
                  <p className="font-bold text-xs mt-1">{f.titulo}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{f.desc}</p>
                </div>
                {i < FLUXO.length - 1 && <ArrowRight size={16} className="text-slate-600 rotate-90 md:rotate-0 shrink-0" />}
              </div>
            ))}
          </div>
        </section>

        {/* Download */}
        <section className="rounded-3xl bg-gradient-to-r from-violet-900/25 to-fuchsia-900/25 border border-violet-500/25 p-8 text-center">
          <Cpu className="mx-auto text-violet-400 mb-4" size={40} />
          <h2 className="text-2xl font-black mb-2">Descarregar o Kit — Windows</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-lg mx-auto">Um único ficheiro .bat que instala tudo: 3 modelos + 5 cérebros + base de conhecimento + menu INICIAR. Clica duas vezes e espera.</p>
          <a href="/kit-elite-windows.bat" download className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-violet-400 text-black font-black text-sm hover:bg-violet-300 transition shadow-lg shadow-violet-400/25">
            <Download size={18} /> Descarregar kit-elite-windows.bat
          </a>
          <div className="mt-6 text-xs text-slate-400 space-y-1">
            <p><strong>Pré-requisito:</strong> instalar o Ollama primeiro → <a href="https://ollama.com/download/windows" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">ollama.com/download/windows</a></p>
            <p><strong>RAM mínima:</strong> 8 GB (16 GB recomendado)</p>
            <p><strong>Espaço:</strong> ~15 GB para os 3 modelos</p>
          </div>
        </section>

        {/* Como usar */}
        <section>
          <h2 className="text-2xl font-black mb-6">Como usar no dia a dia</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
              <h3 className="font-bold text-sky-300 mb-2">Preciso de escrever um texto</h3>
              <p className="text-xs text-slate-400">Abre INICIAR.bat → opção 2 (LINGUISTA)</p>
              <p className="text-xs text-slate-300 mt-1 italic">"Escreve um post para Facebook sobre o e-SISTAFE, tom informal, com gancho nos primeiros 5 segundos."</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
              <h3 className="font-bold text-emerald-300 mb-2">Preciso de calcular um orçamento</h3>
              <p className="text-xs text-slate-400">Abre INICIAR.bat → opção 3 (LÓGICO)</p>
              <p className="text-xs text-slate-300 mt-1 italic">"Calcula quanto custa uma formação para 20 pessoas, com almoço a 500 MT e sala a 3.000 MT por dia, durante 3 dias."</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
              <h3 className="font-bold text-amber-300 mb-2">Preciso de um plano de vendas</h3>
              <p className="text-xs text-slate-400">Abre INICIAR.bat → opção 4 (ESTRATEGA)</p>
              <p className="text-xs text-slate-300 mt-1 italic">"Faz um plano para vender 10 manuais do e-SISTAFE esta semana, usando WhatsApp e Facebook."</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
              <h3 className="font-bold text-rose-300 mb-2">Preciso de organizar prioridades</h3>
              <p className="text-xs text-slate-400">Abre INICIAR.bat → opção 5 (CONSELHEIRO)</p>
              <p className="text-xs text-slate-300 mt-1 italic">"Tenho 3 tarefas urgentes e 2 prazos amanhã. Ajuda-me a priorizar."</p>
            </div>
          </div>
        </section>

        {/* Plano de 7 dias */}
        <section>
          <h2 className="text-2xl font-black mb-6">Plano de implementação — 7 dias</h2>
          <div className="space-y-2">
            {PLANO.map((p, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="shrink-0 font-black text-violet-400 text-xs w-12">{p.dia}</span>
                <p className="text-sm text-slate-300">{p.accao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Download do projecto completo */}
        <section className="rounded-3xl bg-gradient-to-r from-amber-900/20 to-rose-900/20 border border-amber-500/20 p-8 text-center">
          <h2 className="text-2xl font-black mb-2">Projecto completo (documento)</h2>
          <p className="text-sm text-slate-300 mb-6 max-w-lg mx-auto">Arquitectura, 10 módulos, fluxos, prompts, classificação, feedback, plano de evolução — tudo num ficheiro .md para guardar no flash.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/projecto-ia-elite-v3.md" download className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-400 text-black font-black text-sm hover:bg-amber-300 transition shadow-lg shadow-amber-400/25">
              <Download size={18} /> Projecto completo (.md)
            </a>
            <a href="/kit-elite-windows.bat" download className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-violet-400 text-black font-black text-sm hover:bg-violet-300 transition shadow-lg shadow-violet-400/25">
              <Download size={18} /> Kit Windows (.bat)
            </a>
          </div>
        </section>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Sistema de IA Local de Elite · 5 Cérebros · Offline · Windows · Joaquim Eugénio Machava</footer>
    </main>
  );
}
