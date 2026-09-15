import styled from 'styled-components'

const Box = styled.div`
  background: #fff0f0;
  border: 1px solid #ffb3b3;
  color: #b30000;
  padding: 1.2rem 1.5rem;
  border-radius: 10px;
  margin: 2rem auto;
  max-width: 500px;
  text-align: center;
`

export default function ErrorMessage({ message = 'Ocorreu um erro ao carregar os dados. Tente novamente.' }) {
  return (
    <Box>
      <strong>Ops!</strong>
      <p>{message}</p>
    </Box>
  )
}
