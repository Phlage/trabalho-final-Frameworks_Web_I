import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../components/SearchBar.jsx'
import FilterType from '../components/FilterType.jsx'
import PokemonCard from '../components/PokemonCard.jsx'
import Pagination from '../components/Pagination.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import {
  fetchAllPokemonNames,
  fetchAllTypes,
  fetchPokemonNamesByType,
  getIdFromUrl,
  getSpriteUrl,
} from '../services/pokeApi.js'

const ITEMS_PER_PAGE = 20

const Container = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 2rem 3rem;
`

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`

const EmptyState = styled.p`
  text-align: center;
  color: #777;
  margin: 3rem 0;
`

export default function Home() {
  const [allPokemon, setAllPokemon] = useState([]) // [{ name, url }]
  const [types, setTypes] = useState([])
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [typeNames, setTypeNames] = useState(null) // Set com nomes do tipo selecionado
  const [page, setPage] = useState(1)

  const [loading, setLoading] = useState(true)
  const [typeLoading, setTypeLoading] = useState(false)
  const [error, setError] = useState(null)

  // Carrega a lista geral de pokémons e os tipos disponíveis (uma única vez)
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true)
        setError(null)
        const [pokemonList, typeList] = await Promise.all([fetchAllPokemonNames(), fetchAllTypes()])
        setAllPokemon(pokemonList)
        setTypes(typeList)
      } catch (err) {
        console.error(err)
        setError('Não foi possível carregar a lista de pokémons da PokéAPI.')
      } finally {
        setLoading(false)
      }
    }
    loadInitialData()
  }, [])

  // Sempre que o filtro de tipo mudar, busca os nomes dos pokémons daquele tipo
  useEffect(() => {
    async function loadType() {
      if (!selectedType) {
        setTypeNames(null)
        return
      }
      try {
        setTypeLoading(true)
        setError(null)
        const names = await fetchPokemonNamesByType(selectedType)
        setTypeNames(names)
      } catch (err) {
        console.error(err)
        setError('Não foi possível carregar os pokémons desse tipo.')
      } finally {
        setTypeLoading(false)
      }
    }
    loadType()
  }, [selectedType])

  // Sempre que busca ou filtro mudam, volta para a primeira página
  useEffect(() => {
    setPage(1)
  }, [search, selectedType])

  const filtered = useMemo(() => {
    return allPokemon.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.trim().toLowerCase())
      const matchesType = !typeNames || typeNames.has(p.name)
      return matchesSearch && matchesType
    })
  }, [allPokemon, search, typeNames])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <Container>
      <Filters>
        <SearchBar value={search} onChange={setSearch} />
        <FilterType types={types} value={selectedType} onChange={setSelectedType} />
      </Filters>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Loader message="Carregando pokémons..." />
      ) : typeLoading ? (
        <Loader message="Filtrando por tipo..." />
      ) : paginated.length === 0 ? (
        <EmptyState>Nenhum pokémon encontrado com esses filtros.</EmptyState>
      ) : (
        <>
          <Grid>
            {paginated.map((p) => {
              const id = getIdFromUrl(p.url)
              return <PokemonCard key={p.name} id={id} name={p.name} sprite={getSpriteUrl(id)} />
            })}
          </Grid>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </Container>
  )
}
