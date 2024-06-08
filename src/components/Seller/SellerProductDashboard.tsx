"use client"

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";

const SellerProductDashboard = () => {

    const [books, setBooks] = useState([
        {
            _id: 0, 
            pengarang: 'khalid', 
            judul: 'Cara Melakukan Integrasi Aplikasi',
            detail: '...',
            imgUrl: '#',
            harga: 199000,
            stok: '20',
        },
        {
            _id: 1, 
            pengarang: 'rangga', 
            judul: 'Becoming a Mobile Expert 101',
            detail: '...',
            imgUrl: '#',
            harga: 299000,
            stok: '20',
        }
    ])
    return (
    <div className="font-inter">
      <div className="my-8 flex w-full justify-end">
        <a href="/sell/create">
          <p className="w-fit py-1 px-4  bg-[#35CE8D] text-white cursor-pointer rounded-lg hover:bg-green-400 transition duration-150">
            Add
          </p>
        </a>
      </div>
      {/* {ownedBook.length == 0 && (
        <div className="h-44 grid content-center text-blue font-bold text-center">
          Anda belum punya buku untuk dijual
        </div>
      )} */}
      {/* {ownedBook.length > 0 && ( */}
        <table className="table-fixed border-[1px] border-black w-full">
          <thead className="bg-gray-500"> {/*bg-[#35447C]*/ } 
            <tr className="text-white text-left  text-sm font-light">
              <th className="px-2 w-[15%]">Gambar</th>
              <th className="border-x-[1px] px-2 overflow-hidden w-[25%]">
                Judul
              </th>
              <th className="border-x-[1px] px-2 overflow-hidden w-[23%]">
                Pengarang
              </th>
              <th className="w-[7%] px-2 border-x-[1px]">Stok</th>
              <th className="w-[17%] px-2 border-x-[1px]">Harga</th>
              <th className="w-[13%] px-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-cream">
            {books.map((list) => (
              <tr key={list._id}>
                <td className="px-2 h-8">{list.imgUrl}</td>
                <td className="px-2 border-x-[1px] border-black truncate">
                  {list.judul}
                </td>
                <td className="px-2 border-x-[1px] border-black overflow-hidden truncate">
                  {list.pengarang}
                </td>
                <td className="px-2 border-x-[1px] border-black overflow-hidden truncate">
                  {list.stok}
                </td>
                <td className="px-2 border-x-[1px] border-black overflow-hidden truncate">
                  {formatPrice(list.harga)}
                </td>
                <td className="px-2">
                  <div className="grid grid-cols-3 gap-2 text-center text-white text-sm">
                    {/* <a href="/sell/read">
                      <div
                        className="bg-[#0E7278] cursor-pointer rounded-md hover:bg-emerald-500 transition duration-150"
                        onClick={() => chooseBook(list)}
                      >
                        Read
                      </div>
                    </a> */}
                    {/* <a href="/sell/update">
                      <div
                        className="bg-[#E39807] cursor-pointer rounded-md hover:bg-amber-400 transition duration-150"
                        onClick={() => chooseBook(list)}
                      >
                        Edit
                      </div>
                    </a> */}
                    {/* <a href="/sell/delete">
                      <div
                        className="bg-[#E82626] cursor-pointer rounded-md hover:bg-red-400 transition duration-150"
                        onClick={() => chooseBook(list)}
                      >
                        Delete
                      </div>
                    </a> */}
                  </div> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       {/* )} */}
    </div>
    )
}

export default SellerProductDashboard;