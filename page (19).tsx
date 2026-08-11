"use client";
import { useState } from "react";
import { Copy, CheckCircle2, MessageCircle, Share2, FileText, Smartphone, ArrowRight } from "lucide-react";

function CopyBlock({ titulo, texto, cor }: { titulo: string; texto: string; cor: string }) {
  const [copiado, setCopiado] = useState(false);
  const copiar = () => { navigator.clipboard.writeText(texto); setCopiado(true); setTimeout(() => setCopiado(false), 2000); };
  return (
    <div className={`rounded-2xl border p-5 ${cor}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-black text-sm">{titulo}</h3>
        <button onClick={copiar} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold hover:bg-white/15 transition">
          {copiado ? <><CheckCircle2 size={14} className="text-emerald-400" /> Copiado!</> : <><Copy size={14} /> Copiar</>}
        </button>
      </div>
      <pre className="text-sm leading-relaxed whitespace-pre-wrap text-slate-200 font-sans">{texto}</pre>
    </div>
  );
}

const WHATSAPP_MSG = `🏛 *MANUAL INTELIGENTE DE CONTABILIDADE PÚBLICA E e-SISTAFE*

Caros colegas,

Criei um portal de consulta *gratuito* para todos nós que trabalhamos com o e-SISTAFE.

✅ *O que encontras em segundos:*
• Glossário de 27+ siglas (CEDSIF IP, UFSA, MPO, MEX, CBS, CUT…)
• 13 perfis de operação com atribuições exactas
• Os 10 erros mais comuns — e como evitá-los
• Ciclo completo da despesa (8 passos + MEX 11 + PLC 7)
• Base legal verificada (Lei 14/2020, Decreto 79/2022, Decreto 42/2018)

🔗 *Acede aqui:*
[COLE O SEU LINK AQUI]

👆 Abre no telemóvel ou no computador. Pesquisa por sigla, perfil ou processo — encontras a resposta em 3 segundos.

💡 Se achares útil, partilha com colegas de outros sectores. Isto cobre *todo o país*.

Joaquim Eugénio Machava
844 898 420`;

const WHATSAPP_GRUPO = `🎓 *FORMAÇÃO e-SISTAFE — GRUPO DE APOIO*

Caros formandos do CEDSIF,

Sabem aquela dúvida que aparece no trabalho e ninguém responde rápido?

Criei um *Manual Inteligente* que responde em segundos:
📖 Siglas → o que significa cada uma
👤 Perfis → o que podes e não podes fazer
⚠️ Erros → os 10 que mais travam processos
🔄 Fluxo → passo a passo da despesa até ao pagamento

🔗 *Link gratuito:*
[COLE O SEU LINK AQUI]

Experimentem pesquisar "cabimento" ou "conformidade" — vão ver.

Boas práticas,
Joaquim Eugénio Machava`;

const FB_POST = `Você sabe o que acontece com o seu dinheiro depois que o Estado o cobra?

🏛 Eu também não sabia. Até entrar no e-SISTAFE.

Passei meses a estudar como funciona o sistema financeiro do Estado moçambicano — os 5 subsistemas, os 13 perfis de operação, os erros que travam processos em todo o país.

E descobri uma coisa:
👉 A maioria dos funcionários públicos *não domina* o sistema que opera todos os dias.

Não por culpa deles. É porque *ninguém organizou isto de forma simples*.

Até agora.

Criei o Manual Inteligente de Contabilidade Pública e e-SISTAFE — um portal gratuito onde qualquer gestor ou técnico encontra a resposta em 3 segundos:

✅ 27+ siglas descodificadas
✅ 13 perfis com "pode fazer / não pode fazer"
✅ 10 erros comuns com a solução
✅ O ciclo completo da despesa pública
✅ Base legal verificada na Imprensa Nacional

🔗 Acede aqui: [COLE O SEU LINK AQUI]

Se trabalhas na administração pública, isto é para ti.
Se conheces alguém que trabalha — partilha. Isto cobre *todo o país*.

📚 Porque o erro mais caro no e-SISTAFE não é técnico — é processual. E a melhor forma de o evitar é ter a informação certa, no momento certo.

#eSISTAFE #ContabilidadePública #Moçambique #AdministraçãoPública #CEDSIF #UFSA #FormaçãoProfissional #ServiçoPúblico`;

const FB_SATIRICO = `URGENTE 🚨

Descobriram um VÍRUS nos computadores do Estado moçambicano.

Chama-se: "Não-Sei-Qual-É-A-Rubrica"

Sintomas:
😰 Cabimento sem saldo
📄 Documentação incompleta
🔄 Processo devolvido 47 vezes
😵 Conformidade ignorada
💸 Pagamento antes da liquidação

Cientistas (eu) dizem que o antivírus é GRATUITO:

🔗 [COLE O SEU LINK AQUI]

O Manual Inteligente de Contabilidade Pública e e-SISTAFE.

Encontra a resposta em 3 segundos. Sem desculpa.

Partilha antes que o vírus se espalhe para o teu sector. 🦠

#eSISTAFE #HumorPúblico #Moçambique #AdministraçãoPública`;

const PASSOS = [
  "Abre esta página no computador do serviço ou no telemóvel.",
  "Copia a mensagem do WhatsApp (botão 'Copiar') e cola no teu grupo de formação do CEDSIF.",
  "Onde diz [COLE O SEU LINK AQUI], substitui pelo link do teu portal (ver abaixo).",
  "Copia o post do Facebook e cola no teu perfil/página. Adiciona a imagem viral (descarrega abaixo).",
  "No Word: abre o Word → Inserir → Imagem → seleciona o ficheiro emblema_oficial.svg do teu flash → Inserir.",
  "Aguarda 24-48h. Responde a quem comentar ou perguntar. Cada resposta é uma oportunidade de venda.",
];

export default function LancamentoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0a12] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c2410c44_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-rose-400 to-amber-500">Lançamento</h1>
        <p className="relative z-10 mt-4 text-amber-200/70 max-w-xl mx-auto">Tudo pronto para copiar, colar e publicar. Sem ginástica.</p>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        {/* Passo a passo */}
        <section>
          <h2 className="text-2xl font-black mb-5 flex items-center gap-2"><Smartphone className="text-amber-400" size={24} /> Passo a passo — começa agora</h2>
          <div className="space-y-3">
            {PASSOS.map((p, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="shrink-0 w-8 h-8 rounded-full bg-amber-400 text-black font-black flex items-center justify-center text-sm">{i + 1}</span>
                <p className="text-sm text-slate-200">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* O teu link */}
        <section className="rounded-2xl bg-emerald-950/20 border border-emerald-500/20 p-6">
          <h2 className="text-xl font-black text-emerald-300 mb-2">O teu link</h2>
          <p className="text-sm text-slate-300 mb-3">Quando o site estiver publicado num domínio (ex: Vercel, Netlify), o link será tipo <code className="text-emerald-300">manual-sistafe.vercel.app</code>. Por agora, o link de preview é:</p>
          <div className="bg-black/30 rounded-xl p-4 font-mono text-sm text-emerald-200 break-all">
            O link que aparece no topo do navegador quando abres o site. Copia esse link e cola onde diz [COLE O SEU LINK AQUI].
          </div>
          <p className="text-xs text-slate-500 mt-3">Para publicar grátis de forma permanente: cria conta no <strong>Vercel</strong> (vercel.com) — grátis, sem cartão — e o link fica fixo para sempre.</p>
        </section>

        {/* WhatsApp */}
        <section>
          <h2 className="text-2xl font-black mb-5 flex items-center gap-2"><MessageCircle className="text-emerald-400" size={24} /> WhatsApp — copia e cola</h2>
          <div className="space-y-6">
            <CopyBlock titulo="Mensagem geral (contactos e colegas)" texto={WHATSAPP_MSG} cor="bg-emerald-950/20 border-emerald-500/20" />
            <CopyBlock titulo="Grupo de formação CEDSIF" texto={WHATSAPP_GRUPO} cor="bg-teal-950/20 border-teal-500/20" />
          </div>
        </section>

        {/* Facebook */}
        <section>
          <h2 className="text-2xl font-black mb-5 flex items-center gap-2"><Share2 className="text-sky-400" size={24} /> Facebook — conteúdo viral</h2>
          <div className="space-y-6">
            <CopyBlock titulo="Post sério (reputação e alcance)" texto={FB_POST} cor="bg-sky-950/20 border-sky-500/20" />
            <CopyBlock titulo="Post satírico (viral — hackeia o algoritmo)" texto={FB_SATIRICO} cor="bg-rose-950/20 border-rose-500/20" />
          </div>
        </section>

        {/* Imagens para download */}
        <section>
          <h2 className="text-2xl font-black mb-5 flex items-center gap-2"><FileText className="text-amber-400" size={24} /> Imagens para o Facebook</h2>
          <p className="text-sm text-slate-400 mb-4">Descarrega no teu computador, depois anexa ao post do Facebook (Foto/Vídeo → seleciona o ficheiro).</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/fb-viral.jpg" alt="Post viral 1" className="w-full h-40 object-cover" />
              <div className="p-4">
                <a href="/images/fb-viral.jpg" download className="flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-full bg-amber-400 text-black font-bold text-sm hover:bg-amber-300 transition">
                  Descarregar imagem 1
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/fb-viral2.jpg" alt="Post viral 2" className="w-full h-40 object-cover" />
              <div className="p-4">
                <a href="/images/fb-viral2.jpg" download className="flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-full bg-amber-400 text-black font-bold text-sm hover:bg-amber-300 transition">
                  Descarregar imagem 2
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Emblema no Word */}
        <section className="rounded-2xl bg-amber-950/20 border border-amber-500/20 p-6">
          <h2 className="text-xl font-black text-amber-200 mb-3">Como colocar o emblema no Word</h2>
          <ol className="space-y-2 text-sm text-slate-200">
            <li className="flex gap-3"><span className="font-black text-amber-400">1.</span> Descarrega o emblema: <a href="/emblema_oficial.svg" download className="text-amber-400 font-bold hover:underline">clica aqui</a> (ficheiro SVG).</li>
            <li className="flex gap-3"><span className="font-black text-amber-400">2.</span> Abre o Word → separador <strong>Inserir</strong> → <strong>Imagens</strong> → <strong>Este Dispositivo</strong>.</li>
            <li className="flex gap-3"><span className="font-black text-amber-400">3.</span> Navega até ao ficheiro <code className="text-amber-300">emblema_oficial.svg</code> → <strong>Inserir</strong>.</li>
            <li className="flex gap-3"><span className="font-black text-amber-400">4.</span> Redimensiona arrastando os cantos. O SVG nunca perde qualidade.</li>
            <li className="flex gap-3"><span className="font-black text-amber-400">5.</span> Se o Word não aceitar SVG (versões antigas): abre o SVG no navegador → clica com botão direito → "Guardar imagem como" PNG → insere o PNG no Word.</li>
          </ol>
        </section>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Lançamento · Joaquim Eugénio Machava · 2026</footer>
    </main>
  );
}
