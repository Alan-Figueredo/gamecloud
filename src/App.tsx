import './App.css'
import { Index } from './views/Index'
import { GameDetail } from './views/GameDetail/GameDetail'
import "react-bootstrap"
import { NavBar } from './components/NavBar/NavBar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { OptionsContextProvider } from './context/OptionsContext'

function App() {
  return (
    <Router>
      <NavBar />
      <OptionsContextProvider>
        <Routes>
          <Route index path="/" element={<Index />} />
          <Route path=":gameID" element={<GameDetail />} />
        </Routes>
      </OptionsContextProvider>
    </Router>


  )
}

export default App
