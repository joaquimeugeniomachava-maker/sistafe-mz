"use client";
import { useState } from "react";
import { TrendingUp, Globe, Mail, Smartphone, CreditCard, Video, Image as ImageIcon, Target, Zap, CheckCircle2 } from "lucide-react";

export default function MegaBrainPage() {
  const [vendas, setVendas] = useState([
    { hora: "03:42", produto: "Manual SISTAFE", valor: 500, status: "Pago" },
    { hora: "07:15", produto: "Consultoria CV", valor: 2000, status: "Aguardando" },
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0a05] to-[#050505] text-amber-50">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c2410c44_0%,transparent_70%)]" />
        <h1 className="relative z-10 text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-rose-400 to-amber-600 drop-shadow-[0_0_40px_rgba(194,65,12,0.5)]">
          MODO ULTRA
        </h1>
        <p className="relative z-10 mt-4 text-xl text-amber-200 font-bold tracking-wide uppercase">Mega Brain Agressivo — Sócio Estratégico</p>
        <p className="relative z-10 mt-3 text-sm text-amber-100/60 max-w-xl mx-auto">Sem enrolação. Sem arquitetura. Só resultados. Vamos construir o teu império, Joaquim.</p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* Status do Empresário */}
        <section className="rounded-3xl bg-gradient-to-r from-amber-600/10 to-rose-600/10 border border-amber-500/20 p-8 shadow-[0_0_60px_rgba(194,65,12,0.15)]">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-amber-400" size={32} />
            <h2 className="text-3xl font-black">Dashboard — Vendas em Tempo Real</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0f0f12] rounded-2xl p-6 border border-white/5">
              <p className="text-xs uppercase tracking-wider text-slate-400">Total Hoje</p>
              <p className="text-4xl font-black text-amber-300">2.500 MT</p>
            </div>
            <div className="bg-[#0f0f12] rounded-2xl p-6 border border-white/5">
              <p className="text-xs uppercase tracking-wider text-slate-400">Aguardando</p>
              <p className="text-4xl font-black text-rose-400">1.500 MT</p>
            </div>
            <div className="bg-[#0f0f12] rounded-2xl p-6 border border-white/5">
              <p className="text-xs uppercase tracking-wider text-slate-400">Objetivo Mês</p>
              <p className="text-4xl font-black text-emerald-300">50.000 MT</p>
            </div>
          </div>
          <div className="mt-8 bg-[#0f0f12] rounded-2xl border border-white/5 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-amber-500/10 text-amber-200 uppercase text-xs">
                <tr><th className="p-4">Hora</th><th>Produto</th><th>Valor</th><th>Status</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {vendas.map((v, i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-mono text-xs">{v.hora}</td>
                    <td className="p-4">{v.produto}</td>
                    <td className="p-4 font-bold">{v.valor} MT</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-md text-xs font-bold ${v.status === "Pago" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>{v.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Kit do Empresário — Redes + Email + Número */}
        <section>
          <h2 className="text-3xl font-black mb-2">Kit do Empresário — Presença Digital</h2>
          <p className="text-amber-200/80 mb-8">Não é teoria. São ações que podes executar esta semana.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="bg-[#16121f] rounded-3xl p-8 border border-white/5 hover:border-amber-400/40 transition shadow-xl">
              <Mail className="text-amber-300 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Email Corporativo</h3>
              <p className="text-sm text-slate-300 mb-4">joaquim.machava@negocio.maputo (exemplo). Usa <strong>Google Workspace</strong> ou <strong>ProtonMail</strong> para criar um domínio profissional.</p>
              <ul className="text-xs space-y-2 text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400"/> Assinatura automática com CV</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400"/> Resposta automática em 24h</li>
              </ul>
            </div>

            {/* Número Virtual */}
            <div className="bg-[#16121f] rounded-3xl p-8 border border-white/5 hover:border-rose-400/40 transition shadow-xl">
              <Smartphone className="text-rose-300 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Número Virtual</h3>
              <p className="text-sm text-slate-300 mb-4"><strong>Google Voice</strong> ou <strong>TextNow</strong> para um número americano. Usa <strong>Twilio</strong> para receber SMS internacionais se venderes para fora.</p>
              <ul className="text-xs space-y-2 text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400"/> Separar vida pessoal de negócios</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400"/> WhatsApp Business com número dedicado</li>
              </ul>
            </div>

            {/* Conta Estrangeira */}
            <div className="bg-[#16121f] rounded-3xl p-8 border border-white/5 hover:border-emerald-400/40 transition shadow-xl">
              <CreditCard className="text-emerald-300 mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Conta & Dinheiro</h3>
              <p className="text-sm text-slate-300 mb-4"><strong>Wise (TransferWise)</strong> — conta multimoeda gratuita. Recebe em USD, EUR, GBP. <strong>PayPal</strong> para pagamentos rápidos.</p>
              <ul className="text-xs space-y-2 text-slate-400">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400"/> Conta gratuita, sem mensalidade</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400"/> Cartão físico para compras internacionais</li>
              </ul>
            </div>
          </div>
        </section>

        {/* YouTube + Instagram — Estratégia Agressiva */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-900/20 to-red-950/30 rounded-3xl p-8 border border-red-500/20 shadow-xl">
            <Video className="text-red-500 mb-4" size={36} />
            <h3 className="text-2xl font-black mb-3">Canal YouTube — "Joaquim no SISTAFE"</h3>
            <p className="text-sm text-slate-200 mb-4">Não precisas de câmara profissional. Usa o telemóvel. O conteúdo que vende:</p>
            <ul className="text-sm space-y-2 text-red-100/90">
              <li>• "Como consegui o NUIT em 5 dias" (série real)</li>
              <li>• "O que ninguém te conta sobre o SISTAFE" (polémica)</li>
              <li>• "Um dia na vida de um intermediário imobiliário em Maputo"</li>
            </ul>
            <div className="mt-6 p-4 bg-red-950/40 rounded-xl border border-red-500/10">
              <p className="text-xs text-red-300 font-bold uppercase tracking-wider mb-1">Meta Agressiva</p>
              <p className="text-2xl font-black">1 vídeo / semana</p>
              <p className="text-xs text-slate-400">Monetização ativa após 1.000 subscritores + 4.000 horas.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-900/20 to-rose-950/30 rounded-3xl p-8 border border-pink-500/20 shadow-xl">
            <ImageIcon className="text-pink-500 mb-4" size={36} />
            <h3 className="text-2xl font-black mb-3">Instagram — "O Homem do SISTAFE"</h3>
            <p className="text-sm text-slate-200 mb-4">Carrosséis de 3 slides com gancho + fato + chamada para ação. Modelo que funciona em Moçambique:</p>
            <ul className="text-sm space-y-2 text-pink-100/90">
              <li>• Slide 1: "O salário não chega?" (gancho)</li>
              <li>• Slide 2: Fato do SISTAFE ou preço de transporte</li>
              <li>• Slide 3: "Segue para o manual completo" (link na bio)</li>
            </ul>
            <div className="mt-6 p-4 bg-pink-950/40 rounded-xl border border-pink-500/10">
              <p className="text-xs text-pink-300 font-bold uppercase tracking-wider mb-1">Meta Agressiva</p>
              <p className="text-2xl font-black">1 publicação / dia</p>
              <p className="text-xs text-slate-400">Stories com votação + resposta direta para gerar leads.</p>
            </div>
          </div>
        </section>

        {/* Estratégia de Vendas Automáticas */}
        <section className="rounded-3xl bg-gradient-to-r from-amber-700/10 to-rose-700/10 border border-amber-500/20 p-8 md:p-12 shadow-[0_0_60px_rgba(194,65,12,0.2)]">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-amber-300" size={32} />
            <h2 className="text-3xl font-black">Como Ganhar Enquanto Dormes</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { titulo: "Produto Digital", desc: "Manual SISTAFE (PDF) — 500 MT. Vendes enquanto dormes.", meta: "10 vendas/mês = 5.000 MT" },
              { titulo: "Consultoria", desc: "Ajuda a obter o NUIT ou fazer CV — 2.000 MT por cliente.", meta: "2 clientes/mês = 4.000 MT" },
              { titulo: "Comissão", desc: "Parceiro com construtor — 5% por venda. Imóvel = 50.000 MT = 2.500 MT.", meta: "1 venda/mês = 2.500 MT" },
              { titulo: "Conteúdo", desc: "YouTube + Instagram → anúncios locais (café, escola) pagam 500-1.500 MT/mês.", meta: "3 parceiros = 3.000 MT" },
            ].map(card => (
              <div key={card.titulo} className="bg-[#0f0f12] rounded-2xl p-6 border border-white/5 hover:border-amber-400/30 transition">
                <h4 className="font-black text-lg text-amber-200 mb-2">{card.titulo}</h4>
                <p className="text-xs text-slate-300 mb-3">{card.desc}</p>
                <p className="text-xs font-bold text-amber-400">{card.meta}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-black/30 rounded-2xl border border-amber-500/10">
            <h4 className="font-bold text-amber-200 mb-3">Plano de Ataque — Próximas 72 Horas</h4>
            <ol className="space-y-2 text-sm text-slate-200">
              <li className="flex gap-3"><span className="font-black text-amber-400">01.</span> Cria o email corporativo (joaquim.machava@negocio.maputo)</li>
              <li className="flex gap-3"><span className="font-black text-amber-400">02.</span> Regista conta Wise (gratuita) — recebe os primeiros 500 MT do manual</li>
              <li className="flex gap-3"><span className="font-black text-amber-400">03.</span> Publica 1 carrossel no Instagram com gancho do SISTAFE</li>
              <li className="flex gap-3"><span className="font-black text-amber-400">04.</span> Grava 1 vídeo de 60 segundos no telemóvel — "Como consegui o NUIT"</li>
            </ol>
          </div>
        </section>

      </section>

      <footer className="text-center text-amber-500/40 text-xs pb-12">
        Modo Ultra Pro — Sócio Estratégico Ativo. Nenhum fato inventado. Nenhuma promessa vazia. Só execução.
      </footer>
    </main>
  );
}
