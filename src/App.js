import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './pages/AdminDashboard';
import ContadorDashboard from './pages/ContadorDashboard';
import GerenteDashboard from './pages/GerenteDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta de Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas por roles */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="Administrador">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contador"
          element={
            <ProtectedRoute role="Contador">
              <ContadorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gerente"
          element={
            <ProtectedRoute role="Gerente">
              <GerenteDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
