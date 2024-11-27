import React, { useState, useEffect } from 'react';
import api from '../services/axios';
import LogoutButton from '../components/LogoutButton'; // Importar el LogoutButton

const ContadorDashboard = () => {
  const [facturasPorCobrar, setFacturasPorCobrar] = useState(0);
  const [facturasPorPagar, setFacturasPorPagar] = useState(0);
  const [facturasVencidas, setFacturasVencidas] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/facturas/dashboard/');
        setFacturasPorCobrar(response.data.total_por_cobrar);
        setFacturasPorPagar(response.data.total_por_pagar);
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
        <h1>Panel del Contador</h1>
        {/* Botón de Logout */}
        <LogoutButton />
      </header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Resumen Financiero</h2>
        <ul>
          <li>Total por Cobrar: ${facturasPorCobrar}</li>
          <li>Total por Pagar: ${facturasPorPagar}</li>
          <li>Facturas Vencidas: ${facturasVencidas}</li>
        </ul>
      </div>
      <div>
        <h2>Próximos pasos</h2>
        <p>Consulta las facturas pendientes y vencidas para priorizar acciones.</p>
      </div>
    </div>
  );
};

export default ContadorDashboard;
