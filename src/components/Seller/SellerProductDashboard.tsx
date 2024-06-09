"use client"

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product";

// const dummyProducts: Product[] = [
//   {
//       id: 1,
//       image: 'https://via.placeholder.com/150',
//       title: 'Cara Melakukan Integrasi Aplikasi dan Informasi',
//       author: 'Khalid Rizki Ananta',
//       stock: 10,
//       price: 50000,
//   },
//   {
//       id: 2,
//       image: 'https://via.placeholder.com/150',
//       title: 'Produk 2',
//       author: 'Pengarang 2',
//       stock: 5,
//       price: 75000,
//   },
//   {
//       id: 3,
//       image: 'https://via.placeholder.com/150',
//       title: 'Produk 3',
//       author: 'Pengarang 3',
//       stock: 20,
//       price: 100000,
//   },
// ];
interface SellerProductDashboardProps {
    products: Product[];
}

const SellerProductDashboard : React.FC<SellerProductDashboardProps> = ({ products })=> {

    const handleEdit = (id: number) => {
    // TODO: Edit produk
        console.log(`Edit produk dengan ID: ${id}`);
    };

    const handleDelete = (id: number) => {
    // TODO: Hapus produk
        console.log(`Hapus produk dengan ID: ${id}`);
    };

    return (
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]">Gambar</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">Judul</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[23%]">Pengarang</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[7%]">Stok</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[17%]">Harga</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[13%]">Aksi</th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                      <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                              <img src={product.imgUrl} alt={product.title} className="w-16 h-16 object-cover" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{product.author}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                //   onClick={() => handleEdit(product.id)}
                                  className="mr-2 px-4 py-2 bg-[#35CE8D] text-white rounded-lg hover:bg-[#2eae76]"
                              >
                                  Edit
                              </button>
                              <button
                                //   onClick={() => handleDelete(product.id)}
                                  className="px-4 py-2 bg-[#F08CAE] text-white rounded-lg hover:bg-[#d77997]"
                              >
                                  Hapus
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    )
}

export default SellerProductDashboard;