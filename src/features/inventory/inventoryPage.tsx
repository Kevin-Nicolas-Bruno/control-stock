import React from 'react';
import ProductCard from './components/ProductCard';
import { MOCK_INVENTORY } from './services/mockData';

const InventoryPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Inventario de Bebidas</h2>
      
      {/* Grilla de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_INVENTORY.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;