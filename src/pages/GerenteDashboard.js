import React, { useState, useEffect } from 'react';
import api from '../services/axios';
import LogoutButton from '../components/LogoutButton'; // Importar el LogoutButton

const GerenteDashboard = () => {
  const [proximasFacturas, setProximasFacturas] = useState([]);
  const [facturasVencidas, setFacturasVencidas] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/facturas/dashboard/');
        setProximasFacturas(response.data.proximos_vencimientos);
        setFacturasVencidas(response.data.vencidas_por_cobrar);
      } catch (err) {
        setError('Error al cargar los datos del dashboard.');
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Panel del Gerente</h1>
        {/* Botón de Logout */}
        <LogoutButton />
      </header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Facturas Vencidas</h2>
        <p>Total: ${facturasVencidas}</p>
      </div>
      <div>
        <h2>Próximos Vencimientos</h2>
        {proximasFacturas.length > 0 ? (
          <ul>
            {proximasFacturas.map((factura) => (
              <li key={factura.id}>
                {factura.numero_factura} - Vence el {factura.fecha_vencimiento} - ${factura.monto_total}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay facturas próximas a vencer.</p>
        )}
      </div>
    </div>
  );
};

export default GerenteDashboard;
