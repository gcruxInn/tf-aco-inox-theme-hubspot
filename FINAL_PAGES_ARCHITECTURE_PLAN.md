# Plano Mestre: Arquitetura Final de Páginas (TFAHUB251)

Este documento estabelece o caminho **Enterprise Grade** para finalizar o desenvolvimento das páginas do site TF Aço Inox, seguindo a diretriz do briefing e as melhores práticas técnicas e de performance ("Set-and-Forget") do HubSpot CMS.

## 1. Abordagem Arquitetural ("Set-and-Forget")

Após consulta rigorosa à documentação oficial do HubSpot CMS e baseados na premissa inegociável de **Autonomic Computing**, dividimos o site em 3 trilhas 100% NATIVAS.
Nenhum sistema de middleware atuará nas regras do negócio CMS - os dados serão renderizados na mesma velocidade e resiliência da borda global do HubSpot. O princípio aqui é garantir uma escalabilidade "Set-and-Forget", **onde a lógica vive e respira apenas no ecossistema HubSpot**.

### Trilha A: Páginas Estáticas (Páginas de Alta Customização)
Páginas que possuem layouts únicos que fogem de um padrão serializado. Serão construídas como **Site Pages** normais utilizando Drag & Drop (DND) Templates.

- **Home (`/`)**: [EM ANDAMENTO] Integração do layout com tokens premium e Hero Section customizado.
- **Sobre Nós (`/sobre`)**: Template DND, utilizando módulos de Timeline, Cards Numéricos e Depoimentos.
- **Contato (`/contato`)**: Template com grid de duas colunas, integrando o Native Forms do HubSpot e Google Maps Embed.
- **Páginas Utilitárias (Orçamento, Obrigado, 404, Privacidade)**: Landing e Site pages diretas com foco total em conversão (LP de Orçamento com Formulário Longo).

### Trilha B: Data-Driven Pages (Static-First & CRM Objects)
A arquitetura da Trilha B é **Static-First**. A dinamicidade futura será ancorada nativamente via **CRM Objects** (Produtos/Line Items). Toda a exibição de serviços e portfólio é resolvida via **Custom Modules estáticos autossuficientes com campos repetidores (Repeater Groups)** controlados pela equipe de marketing.

#### B.1. Páginas de Serviços (`/servicos`)
- **Implementação**: 
  - Utilização de módulos drag-and-drop (`tfa-services-grid.module`) baseados em Repeaters.
  - O marketing cadastrará manualmente: Ícone, Nome, Descrição Curta e Link.

#### B.2. Portfólio de Projetos (`/portfolio`)
- **Implementação**:
  - Utilização do módulo de Vitrine de Obras (`tfa-portfolio-grid.module`) inteligente.
  - Campos repetidores (Repeater) para a equipe de marketing cadastrar manualmente: Imagem, Título da Obra, Categoria e Breve Escopo.
  - Totalmente adaptado ao Vibe Blueprint (Dark/Silver, tipografia clara, estética Industrial Premium).

### Trilha C: Componentes Nativos
#### C.1. Blog (`/blog`)
- **Implementação**: Usaremos o **Native Blog Engine** do HubSpot. Nada de reinvenções exóticas aqui.
- O template base (`ProX Blog with Sidebar`) será adaptado para o Vibe Blueprint da marca.
- Vantagem: Automação out-of-the-box para feeds RSS, disparo de emails de "novo post" e geração de meta-data de schema `Article` para SEO.

---

## 2. Mapa de Ação & Cronograma (Execução Imediata)

### Stage 1: Construção das Páginas Estáticas Core
1. Criar o template de "Sobre" com blocos de texto, imagem lateral e Timeline customizado.
2. Criar as Landing Pages utilitárias, principalmente a "Central de Orçamentos" focada em UX B2B premium e Formulários otimizados do HubSpot.

### Stage 2: Sistema de Blog
1. Refinar o Post Layout e o Listing Layout nativo.
2. Garantir que os _tokens_ visuais definidos em `vibe-blueprint.json` (como o prata industrial e Dark Mode text colors) rejam as listas de tags e links.

## 3. Integração com IA (Valor Futuro Agregado)
Durante a construção destas páginas, todos os formulários (`Contact Forms`, `Quote Forms`) serão mapeados para o CRM com IDs previsíveis. O futuro chatbot treinado via Claude MCP utilizará esses pontos de entrada para repassar leads com contexto rico ("este usuário navegou 20 min nas páginas de Portfólio Industrial antes de converter").
