# Plano Mestre: Arquitetura Final de Páginas (TFAHUB251)

Este documento estabelece o caminho **Enterprise Grade** para finalizar o desenvolvimento das páginas do site TF Aço Inox, seguindo a diretriz do briefing e as melhores práticas técnicas e de performance ("Set-and-Forget") do HubSpot CMS.

## 1. Abordagem Arquitetural (O "Como")

Após consulta rigorosa à documentação oficial de desenvolvedores do HubSpot CMS, dividimos o restante do site em 3 trilhas estruturais baseadas em **como** os dados serão consumidos e editados pelo cliente no futuro. O princípio aqui é garantir **Escalabilidade, Segurança e Autonomia**.

### Trilha A: Páginas Estáticas (Páginas de Alta Customização)
Páginas que possuem layouts únicos que fogem de um padrão serializado. Serão construídas como **Site Pages** normais utilizando Drag & Drop (DND) Templates.

- **Home (`/`)**: [EM ANDAMENTO] Integração do layout com tokens premium e Hero Section customizado.
- **Sobre Nós (`/sobre`)**: Template DND, utilizando módulos de Timeline, Cards Numéricos e Depoimentos.
- **Contato (`/contato`)**: Template com grid de duas colunas, integrando o Native Forms do HubSpot e Google Maps Embed.
- **Páginas Utilitárias (Orçamento, Obrigado, 404, Privacidade)**: Landing e Site pages diretas com foco total em conversão (LP de Orçamento com Formulário Longo).

### Trilha B: Data-Driven Pages (HubDB Dynamic Pages)
Aplicado onde existe repetição sistemática de layouts para diferentes registros de dados. **Evitaremos a criação de dezenas de Site Pages individuais**, o que arruína a manutenção no longo prazo. O uso do HubDB automatizará a geração do SEO, categorias e URLs com a arquitetura `.../{slug}`.

#### B.1. Páginas de Serviços (`/servicos` e `/servicos/[slug]`)
- **Justificativa**: Embora sejam apenas 11 serviços, colocá-los no HubDB garante que novos serviços possam ser adicionados futuramente preenchendo apenas uma tabela.
- **Implementação**: 
  - Cria-se uma `HubDB Table` chamada "TF_Services" (Colunas: Nome, Slug, Descrição_Curta, Icone_SVG, Hero_Image, RichText_Body, Galeria_Fotos, FAQs_Array).
  - Cria-se um "Dynamic Page Template" onde:
    - Se a URL acessada flor `/servicos`, renderiza o Master/Listing View (Grid de serviços).
    - Se a URL for `/servicos/[slug]`, renderiza o Detail View chamando a variável nativa do HubDB para preencher o Hero, o Corpo e conditionally exibe módulos (ex: se tiver galeria, exibe, se não, esconde).

#### B.2. Portfólio de Projetos (`/portfolio` e `/portfolio/[slug]`)
- **Justificativa**: Portfólios crescem com o tempo. A equipe da TF Aço Inox precisa poder adicionar obras sem acionar desenvolvimento. O HubDB é o "state of the art" para isso no CMS Hub Professional.
- **Implementação**:
  - `HubDB Table`: "TF_Portfolio" (Colunas: Nome, Cliente, Categoria [Select], Data_Entrega, Featured_Image, Desafio [Rich Text], Solucao [Rich Text]).
  - Implementaremos **filtros via Query Parameters** (ex: `?categoria=industrial`) na página de listagem (`/portfolio`), processados via HubL no servidor, em vez de JavaScript de cliente pesado, preservando performance de vitrine e Core Web Vitals.

### Trilha C: Componentes Nativos
#### C.1. Blog (`/blog`)
- **Implementação**: Usaremos o **Native Blog Engine** do HubSpot. Nada de reinvenções exóticas aqui.
- O template base (`ProX Blog with Sidebar`) será adaptado para o Vibe Blueprint da marca.
- Vantagem: Automação out-of-the-box para feeds RSS, disparo de emails de "novo post" e geração de meta-data de schema `Article` para SEO.

---

## 2. Mapa de Ação & Cronograma (Execução Imediata)

### Stage 1: Fundação de Dados (HubDB Setup)
1. Rodar scripts locais para gerar a estrutura (esquema) das tabelas "Serviços" e "Portfólio" localmente se aplicável (via HubSpot CLI `hs hubdb create`).
2. Popular a tabela de Serviços primários descritos no JSON do briefing (Estruturas Metálicas, Corrimãos, Portões, etc.) via painel ou via API p/ preenchimento de teste.

### Stage 2: Construção dos Templates Dinâmicos (HubL Serverless)
1. Criar `dynamic-services-page.html` (com `is_available_for_new_content: false` para bloquear criação avulsa pelo cliente).
2. Construir o split `{% if dynamic_page_hubdb_row %}` (Detalhe) e `{% else %}` (Listagem).
3. Replicar a arquitetura robusta para o `dynamic-portfolio-page.html`.

### Stage 3: Construção das Páginas Estáticas Core
1. Criar o template de "Sobre" com blocos de texto, imagem lateral e Timeline customizado.
2. Criar as Landing Pages utilitárias, principalmente a "Central de Orçamentos" focada em UX B2B premium e Formulários otimizados do HubSpot.

### Stage 4: Sistema de Blog
1. Refinar o Post Layout e o Listing Layout nativo.
2. Garantir que os _tokens_ visuais definidos em `vibe-blueprint.json` (como o prata industrial e Dark Mode text colors) rejam as listas de tags e links.

## 3. Integração com IA (Valor Futuro Agregado)
Durante a construção destas páginas, todos os formulários (`Contact Forms`, `Quote Forms`) serão mapeados para o CRM com IDs previsíveis. O futuro chatbot treinado via Claude MCP utilizará esses pontos de entrada para repassar leads com contexto rico ("este usuário navegou 20 min nas páginas dinâmicas de Portfólio Industrial geradas pelo HubDB antes de converter").
