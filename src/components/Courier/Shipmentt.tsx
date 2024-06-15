"use client";

import { useEffect, useState } from "react";
import styles from "./courier.module.css";

// Define the structure of the data
interface Order {
  amount: number;
  itemId: string;
  order_id?: string;
  orderId?: string;
  seller_id?: string;
  sellerId?: string;
  status: string;
  timestamp: number;
  totalCost?: number;
  cost?: number;
  buyerId?: string;
  shipping_address?: string;
}

interface UserBuyer {
  email: string;
  orders?: Order[] | { [key: string]: Order };
  shipping_address: string;
  uid: string;
  username: string;
}

interface Courier {
  courier_id: number;
  courier_name: string;
  created_at: string;
  license_plate: string;
  phone_number: string;
  status: string;
  updated_at: string;
  vehicle_type: string;
}

const Shipmentt = () => {
  const [buyers, setBuyers] = useState<{ [key: string]: UserBuyer } | null>(
    null
  );
  const [couriers, setCouriers] = useState<Courier[] | null>(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + "/user_buyer.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setBuyers(result);
      } catch (error) {
        console.error("Error fetching buyer data: ", error);
      }
    };

    const fetchCouriers = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + "/user_courier.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setCouriers(result);
      } catch (error) {
        console.error("Error fetching courier data: ", error);
      }
    };

    fetchBuyers();
    fetchCouriers();
  }, []);

  if (!buyers || !couriers) {
    return <div>Loading...</div>;
  }

  const assignRandomCourier = () => {
    const randomIndex = Math.floor(Math.random() * couriers.length);
    return couriers[randomIndex].courier_id;
  };

  return (
    <div className={styles.track}>
      <h1>Shipment Information</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Buyer ID</th>
            <th>Order ID</th>
            <th>Courier ID</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(buyers).map((buyerId) => {
            const user = buyers[buyerId];
            const ordersArray: Order[] = Array.isArray(user.orders)
              ? user.orders
              : user.orders
              ? Object.values(user.orders)
              : [];

            return ordersArray.map((order, index) => {
              const courierId = assignRandomCourier();
              return (
                <tr key={index}>
                  <td>{user.uid}</td>
                  <td>{order.orderId || order.order_id}</td>
                  <td>{courierId}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Shipmentt;
