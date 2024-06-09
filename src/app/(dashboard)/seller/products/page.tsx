"use client"
import SellerNavbar from "@/components/Seller/SellerNavbar";
import SellerProductDashboard from "@/components/Seller/SellerProductDashboard";
import { getDatabase, onValue, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSeller } from "@/context/SellerContext";
import { Product } from "@/types/product";

export default function ProductsDashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const {sellerId} = useSeller();
    const db = getDatabase();

    useEffect(() => {
        if (sellerId) {
          const productsRef = ref(db, `/user_seller/${sellerId}/products`);
          onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const productsArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
              }));
              setProducts(productsArray);
              console.log(productsArray)
            }
          });
        }
      }, [sellerId]);

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
                
                <SellerProductDashboard products={products}/>
            </div>
        </>
    );
  }