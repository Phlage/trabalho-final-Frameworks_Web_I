import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Card = styled(Link)`
  background: white;
  border-radius: 14px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
  }
`

const Img = styled.img`
  width: 110px;
  height: 110px;
  object-fit: contain;
`

const Number = styled.span`
  color: #999;
  font-size: 0.85rem;
`

const Name = styled.h3`
  margin: 0.2rem 0 0.6rem;
  text-transform: capitalize;
`

export default function PokemonCard({ id, name, sprite }) {
  return (
    <Card to={`/pokemon/${id}`}>
      <Number>#{String(id).padStart(3, '0')}</Number>
      <Img
        src={sprite}
        alt={name}
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
        }}
      />
      <Name>{name}</Name>
    </Card>
  )
}
