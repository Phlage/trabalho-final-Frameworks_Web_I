import styled from 'styled-components'

const Select = styled.select`
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background: white;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #ee1515;
  }
`

export default function FilterType({ types, value, onChange }) {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Todos os tipos</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </Select>
  )
}
