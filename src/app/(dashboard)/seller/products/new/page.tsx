"use client"
import SellerNavbar from "@/components/Seller/SellerNavbar";
import { FormEvent, useState } from "react";
import { database } from "/firebaseConfig"
import {ref, set} from "firebase/database"
import { useRouter } from "next/router";
import { useSeller } from "@/context/SellerContext";

const NewProductPage = () => {
    const {sellerId} = useSeller();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!image) return;

        setUploading(true);

        try {
            // Dapatkan parameter otentikasi dari server
            const authResponse = await fetch('/api/imagekit');
            const authParams = await authResponse.json();
      
            // Unggah gambar ke ImageKit
            const formData = new FormData();
            formData.append('file', image);
            formData.append('fileName', image.name);
            formData.append('publicKey', process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY);
            
            formData.append('signature', authParams.signature);
            formData.append('expire', authParams.expire);
            formData.append('token', authParams.token);
      
            const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
              method: 'POST',
              body: formData,
            });
      
            const uploadData = await uploadResponse.json();
            const imageUrl = uploadData.url;
      
            // Simpan data produk ke Firebase
            const newProductRef = ref(database, `user_seller/${sellerId}/products`).push();
            await set(newProductRef, {
              title,
              author,
              description,
              stock,
              price,
              imageUrl,
            });
      
            setUploading(false);
            router.push('/seller/products'); // Redirect ke halaman produk setelah berhasil menambahkan produk baru
          } catch (error) {
            console.error("Error uploading image or saving product:", error);
            setUploading(false);
          }
    };

    return (
        <>
        <SellerNavbar />

        <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-lg">
                <h1 className="font-bold text-center text-2xl mb-5">Tambah Produk Baru</h1>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <form onSubmit={handleSubmit} className="px-5 py-7">
                        <div className="mb-5">
                        <label htmlFor="title" className="font-semibold text-sm text-gray-600 block">Judul</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                        />
                        </div>
                        <div className="mb-5">
                        <label htmlFor="author" className="font-semibold text-sm text-gray-600 block">Pengarang</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                        />
                        </div>

                        <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Deskripsi</label>
                        <textarea
                            id="description"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={10}
                            required
                        />
                        </div>

                        <div className="mb-5">
                        <label htmlFor="stock" className="font-semibold text-sm text-gray-600 block">Stok</label>
                        <input
                            type="number"
                            id="stock"
                            value={stock}
                            // onChange={(e) => setStock(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                        />
                        </div>
                        <div className="mb-5">
                        <label htmlFor="price" className="font-semibold text-sm text-gray-600 block">Harga</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            // onChange={(e) => setPrice(e.target.value)}
                            className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                        />
                        </div>
                        <div className="mb-5">
                        <label htmlFor="image" className="font-semibold text-sm text-gray-600 block">Gambar</label>
                        <input
                            type="file"
                            id="image"
                            // onChange={handleImageChange}
                            className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                        />
                        </div>
                        <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                        <span className="inline-block mr-2">Tambah Produk</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default NewProductPage;