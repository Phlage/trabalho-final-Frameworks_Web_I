import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Bar = styled.header`
  background: linear-gradient(135deg, #ee1515, #cc0000);
  color: white;
  padding: 1.2rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`

const Logo = styled.img`
  width: 40px;
  height: 40px;
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  letter-spacing: 1px;
`

export default function Header() {
  return (
    <Bar>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Logo src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Pokédex" />
        <Title>Pokédex React</Title>
      </Link>
    </Bar>
  )
}
