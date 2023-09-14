
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

import Login from './screens/login/login';

import HomePage from './screens/homePage/homePage';

import PatrimonioPage from './screens/patrimonio/patrimonio';

function App() {
  return (
    <Router>
      <Routes>
      <Route index path="/" element={<Login/>} />
      <Route index path="/home" element={<HomePage/>} />
      <Route index path="/patrimonio" element={<PatrimonioPage/>} />

      </Routes>
        
    </Router>
  );
}

export default App;
