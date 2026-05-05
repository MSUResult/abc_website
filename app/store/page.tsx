import React from 'react'
import books from '@/data/books.json'
import BookCard from '@/components/(Book)/BookCard';

const page = () => {
return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto text-center mb-16 mt-22">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          ABC E-books
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          The best book modules in Saharanpur
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}

export default page
