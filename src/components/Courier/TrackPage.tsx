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

const TrackPage = () => {
  const [data, setData] = useState<{ [key: string]: UserBuyer } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + "/user_buyer.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Fetched data:", result); // Debugging: log data fetched
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const userBuyers = data;

  return (
    <div className={styles.track}>
      <h1>Tracking Information</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Buyer ID</th>
            <th>Order ID</th>
            <th>Seller ID</th>
            <th>Shipping Address</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(userBuyers).map((buyerId) => {
            const user = userBuyers[buyerId];
            const ordersArray: Order[] = Array.isArray(user.orders)
              ? user.orders
              : user.orders
              ? Object.values(user.orders)
              : [];

            return ordersArray.map((order, index) => (
              <tr key={index}>
                <td>{user.uid}</td>
                <td>{order.orderId || order.order_id}</td>
                <td>{order.sellerId || order.seller_id}</td>
                <td>{order.shipping_address || user.shipping_address}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TrackPage;
