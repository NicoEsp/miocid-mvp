'use client'

import { useState } from 'react'
import { BookOpen, Store, Building2 } from 'lucide-react'

// Datos simulados
const mockUserData = {
  name: "María García",
  points: 750,
  tier: "Plata",
  nextTier: "Oro",
  pointsToNextTier: 250,
  booksBought: 15,
}

const mockLibraryData = {
  name: "Librería El Ateneo",
  totalUsers: 1500,
  totalSales: 5000,
  topSellingBooks: [
    { title: "Cien años de soledad", sales: 150 },
    { title: "El Aleph", sales: 120 },
    { title: "Rayuela", sales: 100 },
  ]
}

const mockEditorialData = {
  name: "Editorial Sudamericana",
  totalSales: 10000,
  nextBook: "El túnel del tiempo"
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('customer')

  return (
    <div className="container mx-auto p-4">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab('customer')}
          className={`flex items-center px-4 py-2 ${
            activeTab === 'customer' ? 'border-b-2 border-blue-500' : ''
          }`}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Cliente
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`flex items-center px-4 py-2 ${
            activeTab === 'library' ? 'border-b-2 border-blue-500' : ''
          }`}
        >
          <Store className="w-4 h-4 mr-2" />
          Librería
        </button>
        <button
          onClick={() => setActiveTab('editorial')}
          className={`flex items-center px-4 py-2 ${
            activeTab === 'editorial' ? 'border-b-2 border-blue-500' : ''
          }`}
        >
          <Building2 className="w-4 h-4 mr-2" />
          Editorial
        </button>
      </div>

      {/* Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activeTab === 'customer' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">Bienvenida, {mockUserData.name}</h2>
              <p className="text-gray-600">Nivel {mockUserData.tier}</p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${(mockUserData.points / (mockUserData.points + mockUserData.pointsToNextTier)) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {mockUserData.pointsToNextTier} puntos para {mockUserData.nextTier}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">Libros Comprados</h2>
              <p className="text-4xl font-bold">{mockUserData.booksBought}</p>
              <p className="text-gray-600 mt-2">¡Sigue leyendo!</p>
            </div>
          </>
        )}

        {activeTab === 'library' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">{mockLibraryData.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Total Usuarios</p>
                  <p className="text-2xl font-bold">{mockLibraryData.totalUsers}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Ventas Totales</p>
                  <p className="text-2xl font-bold">{mockLibraryData.totalSales}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">Libros Más Vendidos</h2>
              <ul className="space-y-2">
                {mockLibraryData.topSellingBooks.map((book, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{book.title}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {book.sales} vendidos
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === 'editorial' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">{mockEditorialData.name}</h2>
              <p className="text-sm font-medium">Ventas Totales</p>
              <p className="text-2xl font-bold">{mockEditorialData.totalSales}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">Próximo Lanzamiento</h2>
              <p className="text-lg font-semibold mb-4">{mockEditorialData.nextBook}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Iniciar Campaña
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}