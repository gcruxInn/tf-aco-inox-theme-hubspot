---
name: hubspot-validator
description: Skill mandatória para validar qualquer código de template ou módulo HubSpot contra as regras estruturais e de sintaxe do projeto TFAHUB251.
---

# Instruções de Validação HubSpot (Static-First)

Sempre que atuar em arquivos `.html`, `.css` ou `.js` dentro do repositório TFAHUB251, aplique as seguintes verificações:

1. **Pureza de Sintaxe HubL (CRÍTICO)**
   - Garanta que as tags HubL `{%` e `{{` não possuam espaços ou quebras de linha fragmentando a abertura ou fechamento (Ex: `{ %` ou `} }` são terminantemente **PROIBIDOS**).
   - Valide se as tags de `include`, `macro` e `set` estão preferencialmente em linha única.

2. **Mantra Static-First**
   - As integrações de dados dinâmicos devem ser geridas exclusivamente através de Custom Modules utilizando **Repeater Groups** (fields.json).
   - Tipos de campos como `textarea` não devem ser usados em novos módulos, priorizando os compatíveis com configurações detalhadas (2026-compliant).

3. **Governança de Grid/Column Stacking (Peace Protocol)**
   - O Content Editor da HubSpot não deve sobrepor colunas indevidamente. Verifique se o código preserva a contenção em `.hs-edit-mode`.

4. **Nenhum Middleware Externo**
   - Rejeite e remova qualquer lógica arquitetural que sugira Node.js externo, Vercel, n8n, ou integrações fora do ecossistema HubSpot para regras de negócio primárias. Somente Serverless Functions residentes na pasta `functions/` (Node.js 18+) são permitidas.
