import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Solicitud a la API de login
      const response = await axios.post('http://18.230.216.176:8000/api/auth/login/', {
        email,
        password,
      });

      // Desestructurar la respuesta
      const { token, user } = response.data; // Asegúrate de que el backend devuelve "user" con el campo "rol"

      // Validar que el campo 'rol' exista
      if (!user.rol) {
        setError('El rol no está especificado en la respuesta de la API.');
        return;
      }

      // Almacenar el token y el rol en el localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.rol);

      // Redirigir según el rol del usuario
      switch (user.rol) {
        case 'Administrador':
          navigate('/admin');
          break;
        case 'Contador':
          navigate('/contador');
          break;
        case 'Gerente':
          navigate('/gerente');
          break;
        default:
          setError('Rol desconocido.');
      }
    } catch (err) {
      // Manejo de errores
      setError('Credenciales incorrectas o problema de conexión.');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
