import InventoryPage from './features/inventory/inventoryPage';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 p-4 text-white shadow-lg">
        <h1 className="text-xl font-bold">Sistema de Stock - Bebidas</h1>
      </nav>

      <main>
        {/* Aquí llamamos a la página de tu feature */}
        <InventoryPage />
      </main>
    </div>
  )
}

export default App
