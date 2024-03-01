import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import POSPage from './pages/POSPage';
import Dashboard from './pages/Dashboard';
import Update from './pages/Update';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pos" element={<POSPage/>} />
        <Route path="/" element={<Dashboard />}/>
        <Route path="/edit/:firebaseId" element={<Update />}/>
      </Routes>
    </Router>
  );
}

export default App;