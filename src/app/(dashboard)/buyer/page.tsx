"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { database } from "/firebaseConfig";
import { ref, onValue } from "firebase/database";

export default function DashboardBuyer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchBooksFromFirebase = async () => {
      try {
        const userSellersRef = ref(database, "user_seller");
        const allProducts = [];

        onValue(userSellersRef, (snapshot) => {
          snapshot.forEach((userSellerSnapshot) => {
            const productsRef = ref(database, `user_seller/${userSellerSnapshot.key}/products`);

            onValue(productsRef, (productsSnapshot) => {
              productsSnapshot.forEach((productSnapshot) => {
                const product = productSnapshot.val();
                allProducts.push({
                  id: product.product_id,
                  title: product.title,
                  author: product.author,
                });
              });
            });
          });
          setBooksData(allProducts);
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchBooksFromFirebase();
  }, []);

  const filteredBooks = booksData.filter((book) => {
    const title = book.title ? book.title.toLowerCase() : "";
    const author = book.author ? book.author.toLowerCase() : "";
    return title.includes(searchQuery.toLowerCase()) || author.includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    setDropdownVisible(searchQuery.length > 0 && filteredBooks.length > 0);
  }, [searchQuery, filteredBooks]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBookSelect = (bookTitle) => {
    setSearchQuery(bookTitle);
    setDropdownVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6 relative">
        <h1 className="text-3xl font-bold mb-2">TETI Book store</h1>
        <div className="relative">
          <input type="text" placeholder="Search books..." className="w-full p-2 rounded-lg text-black" value={searchQuery} onChange={handleInputChange} />
          {dropdownVisible && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg z-10">
              {filteredBooks.map((book) => (
                <li key={book.id} className="p-2 hover:bg-blue-100 cursor-pointer text-black" onClick={() => handleBookSelect(book.title)}>
                  <Link href={`/beliBuku?bookId=${book.id}`}>
                    <strong>{book.title}</strong> - <span>{book.author}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
      <main className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Purchased Books</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <li key={book.id} className="bg-white shadow-md rounded-lg p-4">
              <Link href={`/beliBuku?bookId=${book.id}`}>
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
              </Link>
            </li>
          ))}
          {filteredBooks.length === 0 && <p className="text-gray-500 col-span-full">No books found.</p>}
        </ul>
      </main>
    </div>
  );
}
