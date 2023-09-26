
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

import Login from './screens/login/login';

import HomePage from './screens/homePage/homePage';

import PatrimonioPage from './screens/patrimonio/patrimonio';
import SalasPage from './screens/salas/salas';
import Sala from './screens/salas/sala';
import PatrimonioSalaPage from './screens/patrimonio/patrimonioSala';


import PrivateRoute from './screens/privateRoute/privateRoute';
import TurmaSalaPage from './screens/turma/turmaSala';
import InformacoesPage from './screens/informacoes/informacoes';
import ManutencoesSalaPage from './screens/manutencoes/manutencoesSala';
import CreateSala from './screens/salas/createSala';
import CreateItem from './screens/patrimonio/createItem';
import CreatePatrimonio from './screens/patrimonio/createPatrimonio';
import TurmasPage from './screens/turma/turmas';
import CreateTurma from './screens/turma/createTurma';
import CreateSalaTurma from './screens/turma/createTurmaSala';
import CreateManutencaoSala from './screens/manutencoes/createManutencaoSala';
import EditItem from './screens/patrimonio/editItem';
import EditTurma from './screens/turma/editTurma';
import EditSala from './screens/salas/editSala';
import EditPatrimonioSala from './screens/patrimonio/editPatrimonioSala';
import EditManutencaoSala from './screens/manutencoes/editManutencao';
import SalasDisponiveisPage from './screens/salas/salas_disponiveis';
import ManutencoesPendentesPages from './screens/manutencoes/manutencoes_pendentes';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route index path="/patrimonio" element={<PatrimonioPage/>} />
          <Route index path="/sala" element={<SalasPage/>}/>
          <Route index path="/sala/:id" element={<Sala/>} />
          <Route index path="/patrimonio/:id" element={<PatrimonioSalaPage/>} />
          <Route index path="/turma/:id" element={<TurmaSalaPage/>} />
          <Route index path="/manutencao/:id" element={<ManutencoesSalaPage/>} />
          <Route index path="/informacao/:id" element={<InformacoesPage/>} />
          <Route index path="/novaSala" element={<CreateSala/>} />
          <Route index path="/novoItem" element={<CreateItem/>} />
          <Route index path="/novoPatrimonio/:id" element={<CreatePatrimonio/>} />
          <Route index path="/turmas" element={<TurmasPage/>} />
          <Route index path="/novaTurma" element={<CreateTurma/>} />
          <Route index path="/novaSalaTurma/:id" element={<CreateSalaTurma/>} />
          <Route index path="/novaManutencaoSala/:id" element={<CreateManutencaoSala/>} />
          <Route index path="/editarItem/:id" element={<EditItem/>} />
          <Route index path="/editarTurma/:id" element={<EditTurma/>} />
          <Route index path="/editarSala/:id" element={<EditSala/>} />
          <Route index path="/editarPatrimonioSala/:id" element={<EditPatrimonioSala/>} />
          <Route index path="/editarManutencaoSala/:id" element={<EditManutencaoSala/>} />
          <Route index path="/salas_disponiveis" element={<SalasDisponiveisPage/>} />
          <Route index path="/manutencoes_pendentes" element={<ManutencoesPendentesPages/>} />
        </Route>
     
      
      </Routes>
        
    </Router>
  );
}

export default App;
