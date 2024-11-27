import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // Si el usuario no tiene un token válido, redirigir al login
  if (!token) {
    alert('Debe iniciar sesión para acceder a esta página.');
    return <Navigate to="/" />;
  }

  // Si el rol no coincide con el requerido, redirigir al login
  if (userRole !== role) {
    alert('No tiene permiso para acceder a esta página.');
    return <Navigate to="/" />;
  }

  // Si todo está bien, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;
