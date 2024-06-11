"use client"
import { get, onValue, ref, child } from "firebase/database";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useBuyer } from "@/context/BuyerContext";
import { Product } from "@/types/product";
import { database } from "../../../../../firebaseConfig";
import SellerOrderDashboard from "@/components/Seller/orders/SellerOrderDashboard";
import { Order } from "@/types/orders";
import BuyerOrderDashboard from "@/components/Buyer/BuyerOrderDashboard";

export default function ProductsDashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const {buyerId} = useBuyer();

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (buyerId) {
            const fetchOrdersData = async () => {
                const ordersData = await getOrdersByBuyerId(buyerId);
                setOrders(ordersData);
            };
            fetchOrdersData();
        }
    }, [buyerId]); // Add any dependencies here if needed

    const getOrdersByBuyerId = async (buyerId: string) => {
        const buyerRef = ref(database, `user_buyer/${buyerId}`);
    
        try {
            const snapshot = await get(child(buyerRef, 'orders'));
            if (snapshot.exists()) {
                const ordersData = snapshot.val();
                const orders: Order[] = [];
    
                Object.keys(ordersData).forEach(key => {
                    const order = ordersData[key];
                    orders.push({
                        orderId: order.order_id,
                        itemId: order.itemId,
                        sellerId: order.seller_id,
                        buyerId: buyerId,
                        username: '', // Jika username tidak ada di data, bisa diisi dengan string kosong atau ambil dari data lain
                        amount: order.amount,
                        status: order.status,
                        shipping_address: '', // Ambil shipping_address dari lokasi lain jika perlu
                        timestamp: order.timestamp,
                        cost: order.totalCost
                    });
                });
    
                return orders;
            } else {
                console.log("No orders found");
                return [];
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            return [];
        }
    }

    const router = useRouter();

    const handleCreateNew = () => {
        router.push('/seller/products/new');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-10">
            <BuyerOrderDashboard orders={orders} />
        </div>
    );
}
