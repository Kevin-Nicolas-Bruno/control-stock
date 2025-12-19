import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { MOCK_INVENTORY } from './services/mockData'; // fallback
import { getProductos } from './services/apiBebidas';

interface InventoryPageProps {
  token?: string | null;
}

const InventoryPage = ({ token }: InventoryPageProps) => {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    getProductos(token || undefined)
      .then(data => { if (mounted && data) setProductos(data); })
      .catch(err => { if (mounted) setError(err.message || 'Error cargando productos'); })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, [token]);

  const itemsToShow = productos && productos.length ? productos : MOCK_INVENTORY;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Inventario de Bebidas</h2>

      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {itemsToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryPage;