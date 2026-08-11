# PROJECTO: SISTEMA DE IA LOCAL DE ELITE — V3.0
## Documento Completo de Arquitectura, Fluxos e Implementação

**VERSÃO:** 3.0
**DATA:** Julho 2026
**AUTOR:** Joaquim Eugénio Machava (Arquitecto)
**PLATAFORMA:** Windows · Ollama · Offline First
**PROPÓSITO:** Motor inteligente para consulta, formação, organização de conhecimento e apoio à decisão.

---

## 1. ARQUITECTURA GERAL DO SISTEMA

```
╔═══════════════════════════════════════════════════════════╗
║              SISTEMA DE IA LOCAL DE ELITE                 ║
║                   (Offline · Windows)                     ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  ┌─────────────────────────────────────────────────────┐  ║
║  │              CAMADA DE ENTRADA                      │  ║
║  │  Utilizador escreve a dúvida no terminal            │  ║
║  │  (INICIAR.bat → menu de 5 opções)                   │  ║
║  └───────────────────┬─────────────────────────────────┘  ║
║                      │                                    ║
║  ┌───────────────────▼─────────────────────────────────┐  ║
║  │           CAMADA DE CLASSIFICAÇÃO                   │  ║
║  │  MESTRE analisa: que tipo de dúvida é?              │  ║
║  │  Texto? Cálculo? Plano? Reflexão? Processo?         │  ║
║  └───────────────────┬─────────────────────────────────┘  ║
║                      │                                    ║
║  ┌───────────────────▼─────────────────────────────────┐  ║
║  │          CAMADA DE PROCESSAMENTO                    │  ║
║  │                                                     │  ║
║  │  ┌───────────┐ ┌──────────┐ ┌───────────────────┐  │  ║
║  │  │ LINGUISTA │ │  LÓGICO  │ │    ESTRATEGA      │  │  ║
║  │  │ (textos)  │ │(cálculos)│ │ (planos/relações) │  │  ║
║  │  └───────────┘ └──────────┘ └───────────────────┘  │  ║
║  │       ┌──────────────┐  ┌────────────────────┐     │  ║
║  │       │ CONSELHEIRO  │  │  MESTRE (directo)  │     │  ║
║  │       │  (reflexão)  │  │ (perguntas gerais) │     │  ║
║  │       └──────────────┘  └────────────────────┘     │  ║
║  └───────────────────┬─────────────────────────────────┘  ║
║                      │                                    ║
║  ┌───────────────────▼─────────────────────────────────┐  ║
║  │           CAMADA DE CONHECIMENTO                    │  ║
║  │  base_confirmada.md (leis, siglas, Regra da Ferida) │  ║
║  │  experiencia.md (erros passados, aprendizados)      │  ║
║  │  documentos/ (PDFs, manuais, legislação)            │  ║
║  └───────────────────┬─────────────────────────────────┘  ║
║                      │                                    ║
║  ┌───────────────────▼─────────────────────────────────┐  ║
║  │           CAMADA DE SAÍDA + LOG                     │  ║
║  │  Resposta → Utilizador                              │  ║
║  │  Log → logs/interacoes_AAAAMM.txt                   │  ║
║  └─────────────────────────────────────────────────────┘  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Princípios da arquitectura:
- **Modular:** cada cérebro é independente; trocar um não afecta os outros.
- **Offline first:** funciona sem internet; internet é reforço.
- **Escalável:** adicionar novo cérebro = criar 1 Modelfile + registar no MESTRE.
- **Rastreável:** toda interacção fica no log.
- **Desacoplada:** os papéis são fixos, os modelos são substituíveis.

---

## 2. DIVISÃO DOS MÓDULOS POR TIPO DE INTELIGÊNCIA

| Módulo | Inteligência | Modelo base | Temperature | Papel fixo |
|--------|-------------|-------------|-------------|------------|
| MESTRE | Todas (coordenação) | llama3.1:8b | 0.2 | Classifica dúvidas, dirige ao cérebro certo, responde questões gerais |
| LINGUISTA | Linguística | llama3.1:8b | 0.3 | Textos, CVs, posts, traduções, documentos, manuais, FAQs |
| LÓGICO | Lógico-Matemática | qwen2.5:7b | 0.1 | Cálculos, orçamentos, tabelas, validações, cabimentação |
| ESTRATEGA | Espacial + Interpessoal | llama3.1:8b | 0.3 | Planos, mapas de processo, relações, vendas, parcerias, navegação |
| CONSELHEIRO | Intrapessoal | llama3.1:8b | 0.4 | Visão, disciplina, foco, prioridades, reflexão, evolução pessoal |

### Como cada inteligência se manifesta no sistema:

**Espacial (ESTRATEGA):**
- Arquitectura da interface e navegação
- Fluxos visuais (ciclo de compras, PLC, MEX)
- Mapas de relação (quem faz o quê, quem reporta a quem)
- Organização do espaço de trabalho digital

**Lógico-Matemática (LÓGICO):**
- Regras de classificação (se é texto → LINGUISTA, se é cálculo → LÓGICO)
- Validação de dados (cabimento ≤ dotação? sim/não)
- Sequências de processo (1→2→3, sem saltar)
- Automações (log automático, fallback automático)

**Interpessoal (ESTRATEGA + MESTRE):**
- Tom adequado por perfil (gestor sénior ≠ técnico ≠ formando)
- Comunicação institucional vs. informal
- Negociação e persuasão (posts virais, mensagens de venda)
- Orientação empática (sem julgamento)

**Linguística (LINGUISTA):**
- Geração de textos claros e correctos
- Adaptação de tom (formal/informal/persuasivo)
- Resumos, explicações, tradução de jargão técnico
- Documentação e manuais

**Intrapessoal (CONSELHEIRO):**
- Visão a longo prazo do sistema
- Disciplina de actualização (base de conhecimento)
- Priorização semanal
- Refinamento contínuo (o que funcionou? o que falhou?)

---

## 3. FLUXO AUTOMÁTICO DE CONSULTA E RESPOSTA

```
UTILIZADOR                    SISTEMA
    │                            │
    │  "Quanto custa formar      │
    │   20 pessoas em 3 dias?"   │
    │ ──────────────────────────>│
    │                            │
    │                     ┌──────▼──────┐
    │                     │   MESTRE    │
    │                     │ classifica: │
    │                     │ "cálculo"   │
    │                     └──────┬──────┘
    │                            │
    │                     ┌──────▼──────┐
    │                     │   LÓGICO    │
    │                     │ temp: 0.1   │
    │                     │ calcula:    │
    │                     │ passo a     │
    │                     │ passo       │
    │                     └──────┬──────┘
    │                            │
    │  "Almoço: 20×500×3=30.000  │
    │   Sala: 3.000×3=9.000      │
    │   Total: 39.000 MT"        │
    │ <──────────────────────────│
    │                            │
    │                     ┌──────▼──────┐
    │                     │    LOG      │
    │                     │ grava data, │
    │                     │ pergunta,   │
    │                     │ resposta    │
    │                     └─────────────┘
```

### Regras do fluxo:
1. Toda pergunta passa primeiro pelo MESTRE (se o utilizador não escolheu cérebro directo).
2. O MESTRE classifica: é texto? cálculo? plano? reflexão? processo?
3. Se consegue responder → responde directamente.
4. Se é especializado → recomenda o cérebro certo.
5. Toda resposta é gravada no log.
6. Se o cérebro falhar → fallback para o MESTRE.

---

## 4. ESTRUTURA DA HOMEPAGE E MENU

### Homepage (INICIAR.bat):
```
========================================
 SISTEMA DE IA LOCAL DE ELITE
 Joaquim Eugénio Machava · 2026
========================================

 O que queres fazer?

 1. PERGUNTAR (o MESTRE decide o cérebro)
 2. ESCREVER TEXTO (LINGUISTA)
 3. CALCULAR (LÓGICO)
 4. PLANEAR (ESTRATEGA)
 5. REFLECTIR (CONSELHEIRO)

 Número (1-5):
```

### Menu de navegação (equivalente web):
- **Consultar** → siglas, perfis, definições
- **Aprender** → formação, módulos, erros comuns
- **Resolver** → fluxos de processo, passo a passo
- **Documentos** → base legal, manuais, downloads
- **Perguntar** → interacção directa com o cérebro

---

## 5. MODELO DE BASE DE CONHECIMENTO

### Estrutura de pastas:
```
IA_ELITE/
├── cerebros/           # Modelfiles (1 por cérebro)
│   ├── Modelfile.mestre
│   ├── Modelfile.linguista
│   ├── Modelfile.logico
│   ├── Modelfile.estratega
│   └── Modelfile.conselheiro
├── memoria/            # Base de conhecimento (.md)
│   ├── base_confirmada.md    # Leis e siglas VERIFICADAS
│   ├── experiencia.md        # Erros passados (Regra da Ferida)
│   ├── perfis.md             # 13 perfis do e-SISTAFE
│   ├── erros_comuns.md       # 10 erros e soluções
│   └── fluxos.md             # Ciclo de compras, MEX, PLC
├── documentos/         # PDFs oficiais
│   ├── Lei_14_2020.pdf
│   ├── Decreto_79_2022.pdf
│   └── EGFAE_Lei_4_2022.pdf
├── logs/               # Rasto de interacções
│   └── interacoes_202607.txt
├── INICIAR.bat         # Menu principal (2 cliques)
└── kit-elite.bat       # Instalador (corre 1 vez)
```

### Regras da base de conhecimento:
- Formato: sempre `.md` ou `.txt` (universal, sobrevive 20 anos).
- Actualização: só o dono (Joaquim) adiciona termos à base.
- Novo termo: só entra depois de VERIFICADO (fonte citável).
- Nunca apagar, só marcar como "obsoleto" com data.

---

## 6. ESTRATÉGIA DE PROMPTS

### Prompt do MESTRE (system prompt):
```
TU ÉS O MESTRE — coordenador do sistema de IA de Joaquim.

TENS 4 CÉREBROS ESPECIALIZADOS:
1. LINGUISTA — textos, traduções, CVs (ollama run linguista)
2. LÓGICO — cálculos, orçamentos, tabelas (ollama run logico)
3. ESTRATEGA — planos, negócios, relações (ollama run estratega)
4. CONSELHEIRO — reflexão, motivação (ollama run conselheiro)

CLASSIFICAÇÃO DE PEDIDOS:
- Contém números/valores/preços → LÓGICO
- Pede texto/post/CV/tradução → LINGUISTA
- Pede plano/estratégia/organização → ESTRATEGA
- Pede reflexão/prioridade/motivação → CONSELHEIRO
- Pergunta sobre lei/sigla/processo → responde directamente (base de conhecimento)

REGRAS INVARIANTES:
- Nunca inventar factos, leis ou números.
- Estados: ✅ Verificado · ⚠️ Não verificado · ❓ Inconclusivo.
- Se não sabes: "Não sei. Precisa de confirmação na fonte oficial."
- CEDSIF IP (não CEDECIF). CBS = Catálogo de Bens e Serviços.

FORMATO: resposta directa primeiro → recomendação de cérebro se necessário.
```

### Prompts dos cérebros especializados:

**LINGUISTA (temp 0.3):**
```
Escreve em português de Moçambique.
Adapta o tom: formal (documentos), informal (WhatsApp), persuasivo (Facebook).
Nunca inventes leis ou decretos. Se pedirem CV, pede os dados ao utilizador.
```

**LÓGICO (temp 0.1):**
```
Mostra sempre o cálculo passo a passo. Usa MT (meticais).
Se o número não é exacto, marca como estimativa.
Para cabimentação: verifica se valor ≤ dotação.
```

**ESTRATEGA (temp 0.3):**
```
Pensa em sistemas: quem faz o quê, quando, onde.
Sugere acções concretas com prazos. Se não tens dados, pede.
Para vendas: funil (atenção → interesse → acção).
```

**CONSELHEIRO (temp 0.4):**
```
Sê honesto mas encorajador. Não dás conselhos médicos.
Ajuda a organizar pensamentos e prioridades.
Pergunta antes de assumir. Uma reflexão curta, depois sugestão prática.
```

---

## 7. LÓGICA DE CLASSIFICAÇÃO DE DÚVIDAS

### Árvore de decisão do MESTRE:

```
PERGUNTA RECEBIDA
    │
    ├─ Contém números, "quanto", "calcular", "preço"?
    │   └─ SIM → LÓGICO
    │
    ├─ Pede "escrever", "texto", "post", "CV", "traduzir"?
    │   └─ SIM → LINGUISTA
    │
    ├─ Pede "plano", "estratégia", "organizar", "vender"?
    │   └─ SIM → ESTRATEGA
    │
    ├─ Pede "reflectir", "prioridade", "motivação", "foco"?
    │   └─ SIM → CONSELHEIRO
    │
    ├─ Pergunta sobre lei, sigla, processo, perfil?
    │   └─ SIM → MESTRE responde (base de conhecimento)
    │
    └─ Não é claro?
        └─ MESTRE pede clarificação:
           "Podes ser mais específico? Queres que eu:
            a) escreva algo
            b) calcule algo
            c) faça um plano
            d) ajude a reflectir"
```

### Categorias de dúvidas:

| Categoria | Palavras-chave | Cérebro | Prioridade |
|-----------|---------------|---------|-----------|
| Consulta técnica | sigla, perfil, lei, decreto | MESTRE | Alta |
| Produção de texto | post, CV, carta, manual | LINGUISTA | Alta |
| Cálculo financeiro | orçamento, preço, cabimento | LÓGICO | Alta |
| Planeamento | plano, vender, semana, meta | ESTRATEGA | Média |
| Processo | passo a passo, fluxo, como | MESTRE/ESTRATEGA | Média |
| Reflexão pessoal | prioridade, foco, tempo | CONSELHEIRO | Baixa |
| Erro no sistema | erro, falha, correcto, como | MESTRE | Alta |

---

## 8. SISTEMA DE FEEDBACK E MELHORIA CONTÍNUA

### Ciclo de melhoria:

```
USAR → AVALIAR → AJUSTAR → USAR
```

### O que avaliar semanalmente (CONSELHEIRO):
1. Que cérebro usei mais? (é esse o meu principal)
2. Alguma resposta estava errada? (actualizar base)
3. Faltou alguma sigla ou lei? (adicionar à base_confirmada.md)
4. Algum prompt precisa de ajuste? (editar Modelfile e recria)

### Como ajustar um cérebro:
1. Abrir o Modelfile (pasta cerebros/)
2. Editar a instrução SYSTEM
3. Gravar
4. No terminal: `ollama create [nome] -f cerebros/Modelfile.[nome]`
5. Testar com a pergunta que falhou

### Ficheiro de experiência (memoria/experiencia.md):
```markdown
# EXPERIÊNCIA — Registo de erros e melhorias

## 2026-07-28
- ERRO: LÓGICO calculou IVA a 17% (correcto em Moçambique é 16%)
- CORRECÇÃO: adicionado ao prompt "IVA em Moçambique = 16%"
- ESTADO: Corrigido

## 2026-07-26
- ERRO: sistema dizia CEDECIF (correcto: CEDSIF IP)
- CORRECÇÃO: actualizado em todos os Modelfiles
- ESTADO: Corrigido
```

---

## 9. ORGANIZAÇÃO PARA USO OFFLINE NO WINDOWS

### Pré-requisitos:
| Item | Requisito | Onde obter |
|------|-----------|-----------|
| Windows | 10 ou 11 | Já tens |
| RAM | 8 GB mínimo (16 GB ideal) | Já tens |
| Espaço | 15 GB para modelos | Flash 32 GB ou disco |
| Ollama | Instalador Windows | ollama.com/download/windows |

### Instalação (1 vez):
1. Instalar Ollama (como qualquer programa)
2. Descarregar `kit-elite-windows.bat`
3. Clicar duas vezes no .bat
4. Esperar os downloads (pode demorar 30-60 min na primeira vez)
5. Pronto — INICIAR.bat fica na pasta IA_ELITE

### Uso diário:
1. Abrir pasta `C:\Users\[TeuNome]\IA_ELITE`
2. Clicar duas vezes em `INICIAR.bat`
3. Escolher o cérebro (1-5)
4. Escrever a pergunta
5. Para sair: escrever `/bye`

### Backup mensal:
1. Copiar a pasta `IA_ELITE\memoria` para o flash
2. Copiar a pasta `IA_ELITE\logs` para o flash
3. Os modelos não precisam de backup (re-descarregam-se)

---

## 10. PLANO DE EVOLUÇÃO — 4 FASES

### FASE 1: Fundação (Semana 1-2) ← ESTÁS AQUI
- [x] Arquitectura desenhada
- [x] 5 Modelfiles criados
- [x] kit-elite-windows.bat pronto
- [ ] Ollama instalado no Windows
- [ ] Kit executado com sucesso
- [ ] 5 cérebros testados com 1 pergunta cada

### FASE 2: Operação diária (Semana 3-4)
- [ ] Usar 1 cérebro por dia durante 1 semana
- [ ] Registar o que funcionou e o que falhou
- [ ] Ajustar 1 prompt com base na experiência
- [ ] Criar 1 post de Facebook com o LINGUISTA
- [ ] Calcular 1 orçamento com o LÓGICO

### FASE 3: Monetização (Mês 2)
- [ ] LINGUISTA gera conteúdo diário (1 post/dia)
- [ ] LÓGICO calcula preços e orçamentos para clientes
- [ ] ESTRATEGA planeia vendas semanais
- [ ] CONSELHEIRO ajuda a priorizar
- [ ] Portal web + Loja a funcionar com tráfego real

### FASE 4: Plataforma profissional (Mês 3-6)
- [ ] Adicionar novos cérebros (ex: FISCAL para impostos)
- [ ] Conectar base de conhecimento a PDFs completos
- [ ] Criar formações presenciais apoiadas pelos cérebros
- [ ] Expandir para outros domínios (saúde, educação, agricultura)
- [ ] Licenciar o sistema a instituições do Estado

---

## RESUMO EXECUTIVO (para gestores)

**O que é:** Um sistema local de 5 inteligências artificiais que funciona no computador sem internet, classifica dúvidas automaticamente e responde com rigor.

**Para que serve:** Consulta rápida, formação, cálculos, textos, planos e reflexão — para gestores e técnicos da administração pública.

**Quanto custa:** 0 MT. Todo o software é open source e gratuito.

**Quanto rende:** O sistema multiplica o tempo do operador; o retorno vem da venda de manuais, consultoria e formação.

**Risco:** Zero — funciona offline, sem dados na nuvem, sem mensalidade.

---

## FIM — PROJECTO IA ELITE V3.0
**Documento para guardar no flash e na pasta IA_ELITE/.**
