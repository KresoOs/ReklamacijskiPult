import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { RoutesNames } from './constants'
import { Route, Routes } from 'react-router-dom'

import Pocetna from './pages/Pocetna'
import Djelatnici from './pages/djelatnici/Djelatnici'
import DjelatniciDodaj from './pages/djelatnici/DjelatniciDodaj'
import DjelatniciPromjena from './pages/djelatnici/DjelatniciPromjena'



function App() {
  

  return (
    <div className="App" >
    <>
      <NavBar/>
      <Routes>
      <Route path={RoutesNames.HOME} element={<Pocetna/>}/>
      <Route path={RoutesNames.DJELATNIK_PREGLED} element={<Djelatnici/>}/>
      <Route path={RoutesNames.DJELATNIK_NOVI} element={<DjelatniciDodaj />}/>
      <Route path={RoutesNames.DJELATNIK_PROMJENI} element={<DjelatniciPromjena/>}/>
        
      </Routes>
    </>
    </div>
  )
}

export default App
