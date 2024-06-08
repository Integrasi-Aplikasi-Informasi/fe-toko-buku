import MaxWidthWrapper from "@/components/Seller/MaxWidthWrapper";
import SellerNavbar from "@/components/Seller/SellerNavbar";
import SellerProductDashboard from "@/components/Seller/SellerProductDashboard";

export default function ProductsDashboardPage() {
    return (
        <>
            <SellerNavbar />
            <MaxWidthWrapper>
                <main className="min-w-full min-h-screen flex items-center place-content-center ">
                    <SellerProductDashboard />
                </main>
            </MaxWidthWrapper>
        </>
      
    );
  }