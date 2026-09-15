import styled from 'styled-components'

const Input = styled.input`
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  max-width: 320px;
  outline: none;

  &:focus {
    border-color: #ee1515;
  }
`

export default function SearchBar({ value, onChange }) {
  return (
    <Input
      type="text"
      placeholder="Buscar pokémon pelo nome..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
