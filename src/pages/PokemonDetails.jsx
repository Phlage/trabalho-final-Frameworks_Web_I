import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { fetchPokemonDetails, fetchPokemonSpecies, getOfficialArtworkUrl } from '../services/pokeApi.js'
import { getTypeColor } from '../utils/typeColors.js'

const Container = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #cc0000;
  font-weight: bold;
`

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
`

const TopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
`

const Img = styled.img`
  width: 220px;
  height: 220px;
  object-fit: contain;
`

const Name = styled.h2`
  text-transform: capitalize;
  margin: 0 0 0.4rem;
  font-size: 2rem;
`

const TypesRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const TypeBadge = styled.span`
  background: ${(props) => props.color};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  text-transform: capitalize;
`

const StatsGrid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
`

const StatBox = styled.div`
  background: #f7f7fb;
  border-radius: 10px;
  padding: 0.8rem 1rem;
`

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
`

const StatValue = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`

const Description = styled.p`
  margin-top: 1.5rem;
  line-height: 1.6;
  color: #444;
`

export default function PokemonDetails() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadDetails() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPokemonDetails(id)
        setPokemon(data)

        try {
          const species = await fetchPokemonSpecies(id)
          const entry = species.flavor_text_entries.find((e) => e.language.name === 'pt') ||
            species.flavor_text_entries.find((e) => e.language.name === 'en')
          if (entry) {
            setDescription(entry.flavor_text.replace(/\f|\n/g, ' '))
          }
        } catch (speciesErr) {
          console.warn('Não foi possível carregar a descrição da espécie.', speciesErr)
        }
      } catch (err) {
        console.error(err)
        setError('Pokémon não encontrado ou falha ao consultar a PokéAPI.')
      } finally {
        setLoading(false)
      }
    }
    loadDetails()
  }, [id])

  return (
    <Container>
      <BackLink to="/">&larr; Voltar para a lista</BackLink>

      {loading && <Loader message="Carregando detalhes..." />}
      {error && <ErrorMessage message={error} />}

      {pokemon && !loading && !error && (
        <Card>
          <TopRow>
            <Img
              src={getOfficialArtworkUrl(pokemon.id)}
              alt={pokemon.name}
              onError={(e) => {
                e.target.src = pokemon.sprites.front_default
              }}
            />
            <div>
              <span style={{ color: '#999' }}>#{String(pokemon.id).padStart(3, '0')}</span>
              <Name>{pokemon.name}</Name>
              <TypesRow>
                {pokemon.types.map((t) => (
                  <TypeBadge key={t.type.name} color={getTypeColor(t.type.name)}>
                    {t.type.name}
                  </TypeBadge>
                ))}
              </TypesRow>
              <p>
                <strong>Altura:</strong> {pokemon.height / 10} m &nbsp;|&nbsp;
                <strong> Peso:</strong> {pokemon.weight / 10} kg
              </p>
              <p>
                <strong>Habilidades:</strong>{' '}
                {pokemon.abilities.map((a) => a.ability.name).join(', ')}
              </p>
            </div>
          </TopRow>

          {description && <Description>{description}</Description>}

          <StatsGrid>
            {pokemon.stats.map((s) => (
              <StatBox key={s.stat.name}>
                <StatLabel>{s.stat.name}</StatLabel>
                <StatValue>{s.base_stat}</StatValue>
              </StatBox>
            ))}
          </StatsGrid>
        </Card>
      )}
    </Container>
  )
}
