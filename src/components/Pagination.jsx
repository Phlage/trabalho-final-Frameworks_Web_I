import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
`

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  background: #ee1515;
  color: white;
  cursor: pointer;
  font-weight: bold;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};

  &:hover {
    background: ${(props) => (props.disabled ? '#ee1515' : '#cc0000')};
  }
`

const Info = styled.span`
  font-weight: 500;
  color: #444;
`

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <Wrapper>
      <Button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Anterior
      </Button>
      <Info>
        Página {page} de {totalPages}
      </Info>
      <Button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Próxima
      </Button>
    </Wrapper>
  )
}
