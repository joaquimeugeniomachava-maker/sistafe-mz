"use client";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, Lightbulb, ChevronDown } from "lucide-react";

interface Erro { n: number; titulo: string; consequencia: string; evitar: string; }

const ERROS: Erro[] = [
  { n: 1, titulo: "Perfil errado no utilizador", consequencia: "Alguém que só devia consultar recebe permissões de execução, ou alguém da conformidade recebe perfil de pagamento. Cria risco de fraude e quebra de segregação de funções.", evitar: "Atribuir o perfil exacto à função. Rever acessos periodicamente (Administrador de Segurança)." },
  { n: 2, titulo: "Falta de segregação de funções", consequencia: "A mesma pessoa prepara, valida e executa a mesma despesa. Gera fragilidade de controlo e compromete auditorias.", evitar: "Garantir que conformidade e execução são feitas por pessoas diferentes." },
  { n: 3, titulo: "Cabimento sem saldo suficiente", consequencia: "A despesa é lançada sem saldo na dotação. O processo falha ou fica irregular.", evitar: "Confirmar a cobertura orçamental e a rubrica correcta antes de executar." },
  { n: 4, titulo: "Classificação orçamental errada", consequencia: "Rubrica, actividade, programa ou unidade orgânica errada. A despesa fica mal registada e dá trabalho corrigir.", evitar: "Verificar a rubrica e a actividade antes de lançar." },
  { n: 5, titulo: "Documentação incompleta", consequencia: "Faltam anexos, despacho, proposta, factura, contrato ou termo de recepção. O processo é recusado ou devolvido.", evitar: "Conferir todos os documentos exigidos antes da submissão." },
  { n: 6, titulo: "Processo sem sequência lógica", consequencia: "Despesa lançada antes do despacho, ou pagamento antes da liquidação. O e-SISTAFE é sequencial — saltar etapas gera inconsistência.", evitar: "Seguir a ordem do fluxo: cabimento → conformidade → execução → liquidação → pagamento." },
  { n: 7, titulo: "Dados do fornecedor errados", consequencia: "Erro no NUIT, nome, conta bancária ou referência causa bloqueios e devoluções.", evitar: "Validar os dados do fornecedor antes de submeter." },
  { n: 8, titulo: "Uso indevido do perfil de consulta", consequencia: "Tentar operar com perfil só de consulta. Atrasa o trabalho e revela má gestão de acessos.", evitar: "Solicitar o perfil adequado à função; o Administrador de Segurança ajusta os acessos." },
  { n: 9, titulo: "Não conferir a conformidade antes do envio", consequencia: "Processos devolvidos por pequenos erros que uma revisão interna evitaria.", evitar: "Checagem final: valores, datas, rubricas, anexos e assinaturas." },
  { n: 10, titulo: "Registo tardio", consequencia: "Registo depois da execução física/financeira cria desencontro entre o feito e o que está no sistema.", evitar: "Manter o sistema actualizado quase em tempo real — registo logo após a operação." },
];

const BOAS_PRATICAS = [
  "Confirmar o perfil certo para cada função.",
  "Revisar a dotação antes de cabimentar.",
  "Verificar a rubrica e a actividade antes de lançar.",
  "Conferir todos os documentos antes da submissão.",
  "Garantir que conformidade e execução são feitas por pessoas diferentes.",
  "Validar os dados do fornecedor.",
  "Fazer registo logo após a operação, sem atrasos.",
];

const MEMORIZAR = [
  { papel: "Consulta", accao: "vê" },
  { papel: "Execução", accao: "faz" },
  { papel: "Conformidade", accao: "confere" },
  { papel: "Autorização", accao: "aprova" },
  { papel: "Segurança", accao: "controla acessos" },
];

export default function ErrosPage() {
  const [aberto, setAberto] = useState<number | null>(1);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#120d0a] to-[#050505] text-slate-100">
      <header className="relative overflow-hidden px-6 pt-20 pb-16 text-center border-b border-orange-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ea580c33_0%,transparent_60%)]" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-orange-300 via-amber-400 to-orange-500">Erros Comuns no e-SISTAFE</h1>
        <p className="relative z-10 mt-4 text-orange-200/70 max-w-2xl mx-auto">Os 10 erros que mais travam processos — e como evitá-los no dia a dia.</p>
        <p className="relative z-10 mt-1 text-xs text-slate-500">Guia de formação prática · baseado no Manual de Execução Orçamental.</p>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-16 space-y-14">
        {/* Os 10 erros (acordeão) */}
        <section>
          <h2 className="text-2xl font-black mb-2 flex items-center gap-2"><AlertTriangle className="text-orange-400" size={24} /> Os 10 erros mais comuns</h2>
          <p className="text-sm text-slate-400 mb-6">Cada fase do processo depende da anterior. Erro na planificação, cabimentação, conformidade ou execução — e o processo trava.</p>
          <div className="space-y-3">
            {ERROS.map(e => (
              <div key={e.n} className={`rounded-2xl border transition ${aberto === e.n ? "bg-white/[0.05] border-orange-500/30" : "bg-white/[0.02] border-white/5 hover:border-white/10"}`}>
                <button onClick={() => setAberto(aberto === e.n ? null : e.n)} className="w-full flex items-center gap-4 p-4 text-left">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-orange-500/15 text-orange-300 font-black flex items-center justify-center text-sm border border-orange-500/30">{e.n}</span>
                  <span className="flex-1 font-bold text-sm">{e.titulo}</span>
                  <ChevronDown size={18} className={`text-slate-500 transition-transform ${aberto === e.n ? "rotate-180" : ""}`} />
                </button>
                {aberto === e.n && (
                  <div className="px-4 pb-4 pl-16 space-y-2">
                    <p className="text-sm text-slate-300"><span className="text-rose-300 font-semibold">Consequência:</span> {e.consequencia}</p>
                    <p className="text-sm text-slate-300 flex gap-2"><CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" /><span><span className="text-emerald-300 font-semibold">Como evitar:</span> {e.evitar}</span></p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Boas práticas */}
        <section className="rounded-3xl bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 p-8">
          <h2 className="text-2xl font-black mb-5 flex items-center gap-2"><Lightbulb className="text-emerald-400" size={24} /> Boas práticas para evitar falhas</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {BOAS_PRATICAS.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-200 bg-black/20 border border-white/5 rounded-xl p-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />{b}
              </li>
            ))}
          </ul>
        </section>

        {/* Regra de memorizar */}
        <section>
          <h2 className="text-2xl font-black mb-5">Regra simples para memorizar</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {MEMORIZAR.map(m => (
              <div key={m.papel} className="rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-3 text-center">
                <p className="font-bold text-sm">{m.papel}</p>
                <p className="text-xs text-orange-300 mt-0.5">{m.accao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Frase útil */}
        <section className="rounded-2xl bg-orange-950/20 border-l-4 border-orange-400 p-6">
          <p className="text-sm text-orange-100 italic leading-relaxed">"No e-SISTAFE, o erro mais caro não é só técnico: é processual. Se o perfil estiver errado, o cabimento falhar, a conformidade for ignorada ou a documentação estiver incompleta, o sistema apenas revela uma falha de gestão que já começou fora dele."</p>
          <p className="text-xs text-slate-500 mt-3">— Frase útil para formação interna</p>
        </section>
      </section>

      <footer className="text-center text-slate-500 text-xs pb-12">Erros Comuns · Guia de formação e-SISTAFE</footer>
    </main>
  );
}
