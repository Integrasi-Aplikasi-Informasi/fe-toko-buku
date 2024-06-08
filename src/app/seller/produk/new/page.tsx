import MaxWidthWrapper from "@/components/Seller/MaxWidthWrapper";
import SellerNavbar from "@/components/Seller/SellerNavbar";

const NewProductPage = () => {
    return (
        <div>
            <SellerNavbar />
            <MaxWidthWrapper>
                <h1 className="my-16">Tambahkan Produk Baru</h1>
            </MaxWidthWrapper>
        </div>
    )
}

export default NewProductPage;