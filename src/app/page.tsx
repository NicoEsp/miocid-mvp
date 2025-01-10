import LibraryDashboard from '@/components/LibraryDashboard';

// Mock data
const mockLibraryData = {
  name: "Librería El Ateneo",
  totalUsers: 1500,
  totalSales: 5000,
  topSellingBooks: [
    { title: "Cien años de soledad", sales: 150 },
    { title: "El Aleph", sales: 120 },
    { title: "Rayuela", sales: 100 },
  ],
  currentStock: 3000,
  parkedBooks: 500,
  soldThisMonth: 350,
  incomingStock: 200
}

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <LibraryDashboard data={{...mockLibraryData, books: []}} />
    </div>
  )
}