import React from 'react'
import './App.css'
import Tiles from './components/Tiles'

function App() {
  return (
    <div className="App">
      <h1>
        Rick & Morty API{' '}
        <span role="img" aria-labelledby="ufo">
          🛸
        </span>
      </h1>
      <Tiles />
    </div>
  )
}

export default App
