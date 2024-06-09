"use client"
import SellerNavbar from "@/components/Seller/SellerNavbar";
import SellerProductDashboard from "@/components/Seller/SellerProductDashboard";
import { useRouter } from "next/navigation";

export default function ProductsDashboardPage() {

    const router = useRouter();

    const handleCreateNew = () => {
        router.push('/seller/products/new');
    };

    return (
        <>
            <SellerNavbar />
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-10">
                <div className="flex justify-end">
                <button
                    onClick={handleCreateNew}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
                >
                    Buat Baru
                </button>
                </div>
                
                <SellerProductDashboard />
            </div>
        </>
    );
  }