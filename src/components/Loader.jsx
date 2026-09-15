import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
  color: #555;
`

const Ball = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 6px solid #eee;
  border-top-color: #ee1515;
  animation: ${spin} 0.8s linear infinite;
`

export default function Loader({ message = 'Carregando...' }) {
  return (
    <Wrapper>
      <Ball />
      <p>{message}</p>
    </Wrapper>
  )
}
