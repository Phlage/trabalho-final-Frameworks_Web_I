import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

// Extrai o ID do pokémon a partir da URL retornada pela API
// Ex: https://pokeapi.co/api/v2/pokemon/25/ -> 25
export function getIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean)
  return parts[parts.length - 1]
}

export function getSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export function getOfficialArtworkUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

// Busca a lista "leve" de todos os pokémons (nome + url). Usamos um limite alto
// para poder fazer busca e filtro no cliente, com paginação sendo feita localmente.
export async function fetchAllPokemonNames() {
  const response = await api.get('/pokemon', { params: { limit: 1300, offset: 0 } })
  return response.data.results // [{ name, url }]
}

// Busca a lista de todos os tipos disponíveis (fire, water, grass, etc.)
export async function fetchAllTypes() {
  const response = await api.get('/type')
  return response.data.results
    .map((t) => t.name)
    .filter((name) => !['unknown', 'shadow'].includes(name))
}

// Busca os pokémons de um tipo específico, retorna um Set com os nomes
export async function fetchPokemonNamesByType(type) {
  const response = await api.get(`/type/${type}`)
  return new Set(response.data.pokemon.map((p) => p.pokemon.name))
}

// Busca os detalhes completos de um pokémon (por nome ou id)
export async function fetchPokemonDetails(nameOrId) {
  const response = await api.get(`/pokemon/${nameOrId}`)
  return response.data
}

// Busca a descrição da espécie (para exibir um texto na página de detalhes)
export async function fetchPokemonSpecies(nameOrId) {
  const response = await api.get(`/pokemon-species/${nameOrId}`)
  return response.data
}

export default api
