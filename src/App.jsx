import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import PokemonDetails from './pages/PokemonDetails.jsx'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route
          path="*"
          element={
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h2>Página não encontrada</h2>
            </div>
          }
        />
      </Routes>
    </>
  )
}
