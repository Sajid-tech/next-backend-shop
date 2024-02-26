"use client"
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Orders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/order').then((response) => {
            setOrders(response.data);
        });
    }, []);

    return (
        <div className="p-4">
            <div className='flex items-start gap-2'>
                <h1 className="text-3xl font-bold mb-4">Orders </h1>
                <h1 className=' font-thin py-1 text-2xl'>({orders.length})</h1>

            </div>
            {orders.length > 0 &&
                orders.map((order, index) => (
                    <div key={order._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Order #{index + 1}</h2>
                                <h3 className="text-gray-600 mb-2 flex gap-2">Id: {order._id}
                                    <div>
                                        <Link className=' border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500' href={`/orders/delete/` + order._id}>Delete</Link>
                                    </div>
                                </h3>

                                <h3 className="text-md font-medium mb-2">By: {order.name}</h3>
                                <h3 className="text-md font-medium mb-2">Email: {order.email}</h3>
                            </div>
                            <div>
                                <h3 className="text-md font-medium mb-2">Country: {order.country}</h3>
                                <h3 className="text-md font-medium mb-2">Address: {order.address}</h3>
                                <h3 className="text-md font-medium mb-2">City: {order.city}</h3>
                                <h3 className="text-gray-600 mb-2">Zip Code: {order.zip}</h3>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-4">Product</th>
                                        <th className="py-2 px-4">Quantity</th>
                                        <th className="py-2 px-4">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.line_items &&
                                        order.line_items.map((product) => (
                                            <tr key={product.id}>
                                                <td className="py-2 px-4">{product.price_data?.product_data?.name}</td>
                                                <td className="py-2 px-4">{product.quantity}</td>
                                                <td className="py-2 px-4">₹{(product.price_data?.unit_amount / 100).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Orders