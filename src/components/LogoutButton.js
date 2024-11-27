import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar token y role de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Redirigir al login
    navigate('/');
  };

  return (
    <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px' }}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
