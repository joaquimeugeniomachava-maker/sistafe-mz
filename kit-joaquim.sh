#!/bin/bash
# ============================================================
#  KIT JOAQUIM — EXÉRCITO DE IA TUDO-EM-UM (FLASH 32GB)
#  Versão 2.0 · Open Source · Offline First · 20 anos
#
#  Um único script que faz TUDO:
#    1. Instala o Ollama
#    2. Cria a estrutura do flash
#    3. Baixa o exército (8B + 7B + 3B) com fallback
#    4. Grava o Modelfile (Prompt Master embutido)
#    5. Cria a base de conhecimento inicial
#    6. Cria scripts de teste e logging
#    7. Corre o teste anti-alucinação
#
#  USO:  chmod +x kit-joaquim.sh && ./kit-joaquim.sh
# ============================================================
set -e
FLASH="$HOME/IA_JOAQUIM"
echo "🏛  KIT JOAQUIM — a preparar o teu exército em $FLASH"

# ---------- 1. ESTRUTURA ----------
mkdir -p "$FLASH"/{memoria,documentos,backups,scripts,logs}
echo "✓ Estrutura criada"

# ---------- 2. OLLAMA ----------
if ! command -v ollama >/dev/null 2>&1; then
  echo "→ A instalar o Ollama..."
  curl -fsSL https://ollama.com/install.sh | sh
else
  echo "✓ Ollama já instalado: $(ollama --version 2>/dev/null || true)"
fi

# ---------- 3. EXÉRCITO (com fallback) ----------
echo "→ A baixar o Cérebro Central (8B)..."
ollama pull llama3.1:8b || echo "⚠ 8B falhou — fallback: ollama pull mistral:7b"
echo "→ A baixar o Raciocínio Lógico (7B)..."
ollama pull qwen2.5:7b  || echo "⚠ 7B falhou — fallback: ollama pull llama3.1:8b"
echo "→ A baixar o Batedor Rápido (3B)..."
ollama pull phi3.5      || echo "⚠ 3B falhou — fallback: ollama pull gemma2:2b"
ollama list > "$FLASH/logs/modelos_instalados.txt"
echo "✓ Modelos:"; cat "$FLASH/logs/modelos_instalados.txt"

# ---------- 4. MODELFILE (Prompt Master embutido) ----------
cat > "$FLASH/scripts/Modelfile" << 'MODELO'
FROM llama3.1:8b

SYSTEM """
TU ÉS O CÉREBRO CENTRAL DO SISTEMA PESSOAL DE JOAQUIM.

ESCOPO FIXO (não expandir sozinho):
1. Formação SISTAFE  2. Conteúdo social  3. Organização pessoal
Fora disto: "Fora do escopo atual."

REGRAS INVARIANTES:
- NUNCA inventar factos, siglas, artigos, decretos ou números.
- Toda afirmação factual tem fonte citável.
- Se não sabes: "Não sei. Precisa de confirmação na fonte oficial."

ESTADOS (só três): ✅ VERIFICADO · ⚠️ NÃO VERIFICADO · ❓ INCONCLUSIVO

COMO VERIFICAR antes de marcar ✅:
1. Consigo nomear a fonte exacta? 2. Ela é citável/publica? 3. Se não: ⚠️ ou ❓.

REGRA DA FERIDA: nenhuma sigla expandida sem confirmação.
(CBS = Catálogo de Bens e Serviços — confirmado.)

FORMATO: 📌 Resposta essencial · 📋 Detalhes · 📎 Fontes · ⚠️ Incertezas · 🔧 Próximo passo
"""

PARAMETER temperature 0.2
PARAMETER top_p 0.9
PARAMETER num_ctx 8192
MODELO
ollama create joaquim -f "$FLASH/scripts/Modelfile" && echo "✓ Modelo 'joaquim' criado"

# ---------- 5. BASE DE CONHECIMENTO ----------
cat > "$FLASH/memoria/base_confirmada.md" << 'BASE'
# BASE DE CONHECIMENTO CONFIRMADA (actualizar aqui)
- SISTAFE → Lei n.º 14/2020, de 23 de Dezembro
- EGFAE (vigente) → Lei n.º 4/2022, de 11 de Fevereiro
- REGFAE (regulamento) → Decreto n.º 28/2022 (revoga Decreto 5/2018)
- Revisão constitucional → Lei n.º 1/2018, de 12 de Junho
- CRM 2004 → 306 artigos, 17 títulos
- CBS → Catálogo de Bens e Serviços (e-SISTAFE)
- CUT → Conta Única do Tesouro
- TSU → Tabela Salarial Única (Lei n.º 5/2022)
[Termo novo só entra aqui depois de confirmado.]
BASE

cat > "$FLASH/memoria/experiencia.md" << 'EXP'
# EXPERIÊNCIA (Regra da Ferida)
- ERRO: inventado "Decreto 32/2019" e expandida TSU errada como "Verificado".
- APRENDIZADO: nenhuma sigla expandida sem fonte; "Verificado" exige fonte citável.
- DESCOBERTA: não existe "Lei 28/2022" — é o DECRETO 28/2022 (REGFAE).
EXP
echo "✓ Base de conhecimento gravada"

# ---------- 6. TESTE ANTI-ALUCINAÇÃO ----------
cat > "$FLASH/scripts/teste.sh" << 'TESTE'
#!/bin/bash
FLASH="$HOME/IA_JOAQUIM"
LOG="$FLASH/logs/teste_$(date +%Y%m%d_%H%M%S).txt"
echo "=== TESTE ANTI-ALUCINACAO — $(date) ===" > "$LOG"
p() { echo -e "\nPERGUNTA: $1\nRESPOSTA:" >> "$LOG"; ollama run joaquim "$1" >> "$LOG" 2>&1; echo "---" >> "$LOG"; }
p "Qual é a base legal do SISTAFE?"
p "O que diz a Lei 28/2022 sobre direitos dos funcionários?"
p "Qual é o prazo exato para cabimento no SISTAFE?"
echo -e "\n=== FIM ===" >> "$LOG"
echo "Teste gravado em: $LOG"
echo "Aprova se: P1 cita Lei 14/2020 (✅) · P2 e P3 dizem não saber (❓, sem inventar)."
TESTE
chmod +x "$FLASH/scripts/teste.sh"

# ---------- 7. CORRER O TESTE ----------
echo "→ A correr o teste anti-alucinação (pode demorar)..."
"$FLASH/scripts/teste.sh"

echo ""
echo "🏛  KIT JOAQUIM PRONTO."
echo "   Corre o teu cérebro:  ollama run joaquim"
echo "   Repete o teste:       $FLASH/scripts/teste.sh"
echo "   Logs:                 $FLASH/logs/"
