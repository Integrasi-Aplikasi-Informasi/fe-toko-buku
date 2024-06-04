"use client";

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
    <div>
      <h1>Courier Detail</h1>
      {/* Render the courier data */}
      {courierData.map((courier) => (
        <div key={courier.courier_id}>
          <h2>{courier.courier_name}</h2>
          <p>Phone Number: {courier.phone_number}</p>
          <p>Vehicle Type: {courier.vehicle_type}</p>
          <p>License Plate: {courier.license_plate}</p>
          <p>Status: {courier.status}</p>
          <p>Created At: {courier.created_at}</p>
          <p>Updated At: {courier.updated_at}</p>
        </div>
      ))}
    </div>
  );
};

export default CourierComponent;
