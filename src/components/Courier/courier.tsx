"use client";
import styles from "./courier.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Courier {
  courier_id: number;
  courier_name: string;
  phone_number: string;
  vehicle_type: string;
  license_plate: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

const CourierComponent: React.FC = () => {
  const [courierData, setCourierData] = useState<Courier[]>([]);

  useEffect(() => {
    // Fetch courier data from the table
    // Replace 'fetchDataFromTable' with your actual API call or data retrieval logic
    const fetchDataFromTable = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + "/user_courier.json"
        );
        const data = await response.json();
        const couriers: Courier[] = Object.keys(data).map((key) => data[key]);
        setCourierData(couriers);
      } catch (error) {
        console.error("Error fetching courier data:", error);
      }
    };

    fetchDataFromTable();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Daftar Kurir</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Phone</th>
            <th>Vehicle Type</th>
            <th>Licende Plate</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {courierData.map((courier) => (
            <tr key={courier.courier_id}>
              <td className={styles.name}>{courier.courier_name}</td>
              <td>{courier.phone_number}</td>
              <td>{courier.vehicle_type}</td>
              <td>{courier.license_plate}</td>
              <td>
                <span
                  className={`${styles.status} ${styles.active} ${styles.inactive}`}
                >
                  {courier.status}
                </span>
              </td>
              <td>{courier.created_at}</td>
              <td>{courier.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourierComponent;
