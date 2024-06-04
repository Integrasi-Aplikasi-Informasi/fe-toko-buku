import React from "react";
import Image from "next/image";
import CourierComponent from "@/components/Courier/courier";

const CourierPage: React.FC = () => {
  return (
    <main className="flex justify-center min-w-screen min-h-screen items-center">
      <CourierComponent />
    </main>
  );
};

export default CourierPage;
