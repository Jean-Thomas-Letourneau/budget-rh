import React from 'react';
import '../styles/App.css'
import NavigationBar from '../components/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DatabasePage from '../pages/DatabasePage';
import SummaryPage from '../pages/SummaryPage';
import SimulationsPage from '../pages/SimulationsPage';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/database" element={<DatabasePage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/simulations" element={<SimulationsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
