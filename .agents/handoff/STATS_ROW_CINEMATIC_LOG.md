# 📊 Stats Row: O Voo dos Números (Padrão UAU GRANDE)

> **Contexto:** Módulo de estatísticas do projeto TFAHUB251.
> **Desafio:** Criar uma experiência "cinematográfica" onde os números parecem atravessar a tela de forma sólida e impactante.

## 🛠️ Arquitetura Técnica Final

### 1. Adeus ao `pin: true`, Olá `position: sticky`
Devido à complexidade dos wrappers do HubSpot (que aplicam `transform` e `translate` dinâmicos no modo edição), o `pin` do GSAP gerava "pin-spacers" com alturas erradas ou criava telas brancas no final da seção.
**Solução:** 
- A seção pai (`.tfa-stats-section`) recebe uma altura dinâmica via JS baseada em `itens * 75vh`.
- O container interno (`.stats-pinned-container`) usa `position: sticky; top: 0`.
- Isso garante que os números fiquem fixos enquanto o scroll percorre a altura da seção pai de forma nativa e estável.

### 2. O Voo 2D (Performance First)
Inicialmente tentamos `translateZ`, mas bugs de renderização no Webkit (Safari/Chrome Mobile) faziam os números desaparecerem ao cruzar o plano da câmera.
**Solução:** 
- Usamos `scale` de `0.1` (fundo) para `1.0` (foco) e `5.0` (atravessando a câmera).
- A base matemática para os tempos foi de `7 unidades de tempo virtual` por número, garantindo transições suaves e sem sobreposição borrada.

### 3. Debug HUD (Numbers Vision)
Desenvolvemos um HUD que exibe o progresso do "Scrub Master". Isso permitiu identificar que o módulo anterior ("O PROCESSO") estava impactando o cálculo de início desta seção.
**Comando de Ajuste:** Adicionamos um `setTimeout` de 500ms para o `ScrollTrigger.refresh()` para garantir que a página já estabilizou antes de calcular os gatilhos dos números.

## 🏁 Resultado
Uma interface que exala o "Aço Industrial" da Tradipar: pesada, precisa e irrefreável.
