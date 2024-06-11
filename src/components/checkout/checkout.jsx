'use client';

import React, { useState } from "react";
// import { product } from "../../app/libs/product";
import Link from "next/link";

const Checkout = ({product}) => {
    console.log(`di dalam component:`)
    console.log(product)
    const [quantity, setQuantity] = useState(1);
    const [paymentUrl, setPaymentUrl] = useState("");

    const decreaseQuantity = () => {
        setQuantity((prevState) => (quantity > 1 ? prevState - 1 : null));
    };

    const increaseQuantity = () => {
        setQuantity((prevState) => prevState + 1);
    };

    const checkout = async () => {
        const data = {
            id: product.product_id,
            productName: product.title,
            price: product.price,
            quantity: quantity,
        }

    //     const response = await fetch("/api/tokenizer", {
    //         method: "POST",
    //         body: JSON.stringify(data)
    //     })

    //     const requestData = await response.json()
    //     window.snap.pay(requestData.token)
    // };

    try {
        const response = await fetch("/api/tokenizer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const requestData = await response.json();
        console.log('Token:', requestData.token);  // Log token to check if it is received correctly
        window.snap.pay(requestData.token);
    } catch (error) {
        console.error('Error during checkout:', error);
    }
};

    const generatePaymentLink = async () => {
        const secret = process.env.NEXT_PUBLIC_SECRET
        const encodedSecret = Buffer.from(secret).toString('base64')
        const basicAuth = `Basic ${encodedSecret}`

        let data = {
            item_details: [{
                id: product.product_id,
                name: product.title,
                price: product.price,
                quantity: quantity
            }
            ],
            transaction_details: {
                order_id: product.product_id,
                gross_amount: product.price * quantity
            }
        }

        // const response = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/payment-links`, {
        //         method: "POST",
        //         headers: {
        //             "Accept": "application/json",
        //             "Content-Type": "application/json",
        //             "Authorization": basicAuth
        //         },
        //         body: JSON.stringify(data)
        //         })

        //     const paymentLink = await response.json()
        //     setPaymentUrl(paymentLink.payment_url)
        //     };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/payment-links`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": basicAuth
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const paymentLink = await response.json();
            setPaymentUrl(paymentLink.payment_url);
        } catch (error) {
            console.error('Error generating payment link:', error);
        }
    };

            return(
        <>
            <div className="flex items-center justify-between">
                <div className="flex sm:gap-4">
                    <button
                        className="transition-all hover:opacity-75"
                        onClick={decreaseQuantity}
                    >
                        ➖
                    </button>

                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        className="h-10 w-16 text-black border-transparent text-center"
                        onChange={quantity}
                    />

                    <button
                        className="transition-all hover:opacity-75"
                        onClick={increaseQuantity}
                    >
                        ➕
                    </button>
                </div>
                <button
                    className="rounded bg-indigo-500 p-4 text-sm font-medium transition hover:scale-105"
                    onClick={checkout}
                >
                    Checkout
                </button>
            </div>
            <button
                className="text-indigo-500 py-4 text-sm font-medium transition hover:scale-105"
                onClick={generatePaymentLink}
            >
                Create Payment Link
            </button>
            <div className="text-black underline italic">
                <Link href={paymentUrl} target="_blank">{paymentUrl}</Link>
            </div>
            
        </>
    );
};

export default Checkout;