import React from 'react';
import { Edit3, Plus, Minus, AlertTriangle } from 'lucide-react'; // Instala lucide-react para iconos
import { Product } from '../Interfaces/Icategories';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, image, stock, minStock, category } = product;
  
  // Lógica para saber si el stock es bajo
  const isLowStock = stock <= minStock;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Imagen del Producto */}
      <div className="relative h-40 bg-gray-100">
        <img 
          src={image || 'https://via.placeholder.com/150?text=Bebida'} 
          alt={name}
          className="w-full h-full object-contain p-4"
        />
        {isLowStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full animate-pulse">
            <AlertTriangle size={20} />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
          {category}
        </span>
        <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>
        
        <div className="flex items-center mt-2">
          <span className={`text-2xl font-bold ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
            {stock}
          </span>
          <span className="ml-2 text-gray-500 text-sm italic">unidades</span>
        </div>

        <div className="h-5 mt-1"> 
          {isLowStock ? (
            <p className="text-red-500 text-xs font-medium italic">¡Reponer pronto!</p>
          ) : null}
        </div>

        {/* Acciones */}
        <div className="mt-4 flex items-center justify-between border-t pt-4 gap-2">
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 transition" title="Editar">
            <Edit3 size={18} />
          </button>
          
          <div className="flex items-center bg-gray-100 rounded-lg">
            <button className="p-2 hover:bg-red-100 text-red-600 transition rounded-l-lg">
              <Minus size={18} />
            </button>
            <span className="px-2 font-bold text-gray-600">Stock</span>
            <button className="p-2 hover:bg-green-100 text-green-600 transition rounded-r-lg">
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
