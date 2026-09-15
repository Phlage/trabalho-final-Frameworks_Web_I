# Pokédex React

Projeto final da disciplina **Frameworks Web I** — Unilavras.

## Descrição

Aplicação web interativa que consome a [PokéAPI](https://pokeapi.co/) para exibir uma
listagem de pokémons com paginação, busca em tempo real, filtro por tipo, e uma página
de detalhes com estatísticas, habilidades e descrição de cada pokémon.

## Integrantes

- João Marcelo de Almeida Garcia

## Tecnologias utilizadas

- [React](https://react.dev/) (com Vite)
- [react-router-dom](https://reactrouter.com/) — roteamento entre páginas
- [axios](https://axios-http.com/) — consumo da PokéAPI
- [styled-components](https://styled-components.com/) — estilização (CSS-in-JS)

## Funcionalidades

- Listagem de pokémons com paginação (20 por página)
- Busca dinâmica pelo nome do pokémon
- Filtro por tipo (fire, water, grass, etc.), combinável com a busca
- Página de detalhes (`/pokemon/:id`) com sprite, tipos, altura, peso, habilidades,
  estatísticas base e descrição
- Indicadores de carregamento (loading) e tratamento de erros de API
- Componentização (Header, SearchBar, FilterType, PokemonCard, Pagination, Loader,
  ErrorMessage)

## Como executar o projeto localmente

Pré-requisitos: [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/trabalho-final-Frameworks_Web_I.git
cd trabalho-final-Frameworks_Web_I

# 2. Instale as dependências
npm install

# 3. Rode o projeto em modo de desenvolvimento
npm run dev
```

O terminal exibirá o endereço local (geralmente `http://localhost:5173`) para acessar
a aplicação no navegador.

### Build de produção

```bash
npm run build
npm run preview
```

## Estrutura do projeto

```
src/
├── components/     # Componentes reutilizáveis (Header, SearchBar, PokemonCard, ...)
├── pages/          # Páginas da aplicação (Home, PokemonDetails)
├── services/       # Configuração do axios e chamadas à PokéAPI
├── utils/          # Funções utilitárias (cores por tipo de pokémon)
├── App.jsx         # Definição das rotas
└── main.jsx        # Ponto de entrada da aplicação
```
