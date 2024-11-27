import React, { useState, useEffect } from 'react';
import api from '../services/axios';
import LogoutButton from '../components/LogoutButton'; // Importar el LogoutButton

const AdminDashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [facturasPorCobrar, setFacturasPorCobrar] = useState(0);
  const [facturasPorPagar, setFacturasPorPagar] = useState(0);
  const [facturasVencidas, setFacturasVencidas] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Obtener resumen financiero
        const dashboardResponse = await api.get('/facturas/dashboard/');
        setFacturasPorCobrar(dashboardResponse.data.total_por_cobrar);
        setFacturasPorPagar(dashboardResponse.data.total_por_pagar);
        setFacturasVencidas(dashboardResponse.data.vencidas_por_cobrar);

        // Obtener lista de usuarios
        const usersResponse = await api.get('/auth/');
        setUsuarios(usersResponse.data);
      } catch (err) {
        setError('Error al cargar los datos del dashboard.');
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Panel de Administrador</h1>
        {/* Botón de Logout */}
        <LogoutButton />
      </header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <section>
        <h2>Resumen Financiero</h2>
        <ul>
          <li>Total por Cobrar: ${facturasPorCobrar}</li>
          <li>Total por Pagar: ${facturasPorPagar}</li>
          <li>Facturas Vencidas: ${facturasVencidas}</li>
        </ul>
      </section>
      
      <section>
        <h2>Gestión de Usuarios</h2>
        {usuarios.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay usuarios registrados.</p>
        )}
      </section>

      <section>
        <h2>Acciones</h2>
        <p>
          Como administrador, puedes gestionar facturas, usuarios, clientes y proveedores desde este panel.
        </p>
      </section>
    </div>
  );
};

export default AdminDashboard;
