import React from 'react';

interface LibraryData {
  books: {
    id: string;
    title: string;
    author: string;
  }[];
}

const LibraryDashboard: React.FC<{ data: LibraryData }> = ({ data }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Bienvenidos a LibroAmigo, tu Amigo para comprar Libros</h2>
      <p className="text-lg mb-2">Cantidad de libros comprados: {data.books.length}</p>
      <ul className="list-disc pl-5">
        {data.books.map((book) => (
          <li key={book.id} className="mb-2">
            <span className="font-semibold">{book.title}</span> - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryDashboard;
