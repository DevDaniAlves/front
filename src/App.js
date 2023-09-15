
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

import Login from './screens/login/login';

import HomePage from './screens/homePage/homePage';

import PatrimonioPage from './screens/patrimonio/patrimonio';
import SalasPage from './screens/salas/salas';
import Sala from './screens/salas/sala';
import PatrimonioSalaPage from './screens/patrimonio/patrimonioSala';
import TurmaSalaPage from './screens/turma/turma';
import ManutencoesSalasPage from './screens/manutencoes/manutencoes';

function App() {
  return (
    <Router>
      <Routes>
      <Route index path="/" element={<Login/>} />
      <Route index path="/home" element={<HomePage/>} />
      <Route index path="/patrimonio" element={<PatrimonioPage/>} />
      <Route index path="/sala" element={<SalasPage/>}/>
      <Route index path="/sala/:id" element={<Sala/>} />
      <Route index path="/patrimonio/:id" element={<PatrimonioSalaPage/>} />
      <Route index path="/turma/:id" element={<TurmaSalaPage/>} />
      <Route index path="/manutencao/:id" element={<ManutencoesSalasPage/>} />
      </Routes>
        
    </Router>
  );
}

export default App;
