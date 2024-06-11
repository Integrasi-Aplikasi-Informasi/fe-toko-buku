'use client';

import React, { useEffect, useState } from 'react';
import { ref, get, onValue } from 'firebase/database';
import { database } from '../../../../../firebaseConfig'; // Adjust the path if necessary
import { Order } from './types'; // Adjust the path if necessary

export default function OrderSummary() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = ref(database, 'user_buyer/0N1J5R8L4K2X9D7a6V3H0qLpN/orders/0');
        onValue(orderRef, (orderSnapshot) => {
            setOrder(orderSnapshot.val());
        })
        // const orderSnapshot = await get(orderRef);
        // if (orderSnapshot.exists()) {
          
        // } else {
        //   console.log('Order not found.');
        // }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, []);

  const handleCopyReceipt = () => {
    if (order) {
      const receipt = `
        ID Pemesanan: ${order.orderId}
        ID Pembayaran: ${order.itemId}
        ID Item: ${order.itemId}
        ID Penjual: ${order.sellerId}
        Username: ${order.username}
        Jumlah Barang: ${order.amount}
        Status Pembayaran: ${order.status}
        Alamat Shipping: ${order.shipping_address}
        Tanggal: ${new Date(order.timestamp).toLocaleDateString()}
        Harga: ${order.cost}
      `;
      navigator.clipboard.writeText(receipt)
        .then(() => alert('Resi berhasil disalin!'));
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-700 p-4 rounded-lg shadow-md">
        <header className="bg-blue-600 text-white p-4 rounded-t-lg">
          <h1 className="text-2xl font-bold mb-2">Order Summary</h1>
        </header>
        <main className="bg-gray-700 p-4 rounded-b-lg">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-white">ID Pemesanan:</p>
              <p className="text-lg text-white">{order.orderId}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-white">ID Pembayaran:</p>
              <p className="text-lg text-white">{order.itemId}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-white">ID Item:</p>
              <p className="text-lg text-white">{order.itemId}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-white">ID Penjual:</p>
              <p className="text-lg text-white">{order.sellerId}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-white">Username:</p>
              <p className="text-lg text-white">{order.username}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-white">Jumlah Barang:</p>
              <p className="text-lg text-white">{order.amount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-white">Status Pembayaran:</p>
              <p className="text-lg text-white">{order.status}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-white">Alamat Shipping:</p>
              <p className="text-lg text-white">{order.shipping_address}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-white">Tanggal:</p>
              <p className="text-lg text-white">{new Date(order.timestamp).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-white">Harga:</p>
              <p className="text-lg text-white">{order.cost}</p>
            </div>
            <button
              onClick={handleCopyReceipt}
              className="bg-blue-600 text-white p-2 rounded-md w-full md:w-auto font-bold hover:bg-blue-700 transition-colors duration-300"
            >
              Salin Resi
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
