import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { RoutesNames } from './constants'
import { Route, Routes } from 'react-router-dom'

import Pocetna from './pages/Pocetna'
import Djelatnici from './pages/djelatnici/Djelatnici'
import DjelatniciDodaj from './pages/djelatnici/DjelatniciDodaj'
import DjelatniciPromjena from './pages/djelatnici/DjelatniciPromjena'
import Proizvodi from './pages/proizvodi/Proizvodi'
import ProizvodiPromjena from './pages/proizvodi/ProizvodiPromjena'
import ProizvodiDodaj from './pages/proizvodi/ProizvodiDodaj'
import Radninalozi from './pages/radninalozi/Radninalozi'
import RadninaloziDodaj from './pages/radninalozi/RadninaloziDodaj'
import RadninaloziPromjena from './pages/radninalozi/RadninaloziPromjena'
import Kupci from './pages/kupci/Kupci'
import KupciDodaj from './pages/kupci/KupciDodaj'
import KupciPromjena from './pages/kupci/KupciPromjena'
import Stanja from './pages/stanja/Stanja'
import StanjaDodaj from './pages/stanja/StanjaDodaj'
import StanjaPromjena from './pages/stanja/StanjaPromjena'


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
      
      <Route path={RoutesNames.PROIZVOD_PREGLED} element={<Proizvodi/>}/>
      <Route path={RoutesNames.PROIZVOD_NOVI} element={<ProizvodiDodaj/>}/>
      <Route path={RoutesNames.PROIZVOD_PROMJENI} element={<ProizvodiPromjena/>}/>

      <Route path={RoutesNames.RADNINALOG_PREGLED} element={<Radninalozi/>}/>
      <Route path={RoutesNames.RADNINALOG_NOVI} element={<RadninaloziDodaj/>}/>
      <Route path={RoutesNames.RADNINALOG_PROMIJENI} element={<RadninaloziPromjena/>}/>


      <Route path={RoutesNames.KUPAC_PREGLED} element={<Kupci/>}/>
      <Route path={RoutesNames.KUPAC_NOVI} element={<KupciDodaj />}/>
      <Route path={RoutesNames.KUPAC_PROMJENI} element={<KupciPromjena/>}/>

      <Route path={RoutesNames.STANJE_PREGLED} element={<Stanja/>}/>
      <Route path={RoutesNames.STANJE_NOVI} element={<StanjaDodaj />}/>
      <Route path={RoutesNames.STANJE_PROMJENI} element={<StanjaPromjena/>}/>

        
      </Routes>
    </>
    </div>
  )
}

export default App
