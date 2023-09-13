
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Login from './screens/login/login';
import HomePage from './screens/homePage/homePage';
function App() {
  return (
    <Router>
      <Routes>
      <Route index path="/" element={<Login/>} />
      <Route index path="/home" element={<HomePage/>} />

      </Routes>
        
    </Router>
  );
}

export default App;
