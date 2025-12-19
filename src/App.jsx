import React, { useEffect, useState } from 'react';
import InventoryPage from './features/inventory/inventoryPage';
import Login from './features/inventory/components/Login';
import './App.css'

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem('user');
    return t ? JSON.parse(t) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const handleLogin = (tokenValue, userData) => {
    setToken(tokenValue);
    setUser(userData || null);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 p-4 text-white shadow-lg flex items-center justify-between">
        <h1 className="text-xl font-bold">Sistema de Stock - Bebidas</h1>
        {token ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">{user?.name || user?.email || 'Usuario'}</span>
            <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded">Cerrar sesión</button>
          </div>
        ) : null}
      </nav>

      <main>
        {!token ? <Login onLogin={handleLogin} /> : <InventoryPage token={token} />}
      </main>
    </div>
  )
}

export default App
