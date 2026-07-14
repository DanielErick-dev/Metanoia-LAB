# Metanoia Lab

Laboratório de conhecimento: teologia, filosofia, história, inglês, programação e outros domínios de estudo, organizados em categorias hierárquicas (com subcategorias, quando necessário) e artigos de leitura longa.

## Como o conteúdo funciona

Não há backend nem banco de dados — todo o conteúdo é estático, definido em arquivos TypeScript:

- `frontend/src/lib/categories/index.ts` — árvore de categorias (raiz e subcategorias, com slug, título, cor de destaque e imagem de capa)
- `frontend/src/lib/topics/*.ts` — os artigos em si (introdução, citação, seções, exemplos com bloco de código, tópicos relacionados)

Novos artigos e categorias são adicionados editando esses arquivos diretamente.

## Stack

- **Frontend**: Next.js 16 (App Router) + TailwindCSS 4
- **Roteamento**: rota catch-all (`[...slug]`) que resolve tanto categorias quanto artigos a partir da árvore de categorias
- **Deploy**: Vercel
