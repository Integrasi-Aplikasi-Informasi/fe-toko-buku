        // try {
        //     // Dapatkan parameter otentikasi dari server
        //     const authResponse = await fetch('/api/imagekit');
        //     const authParams = await authResponse.json();
      
        //     // Unggah gambar ke ImageKit
        //     const formData = new FormData();
        //     formData.append('file', image);
        //     formData.append('fileName', image.name);
        //     formData.append('publicKey', process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY);
            
        //     formData.append('signature', authParams.signature);
        //     formData.append('expire', authParams.expire);
        //     formData.append('token', authParams.token);
      
        //     const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        //       method: 'POST',
        //       body: formData,
        //     });
      
        //     const uploadData = await uploadResponse.json();
        //     const imageUrl = uploadData.url;
      
        //     // Simpan data produk ke Firebase
        //     const newProductRef = ref(database, `user_seller/${sellerId}/products`).push();
        //     await set(newProductRef, {
        //       title,
        //       author,
        //       description,
        //       stock,
        //       price,
        //       imageUrl,
        //     });
      
        //     setUploading(false);
        //     router.push('/seller/products'); // Redirect ke halaman produk setelah berhasil menambahkan produk baru
        //   } catch (error) {
        //     console.error("Error uploading image or saving product:", error);
        //     setUploading(false);
        //   }

// // app/(dashboard)/seller/products/practice/page.tsx

// import React from 'react';
// import ImageKit from 'imagekitio-react'


// // Inisialisasi ImageKit
// const imageKit = new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
// });

// // Komponen FileUpload
// const FileUpload = () => {

//   // Fungsi untuk menangani unggahan file
//   const handleCreateListing = async (formData) => {
//     'use server';
    
//     const image = formData.get('image');

//     // Mengecek jika gambar tidak ada
//     if (!image) {
//       throw new Error('No image file selected');
//     }

//     const arrayBuffer = await image.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const response = await imageKit.upload({
//       file: buffer,
//       fileName: image.name,
//     });

//     console.log(response); // Kamu bisa melakukan sesuatu dengan respons ini
//   };

//   return (
//     <form action={handleCreateListing}>
//       <input name="image" type="file" accept="image/*" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// // Komponen utama halaman
// const PracticePage = () => {
//   return (
//     <div>
//       <h1>Upload Gambar ke ImageKit</h1>
//       <FileUpload />
//     </div>
//   );
// };

// export default PracticePage;
