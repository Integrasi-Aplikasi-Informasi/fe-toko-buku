"use client"

import { useEffect, useState } from "react";
import { formatPrice, formatTimestamp } from "@/lib/utils";
import { database } from '../../../firebaseConfig'
import { useSeller } from "@/context/SellerContext";
import { get, onValue, ref, remove, update } from "firebase/database";
import { Order } from "@/types/orders";

interface SellerOrderDashboardProps {
    orders: Order[];
}

const BuyerOrderDashboard : React.FC<SellerOrderDashboardProps> = ({ orders })=> {
    const { sellerId } = useSeller();

    const ProductTitleCell = ({itemId}) => {
        const [productTitle, setProductTitle] = useState('');
    
        useEffect(() => {
            const getProductTitle = async () => {
                if (sellerId && itemId) {
                    const title = await fetchProductTitle(sellerId, itemId);
                    setProductTitle(title || 'Unknown Product');
                }
            };
    
            getProductTitle();
        }, [sellerId, itemId]);
    
        return (
            <td className="px-6 py-4 whitespace-nowrap">
                {productTitle}
            </td>
        );
    };

    const fetchProductTitle = async (sellerId: string | null, productKey: string): Promise<string | null> => {
        try {
            // Reference to the user_seller node
            const userSellerRef = ref(database, 'user_seller');
            const userSellerSnapshot = await get(userSellerRef);
    
            let productTitle: string | null = null;
    
            userSellerSnapshot.forEach((sellerSnapshot) => {
                const sellerData = sellerSnapshot.val();
                if (sellerData && sellerSnapshot.key === sellerId) {
                    const productsRef = ref(database, `user_seller/${sellerId}/products/${productKey}`);
                    get(productsRef).then((productSnapshot) => {
                        if (productSnapshot.exists()) {
                            productTitle = productSnapshot.val().title;
                        }
                    });
                    // Exit the loop early once we find the matching seller
                    return true;
                }
            });

            console.log("Found product" + productTitle)
    
            return productTitle;
        } catch (error) {
            console.error("Error fetching product title:", error);
            return null;
        }
    };
    
   

    return (
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]">Tanggal Pesanan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">Penjual</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[14%]">Nama Buku</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[7%]">Jumlah</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[17%]">Harga</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">Status</th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((orders) => (
                      <tr key={orders.orderId}>
                          <td className="px-6 py-4 whitespace-nowrap">{formatTimestamp(orders.timestamp)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{orders.sellerId}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{orders.itemId}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{orders.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{formatPrice(orders.cost)}</td>
                          <td className="px-6 py-4 whitespace-nowrap"></td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    )
}

export default BuyerOrderDashboard;