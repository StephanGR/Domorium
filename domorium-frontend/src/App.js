import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Aquarium/Dashboard';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={Register} />
        <Route path="/dashboard" element={Dashboard} />
        {/* Ajoutez d'autres routes au besoin */}
      </Routes>
    </Router>
  );
}

export default App;
