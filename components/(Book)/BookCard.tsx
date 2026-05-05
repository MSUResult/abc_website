'use client';

import Image from 'next/image';

interface Book {
  title: string;
  subject: string;
  class: string;
  image: string;
}

export default function BookCard({ book }: { book: Book }) {
  const handleBuyNow = () => {
    const phoneNumber = "919897511632";
    const message = `Hello! I would like to buy the ${book.title} for ${book.subject} (${book.class}).`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border border-gray-100 flex flex-col">
      <div className="relative  aspect-video w-full bg-gray-200">
        {/* Replace with your actual image path */}
        <img 
          src={book.image} 
          alt={book.subject} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow text-center">
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
          {book.subject}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{book.title}</p>
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mx-auto mb-6">
          {book.class}
        </span>
        
        <button
          onClick={handleBuyNow}
          className="mt-auto w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span>Buy on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}