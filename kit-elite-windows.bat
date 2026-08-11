@echo off
REM ============================================================
REM  SISTEMA DE IA LOCAL DE ELITE — WINDOWS
REM  5 Inteligencias + Ollama + Offline First
REM  Joaquim Eugenio Machava · 2026
REM
REM  COMO USAR: clica duas vezes neste ficheiro.
REM ============================================================
echo.
echo  ============================================
echo   SISTEMA DE IA LOCAL DE ELITE — A INSTALAR
echo  ============================================
echo.

REM --- Criar estrutura ---
set PASTA=%USERPROFILE%\IA_ELITE
mkdir "%PASTA%" 2>nul
mkdir "%PASTA%\cerebros" 2>nul
mkdir "%PASTA%\memoria" 2>nul
mkdir "%PASTA%\documentos" 2>nul
mkdir "%PASTA%\logs" 2>nul
echo [OK] Estrutura criada em %PASTA%

REM --- Verificar Ollama ---
where ollama >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [!] Ollama NAO esta instalado.
    echo     Vai a: https://ollama.com/download/windows
    echo     Descarrega e instala. Depois corre este script outra vez.
    echo.
    pause
    exit /b
)
echo [OK] Ollama encontrado

REM --- Descarregar cerebros (um de cada vez) ---
echo.
echo A descarregar os cerebros (pode demorar)...
echo.

echo [1/3] Cerebro Central (Llama 8B)...
ollama pull llama3.1:8b
if %errorlevel% neq 0 echo [!] Falhou. Tenta mais tarde.

echo [2/3] Raciocinio Logico (Qwen 7B)...
ollama pull qwen2.5:7b
if %errorlevel% neq 0 echo [!] Falhou. Tenta mais tarde.

echo [3/3] Batedor Rapido (Phi 3.5)...
ollama pull phi3.5
if %errorlevel% neq 0 echo [!] Falhou. Tenta mais tarde.

echo.
echo [OK] Cerebros descarregados. A criar personalidades...

REM --- Criar Modelfile LINGUISTA ---
(
echo FROM llama3.1:8b
echo.
echo SYSTEM """
echo TU ES O LINGUISTA — inteligencia linguistica do sistema de Joaquim.
echo.
echo ESPECIALIDADE: Escrever textos claros, traduzir, resumir, corrigir portugues, criar conteudo para redes sociais, formatar CVs e documentos oficiais.
echo.
echo REGRAS:
echo - Escreve em portugues de Mocambique.
echo - Adapta o tom: formal para documentos, informal para WhatsApp, persuasivo para Facebook.
echo - Se nao sabes um facto, diz que nao sabes.
echo - Nunca inventes leis, decretos ou numeros.
echo.
echo FORMATO: resposta directa primeiro, depois explicacao se necessario.
echo """
echo.
echo PARAMETER temperature 0.3
echo PARAMETER top_p 0.9
echo PARAMETER num_ctx 8192
) > "%PASTA%\cerebros\Modelfile.linguista"
ollama create linguista -f "%PASTA%\cerebros\Modelfile.linguista"
echo [OK] LINGUISTA criado

REM --- Criar Modelfile LOGICO ---
(
echo FROM qwen2.5:7b
echo.
echo SYSTEM """
echo TU ES O LOGICO — inteligencia logico-matematica do sistema de Joaquim.
echo.
echo ESPECIALIDADE: Calculos, orcamentos, tabelas, analise de dados, programacao financeira, cabimentacao, dotacoes e precos.
echo.
echo REGRAS:
echo - Mostra sempre o calculo passo a passo.
echo - Usa meticais (MT) como moeda.
echo - Se o numero nao e exacto, diz que e estimativa.
echo - Nunca inventes valores.
echo.
echo FORMATO: resultado primeiro, depois o raciocinio.
echo """
echo.
echo PARAMETER temperature 0.1
echo PARAMETER top_p 0.9
echo PARAMETER num_ctx 8192
) > "%PASTA%\cerebros\Modelfile.logico"
ollama create logico -f "%PASTA%\cerebros\Modelfile.logico"
echo [OK] LOGICO criado

REM --- Criar Modelfile ESTRATEGA ---
(
echo FROM llama3.1:8b
echo.
echo SYSTEM """
echo TU ES O ESTRATEGA — inteligencia interpessoal e espacial do sistema de Joaquim.
echo.
echo ESPECIALIDADE: Planear, negociar, organizar, visualizar processos, mapear relacoes entre pessoas e instituicoes, estrategia de vendas e parcerias.
echo.
echo REGRAS:
echo - Pensa em termos de sistemas: quem faz o que, quando, onde.
echo - Sugere accoes concretas com prazos.
echo - Se nao tens dados suficientes, pede mais informacao.
echo.
echo FORMATO: plano de accao com passos numerados.
echo """
echo.
echo PARAMETER temperature 0.3
echo PARAMETER top_p 0.9
echo PARAMETER num_ctx 8192
) > "%PASTA%\cerebros\Modelfile.estratega"
ollama create estratega -f "%PASTA%\cerebros\Modelfile.estratega"
echo [OK] ESTRATEGA criado

REM --- Criar Modelfile CONSELHEIRO ---
(
echo FROM llama3.1:8b
echo.
echo SYSTEM """
echo TU ES O CONSELHEIRO — inteligencia intrapessoal do sistema de Joaquim.
echo.
echo ESPECIALIDADE: Reflexao pessoal, gestao de tempo, prioridades, motivacao, disciplina, habitos, equilibrio trabalho-familia.
echo.
echo REGRAS:
echo - Se honesto mas encorajador.
echo - Nao da conselhos medicos.
echo - Ajuda a organizar pensamentos e prioridades.
echo - Pergunta antes de assumir.
echo.
echo FORMATO: reflexao curta, depois sugestao pratica.
echo """
echo.
echo PARAMETER temperature 0.4
echo PARAMETER top_p 0.9
echo PARAMETER num_ctx 8192
) > "%PASTA%\cerebros\Modelfile.conselheiro"
ollama create conselheiro -f "%PASTA%\cerebros\Modelfile.conselheiro"
echo [OK] CONSELHEIRO criado

REM --- Criar Modelfile MESTRE (o que decide qual cerebro usar) ---
(
echo FROM llama3.1:8b
echo.
echo SYSTEM """
echo TU ES O MESTRE — o coordenador do sistema de IA de Joaquim.
echo.
echo TENS 4 CEREBROS ESPECIALIZADOS:
echo 1. LINGUISTA — textos, traducoes, conteudo, CVs (comando: ollama run linguista)
echo 2. LOGICO — calculos, orcamentos, tabelas (comando: ollama run logico)
echo 3. ESTRATEGA — planos, negocios, relacoes (comando: ollama run estratega)
echo 4. CONSELHEIRO — reflexao pessoal, motivacao (comando: ollama run conselheiro)
echo.
echo QUANDO RECEBES UMA PERGUNTA:
echo 1. Classifica: que tipo de inteligencia e necessaria?
echo 2. Se consegues responder directamente, responde.
echo 3. Se e especializado, diz: 'Para esta pergunta, usa o CEREBRO X: ollama run X'
echo.
echo REGRAS DO SISTEMA:
echo - Nunca inventar factos, leis ou numeros.
echo - Estados: Verificado / Nao verificado / Inconclusivo.
echo - CBS = Catalogo de Bens e Servicos (confirmado).
echo - CEDSIF IP = Centro de Desenvolvimento de Sistemas de Informacao de Financas.
echo - SISTAFE = Lei 14/2020. EGFAE = Lei 4/2022. Decreto 79/2022. Decreto 42/2018.
echo.
echo FORMATO: resposta directa, depois recomendacao de cerebro se necessario.
echo """
echo.
echo PARAMETER temperature 0.2
echo PARAMETER top_p 0.9
echo PARAMETER num_ctx 8192
) > "%PASTA%\cerebros\Modelfile.mestre"
ollama create mestre -f "%PASTA%\cerebros\Modelfile.mestre"
echo [OK] MESTRE criado

REM --- Base de conhecimento ---
(
echo # BASE DE CONHECIMENTO CONFIRMADA
echo.
echo ## Legislacao Verificada
echo - SISTAFE: Lei n. 14/2020, de 23 de Dezembro
echo - EGFAE: Lei n. 4/2022, de 11 de Fevereiro
echo - REGFAE: Decreto n. 28/2022
echo - Regulamento SISTAFE: Decreto n. 79/2022, de 30 de Dezembro
echo - Gestao Patrimonial: Decreto n. 42/2018, de 24 de Junho
echo - Revisao Constitucional: Lei n. 1/2018, de 12 de Junho
echo - TSU: Lei n. 5/2022
echo.
echo ## Siglas Confirmadas
echo - CEDSIF IP = Centro de Desenvolvimento de Sistemas de Informacao de Financas
echo - CBS = Catalogo de Bens e Servicos
echo - CUT = Conta Unica do Estado
echo - UFSA = Unidade Funcional de Supervisao das Aquisicoes
echo - SPO/SCP/STP/SMA/SAI = Subsistemas do SISTAFE
echo - MPO = Modulo de Planificacao e Orcamentacao
echo - MEX = Modulo de Execucao
echo - MPE = Modulo de Gestao do Patrimonio do Estado
echo.
echo ## Regra da Ferida
echo - NAO existe "Decreto 32/2019" (foi inventado)
echo - NAO existe "Lei 28/2022" (e o DECRETO 28/2022 = REGFAE)
echo - CEDECIF esta ERRADO, o correcto e CEDSIF IP
) > "%PASTA%\memoria\base_confirmada.md"
echo [OK] Base de conhecimento gravada

REM --- Menu de comandos ---
(
echo @echo off
echo echo.
echo echo  ========================================
echo echo   SISTEMA DE IA LOCAL DE ELITE
echo echo   Joaquim Eugenio Machava
echo echo  ========================================
echo echo.
echo echo   Escolhe o cerebro:
echo echo.
echo echo   1. MESTRE    (coordenador geral)
echo echo   2. LINGUISTA (textos, CVs, conteudo)
echo echo   3. LOGICO    (calculos, orcamentos)
echo echo   4. ESTRATEGA (planos, negocios)
echo echo   5. CONSELHEIRO (reflexao, motivacao)
echo echo.
echo set /p OPCAO="  Numero (1-5): "
echo.
echo if "%%OPCAO%%"=="1" ollama run mestre
echo if "%%OPCAO%%"=="2" ollama run linguista
echo if "%%OPCAO%%"=="3" ollama run logico
echo if "%%OPCAO%%"=="4" ollama run estratega
echo if "%%OPCAO%%"=="5" ollama run conselheiro
) > "%PASTA%\INICIAR.bat"
echo [OK] Menu criado em %PASTA%\INICIAR.bat

echo.
echo  ============================================
echo   INSTALACAO COMPLETA!
echo  ============================================
echo.
echo  Pasta: %PASTA%
echo.
echo  COMO USAR:
echo    1. Abre a pasta %PASTA%
echo    2. Clica duas vezes em INICIAR.bat
echo    3. Escolhe o cerebro (1 a 5)
echo    4. Escreve a tua pergunta
echo.
echo  CEREBROS DISPONIVEIS:
echo    ollama run mestre      (coordenador)
echo    ollama run linguista   (textos)
echo    ollama run logico      (calculos)
echo    ollama run estratega   (planos)
echo    ollama run conselheiro (reflexao)
echo.
echo  ============================================
echo.
pause
