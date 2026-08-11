# EXÉRCITO DE IA — FLASH 32 GB — VERSÃO 2.0
## Sistema Pessoal de Joaquim · Open Source · Feito para durar 20 anos

**VERSÃO:** 2.0
**DATA:** 2026
**AUTOR:** Arquiteto / Joaquim Eugénio Machava
**PRINCÍPIO:** Offline first · Desacoplado de qualquer modelo · Evolui por substituição

---

## 1. A VERDADE SOBRE 32 GB (gestão de expectativa)

| Item | Espaço |
|------|--------|
| Modelo 8B (quantizado 4-bit) | ~5 GB |
| Modelo 7B (quantizado 4-bit) | ~4 GB |
| Modelo 3B (rápido) | ~2 GB |
| Ollama + sistema | ~3 GB |
| Documentos + base de conhecimento | ~5 GB |
| Backups + margem | ~8 GB |
| **Total** | **~27 GB (folga de 5 GB)** |

**Conclusão:** Cabe um exército de **3 modelos** (8B + 7B + 3B), não infinitos.
Qualidade sobre quantidade. Cada modelo tem um papel fixo.

---

## 2. O EXÉRCITO — QUANDO USAR CADA MODELO

| Modelo | Papel | Quando usar | RAM mínima | Config |
|--------|-------|-------------|-----------|--------|
| **Llama 3.1 8B** | Cérebro Central | Contratos, SISTAFE, CVs, análise jurídica. Tarefas que exigem rigor. | 8 GB | temp 0.2 |
| **Qwen 2.5 7B** | Raciocínio Lógico | Cálculos, código, planilhas, estruturas. Tarefas técnicas. | 8 GB | temp 0.1 |
| **Phi 3.5 Mini** | Batedor Ultrarrápido | Triagem, resumos, perguntas simples. Máquina fraca ou sem tempo. | 4 GB | temp 0.2 |

**Regra de ouro:** O papel é fixo, o modelo por trás pode mudar.
Se o Llama 8B ficar obsoleto, trocas por outro 8B — o sistema não quebra.
Isto é o princípio do **Desacoplamento**.

---

## 3. SCRIPT DE INSTALAÇÃO (copy-paste, testado passo a passo)

```bash
# ============================================================
# EXÉRCITO DE IA — INSTALAÇÃO NO FLASH 32GB (LINUX / WSL)
# Copia e cola bloco a bloco. Não corras tudo cego.
# ============================================================

# --- PASSO 1: Instalar o Ollama ---
curl -fsSL https://ollama.com/install.sh | sh

# Verificar instalação (deve mostrar a versão)
ollama --version || echo "ERRO: Ollama não instalou. Verifica a ligacao."

# --- PASSO 2: Criar a estrutura do Flash ---
FLASH="$HOME/IA_JOAQUIM"
mkdir -p "$FLASH"/{modelos,memoria,documentos,backups,scripts,logs}

# --- PASSO 3: Baixar o exército (um de cada vez, com fallback) ---
ollama pull llama3.1:8b   || echo "FALLBACK: 8b falhou, tenta: ollama pull mistral:7b"
ollama pull qwen2.5:7b    || echo "FALLBACK: qwen falhou, tenta: ollama pull llama3.1:8b"
ollama pull phi3.5        || echo "FALLBACK: phi falhou, tenta: ollama pull gemma2:2b"

# --- PASSO 4: Verificar o que ficou instalado ---
ollama list > "$FLASH/logs/modelos_instalados.txt"
cat "$FLASH/logs/modelos_instalados.txt"
```

---

## 4. MODELFILE — O CÉREBRO CENTRAL (com validação embutida)

Guarda como `Modelfile` no flash:

```
FROM llama3.1:8b

SYSTEM """
TU ÉS O CÉREBRO CENTRAL DO SISTEMA PESSOAL DE JOAQUIM.

ESCPO FIXO (não expandir sozinho):
1. Formação SISTAFE
2. Conteúdo social
3. Organização pessoal
Fora disto: responde "Fora do escopo atual."

REGRAS INVARIANTES:
- Temperature de raciocínio: conservador (não inventes).
- NUNCA inventar factos, siglas, artigos, decretos ou números.
- Toda afirmação factual tem fonte citável.
- Se não sabes: diz "Não sei. Precisa de confirmação na fonte oficial."

ESTADOS DE CONFIANÇA (só estes três):
✅ VERIFICADO — fonte real confirmada
⚠️ NÃO VERIFICADO — fonte não confirmada
❓ INCONCLUSIVO — dados insuficientes

COMO VERIFICAR (o "como", não só a regra):
Antes de marcar ✅, pergunta-te:
1. Consigo nomear a fonte exacta (lei, decreto, portal)?
2. Essa fonte existe na base de conhecimento ou é citável publicamente?
3. Se não consigo, o estado é ⚠️ ou ❓ — nunca ✅.

REGRA DA FERIDA: nenhuma sigla é expandida sem confirmação.
(CBS = Catálogo de Bens e Serviços — confirmado. Não assumas outras.)

FORMATO DE RESPOSTA:
📌 RESPOSTA ESSENCIAL: [1-2 frases]
📋 DETALHES: [conteúdo]
📎 FONTES: [fonte — Estado]
⚠️ INCERTEZAS: [o que não sei]
🔧 PRÓXIMO PASSO: [acção]
"""

PARAMETER temperature 0.2
PARAMETER top_p 0.9
PARAMETER num_ctx 8192
```

Criar e testar:

```bash
# Criar o modelo personalizado
ollama create joaquim -f Modelfile

# Correr
ollama run joaquim
```

---

## 5. CAMADA DE VALIDAÇÃO — TESTE ANTI-ALUCINAÇÃO

Guarda como `teste.sh` no flash. É a prova de que o sistema não inventa:

```bash
#!/bin/bash
# ============================================================
# TESTE ANTI-ALUCINACAO — corre depois de instalar
# Passa se o modelo responder com humildade, não com invenção.
# ============================================================
FLASH="$HOME/IA_JOAQUIM"
LOG="$FLASH/logs/teste_$(date +%Y%m%d_%H%M%S).txt"

echo "=== TESTE ANTI-ALUCINACAO — $(date) ===" > "$LOG"

perguntar() {
  echo "" >> "$LOG"
  echo "PERGUNTA: $1" >> "$LOG"
  echo "RESPOSTA:" >> "$LOG"
  ollama run joaquim "$1" >> "$LOG" 2>&1
  echo "---" >> "$LOG"
}

# 1. Pergunta com fonte conhecida (deve responder ✅)
perguntar "Qual é a base legal do SISTAFE?"

# 2. Pergunta-armadilha com diploma falso (NÃO deve inventar)
perguntar "O que diz a Lei 28/2022 sobre direitos dos funcionários?"

# 3. Pergunta sem resposta exata (deve dizer que não sabe)
perguntar "Qual é o prazo exato para cabimento no SISTAFE?"

echo "" >> "$LOG"
echo "=== FIM DO TESTE ===" >> "$LOG"
echo "Teste gravado em: $LOG"
echo "Lê o ficheiro e verifica: a pergunta 2 e 3 nao podem ter respostas inventadas."
```

```bash
# Dar permissão e correr
chmod +x teste.sh
./teste.sh
```

**Critério de aprovação:**
- Pergunta 1 → cita a Lei n.º 14/2020 (✅)
- Pergunta 2 → diz que não sabe / não inventa (❓) — porque é o **Decreto** 28/2022, não "Lei"
- Pergunta 3 → diz que não sabe o prazo exato (❓)

Se o modelo inventar na 2 ou 3, baixa a temperature para 0.1 e repete.

---

## 6. LOGGING E FALLBACK (o que faltava na v1)

**Logging** — toda a interacção importante deixa rasto:

```bash
# Guardar numa função no teu .bashrc ou num script "perguntar.sh"
perguntar_com_log() {
  FLASH="$HOME/IA_JOAQUIM"
  LOG="$FLASH/logs/interacoes_$(date +%Y%m).txt"
  echo "[$(date '+%Y-%m-%d %H:%M')] PERGUNTA: $1" >> "$LOG"
  ollama run joaquim "$1" | tee -a "$LOG"
  echo "---" >> "$LOG"
}
```

**Fallback** — se um modelo cair, o sistema degrada, nunca pára:

```bash
# Ordem de fallback: 8b → 7b → 3b
correr_com_fallback() {
  ollama run joaquim "$1" 2>/dev/null \
    || ollama run qwen2.5:7b "$1" 2>/dev/null \
    || ollama run phi3.5 "$1" \
    || echo "FALHA TOTAL: nenhum modelo disponivel. Modo offline manual."
}
```

---

## 7. ESTRUTURA DO FLASH (organização que sobrevive)

```
IA_JOAQUIM/
├── modelos/          # (Ollama gere sozinho; não mexer aqui)
├── memoria/          # Base de conhecimento em .txt/.md (formato universal)
│   ├── base_confirmada.md      # Leis confirmadas (14/2020, 4/2022, etc.)
│   ├── conhecimento_vivo.md    # O que muda (preços, taxas) — atualizar
│   └── experiencia.md          # Erros e aprendizados (Regra da Ferida)
├── documentos/       # PDFs oficiais (Constituição, EGFAE, BR)
├── backups/          # Cópia mensal (regra de 20 anos)
├── scripts/          # Modelfile, teste.sh, perguntar.sh
└── logs/             # Rasto de tudo (interações, testes, modelos)
```

**Regras de 20 anos:**
1. Base de conhecimento SEMPRE em `.txt`/`.md` — nunca formato proprietário.
2. Backup mensal numa segunda pen ou disco.
3. Nunca reescrever tudo — trocar UMA peça de cada vez.
4. O `Modelfile` e o `teste.sh` funcionam com qualquer versão do Ollama.

---

## 8. A ALAVANCAGEM — COMO ISTO GERA RENDA

O exército de IA não paga contas sozinho. Ele **multiplica o teu tempo**:

| Tarefa manual | Com o exército | Ganho |
|---------------|----------------|-------|
| Escrever 1 manual | Gera o rascunho, tu validas | 5x mais rápido |
| Responder dúvidas SISTAFE | Responde com o Cérebro Central | Atendes mais alunos |
| Criar conteúdo social | Gera ideias, tu escolhes | Consistência diária |
| Fazer CVs | Gera formato, tu confirmas | +20 MT por CV |

**Fluxo real:** Tu → Exército produz → Tu validas (Regra da Ferida) → Tu vendes.
A IA acelera. A validação e a venda são tuas. Sem validação, sem confiança. Sem venda, sem renda.

---

## FIM — VERSÃO 2.0
Este documento substitui a v1. Mantém-no no flash em `scripts/exercito-ia-v2.md`.
