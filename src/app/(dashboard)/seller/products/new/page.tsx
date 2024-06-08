"use client"

import MaxWidthWrapper from "@/components/Seller/MaxWidthWrapper";
import SellerNavbar from "@/components/Seller/SellerNavbar";
import { FormEvent, useState } from "react";

const NewProductPage = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState<File | null>(null);;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Logika untuk mengirim data ke server atau database
        console.log({
        title,
        author,
        description,
        stock,
        price,
        image,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // const file = e.target.files[0];
            // const reader = new FileReader();
    
            // reader.onload = (event: ProgressEvent<FileReader>) => {
            //     const result = (event.target as FileReader).result;
            //     if (typeof result === 'string') {
            //         setImage(result as SetStateAction<string | null>);
            //     }
            // };
    
            // reader.readAsDataURL(file);
            setImage
        }
    };


    return (
        <>
        <SellerNavbar />

        {/* <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-5xl">
                <h1 className="font-bold text-center text-2xl mb-5">Tambah Produk Baru</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 flex">
                    <div className="px-5 py-7 w-1/2">
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
                        onChange={(e) => setStock(e.target.value)}
                        className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="price" className="font-semibold text-sm text-gray-600 block">Harga</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                    />
                </div>

                        <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                            <span className="inline-block mr-2">Tambah Produk</span>
                        </button>
                    </div>
                    <div className="w-1/2 flex justify-center items-center">
                        <label htmlFor="image" className="cursor-pointer">
                            <div className="border rounded-lg w-64 h-96 bg-gray-200 flex justify-center items-center">
                                {image ? <img src={image} alt="Product" className="h-full w-full object-cover" /> : "Upload gambar"}
                            </div>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                </form>
            </div>
        </div> */}


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