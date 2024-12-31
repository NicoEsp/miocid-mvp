"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Store, Calendar, Info, TrendingUp, Users, BookOpen, Package } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Acá definiste los tipos de data
interface LibraryData {
  name: string
  totalUsers: number
  totalSales: number
  topSellingBooks: Array<{ title: string; sales: number }>
  currentStock: number
  parkedBooks: number
  soldThisMonth: number
  incomingStock: number
}

interface Bundle {
  type: string
  discount: number
  books: Array<{ title: string; author: string }>
}

interface Event {
  name: string
  type: string
  date: string
  price: string
  capacity: string
  description: string
}

// Mock data
const mockLibraryData: LibraryData = {
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

function LibraryDashboard({ data }: {data: LibraryData}) {
  const [bundleType, setBundleType] = useState("")
  const [bundleDiscount, setBundleDiscount] = useState("")
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [isBundleDialogOpen, setIsBundleDialogOpen] = useState(false)
  const [eventName, setEventName] = useState("")
  const [eventType, setEventType] = useState("presencial")
  const [eventDate, setEventDate] = useState("")
  const [eventPrice, setEventPrice] = useState("")
  const [eventCapacity, setEventCapacity] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [bundleBooks, setBundleBooks] = useState<Array<{title: string, author: string}>>([])
  const [newBookTitle, setNewBookTitle] = useState("")
  const [newBookAuthor, setNewBookAuthor] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    setIsFormValid(!!bundleType && !!bundleDiscount && parseFloat(bundleDiscount) >= 5 && parseFloat(bundleDiscount) <= 20)
  }, [bundleType, bundleDiscount])

  const handleCreateEvent = () => {
    const newEvent: Event = { name: eventName, type: eventType, date: eventDate, price: eventPrice, capacity: eventCapacity, description: eventDescription }
    setEvents([...events, newEvent])
    setIsEventDialogOpen(false)
    // Reseteo de campos
    setEventName("")
    setEventType("presencial")
    setEventDate("")
    setEventPrice("")
    setEventCapacity("")
    setEventDescription("")
  }

  const handleCreateBundle = () => {
    if (bundleType && bundleDiscount && bundleBooks.length >= 2) {
      const newBundle: Bundle = { type: bundleType, discount: parseFloat(bundleDiscount), books: bundleBooks }
      setBundles([...bundles, newBundle])
      setIsBundleDialogOpen(false)
      setBundleBooks([])
      setBundleType("")
      setBundleDiscount("")
    }
  }

  const handleAddBook = () => {
    if (newBookTitle && newBookAuthor) {
      if (bundleBooks.length < 10) {
        setBundleBooks([...bundleBooks, { title: newBookTitle, author: newBookAuthor }])
        setNewBookTitle("")
        setNewBookAuthor("")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Te damos la bienvenida a LibroAmigo!</h1>
        <p className="text-xl text-muted-foreground">Tu amigo para vender más libros</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuarios</CardTitle>
              <Users className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalUsers}</div>
              <p className="text-xs text-blue-200">+20% desde el último mes</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${data.totalSales}</div>
              <p className="text-xs text-green-200">+15% desde el último mes</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Actual</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.currentStock}</div>
              <p className="text-xs text-purple-200">+{data.incomingStock} libros en camino</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Libros Más Vendidos</CardTitle>
              <CardDescription>Top 3 libros del mes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {data.topSellingBooks.map((book, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-2xl font-bold mr-4">{index + 1}</span>
                    <div className="flex-grow">
                      <div className="font-medium">{book.title}</div>
                      <div className="text-sm text-muted-foreground">{book.sales} vendidos</div>
                    </div>
                    <Badge variant="secondary">{book.sales} vendidos</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Estado del Inventario</CardTitle>
              <CardDescription>Resumen rápido</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Stock Actual:</span>
                  <span className="font-bold">{data.currentStock}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Libros Reservados:</span>
                  <span className="font-bold">{data.parkedBooks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Vendidos Este Mes:</span>
                  <span className="font-bold">{data.soldThisMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Stock Entrante:</span>
                  <span className="font-bold text-green-600">+{data.incomingStock}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crear Paquete</CardTitle>
                <CardDescription>Crea un paquete de libros con descuento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bundle-type">Tipo de Paquete</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Elegi el tipo de Paquete que más le interese a tus clientes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select value={bundleType} onValueChange={setBundleType}>
                      <SelectTrigger id="bundle-type">
                        <SelectValue placeholder="Selecciona el tipo de paquete" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mixed">Mixto</SelectItem>
                        <SelectItem value="topic">Temático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bundle-discount">Descuento (%)</Label>
                    <Input
                      id="bundle-discount"
                      type="number"
                      placeholder="Entre 5 y 20"
                      value={bundleDiscount}
                      onChange={(e) => {
                        const value = parseInt(e.target.value)
                        if (value >= 5 && value <= 20) {
                          setBundleDiscount(e.target.value)
                        }
                      }}
                      min="5"
                      max="20"
                    />
                  </div>
                  <Button className="w-full" onClick={() => setIsBundleDialogOpen(true)} disabled={!isFormValid}>
                    <Package className="mr-2 h-4 w-4" />
                    Crear Paquete
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Paquetes Creados</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descuento</TableHead>
                      <TableHead>Libros</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bundles.map((bundle, index) => (
                      <TableRow key={index}>
                        <TableCell>{bundle.type}</TableCell>
                        <TableCell>{bundle.discount}%</TableCell>
                        <TableCell>
                          {bundle.books.slice(0, 3).map((book, i) => (
                            <div key={i}>{book.title}</div>
                          ))}
                          {bundle.books.length > 3 && (
                            <Button variant="link" onClick={() => alert(bundle.books.map(b => `${b.title} - ${b.author}`).join('\n'))}>
                              Ver más...
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Eventos</CardTitle>
                <CardDescription>Crea y gestiona eventos para tu librería</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Crear Nuevo Evento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Crear Nuevo Evento</DialogTitle>
                      <DialogDescription>
                        Completa los detalles para crear un nuevo evento en tu librería.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-name" className="text-right">
                          Nombre
                        </Label>
                        <Input
                          id="event-name"
                          value={eventName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-type" className="text-right">
                          Tipo
                        </Label>
                        <Select value={eventType} onValueChange={setEventType}>
                          <SelectTrigger id="event-type" className="col-span-3">
                            <SelectValue placeholder="Selecciona el tipo de evento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="presencial">Presencial</SelectItem>
                            <SelectItem value="virtual">Virtual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-date" className="text-right">
                          Fecha
                        </Label>
                        <Input
                          id="event-date"
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-price" className="text-right">
                          Precio
                        </Label>
                        <Input
                          id="event-price"
                          type="number"
                          value={eventPrice}
                          onChange={(e) => setEventPrice(e.target.value)}
                          className="col-span-3"
                          placeholder="Dejar en blanco si es gratis"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-capacity" className="text-right">
                          Cupo
                        </Label>
                        <Input
                          id="event-capacity"
                          type="number"
                          value={eventCapacity}
                          onChange={(e) => setEventCapacity(e.target.value)}
                          className="col-span-3"
                          placeholder="Dejar en blanco si no hay límite"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-description" className="text-right">
                          Descripción
                        </Label>
                        <Textarea
                          id="event-description"
                          value={eventDescription}
                          onChange={(e) => setEventDescription(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateEvent}>Crear Evento</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Eventos Creados</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Cupo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event, index) => (
                      <TableRow key={index}>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{event.type}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.price ? `$${event.price}` : 'Gratis'}</TableCell>
                        <TableCell>{event.capacity || 'Sin límite'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Dialog open={isBundleDialogOpen} onOpenChange={setIsBundleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Libros al Paquete</DialogTitle>
            <DialogDescription>
              Agrega al menos 2 libros a tu paquete (máximo 10).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="book-title" className="text-right">
                Título
              </Label>
              <Input
                id="book-title"
                value={newBookTitle}
                onChange={(e) => setNewBookTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="book-author" className="text-right">
                Autor
              </Label>
              <Input
                id="book-author"
                value={newBookAuthor}
                onChange={(e) => setNewBookAuthor(e.target.value)}
                className="col-span-3"
              />
            </div>
            <Button onClick={handleAddBook} disabled={bundleBooks.length >= 10}>Agregar Libro</Button>
            {bundleBooks.length >= 6 && (
              <p className="text-sm text-muted-foreground">
                Contactate con amigo@libroamigo.com para incrementar el tamaño de los paquetes
              </p>
            )}
            <div className="max-h-[200px] overflow-y-auto">
              {bundleBooks.map((book, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span>{book.title} - {book.author}</span>
                  <Button variant="destructive" size="sm" onClick={() => setBundleBooks(bundleBooks.filter((_, i) => i !== index))}>
                    Eliminar
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateBundle} disabled={bundleBooks.length < 2}>Crear Paquete</Button>
          </DialogFooter>
          {bundleBooks.length < 2 && (
            <p className="text-sm text-red-500 mt-2">
              Se requieren al menos 2 libros para crear un paquete.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <LibraryDashboard data={mockLibraryData} />
    </div>
  )
}