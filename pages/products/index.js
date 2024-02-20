import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


// Utility function to format price with a comma for thousands
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/api/products').then(res => {
            setProducts(res.data)
            setLoading(false)
        })
    })

    return <>
        <header className="bg-gray-50">
            <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl"> All Products</h1>

                        <p className="mt-1.5 text-md text-gray-500 max-w-md">Let&apos;s create a new product! 🎉</p>
                    </div>

                    <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                        <Link
                            href={'/products/createProd'}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-500 bg-white px-5 py-3 text-green-500 transition hover:text-orange-700 hover:border-orange-500 focus:outline-none focus:ring"
                            type="button"
                        >
                            <span className="text-sm font-medium"> Create Product </span>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </Link>


                    </div>
                </div>
            </div>
        </header>

        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

            {products.length === 0 ? (
                <p className='w-full text-center'>No Products Available</p>
            ) : (

                <div className="">
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">S.No</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Description</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Price</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                            </tr>
                        </thead>
                        {products.map((product, index) => (
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100" key={products._id}>
                                <tr>
                                    <th className="px-6 py-4 font-medium text-gray-900">{index + 1}</th>
                                    <td className="px-6 py-4">{product?.title}</td>
                                    <td className="px-6 py-4 truncate max-w-xs">{product?.description}</td>
                                    <td className="px-6 py-4">&#8377; {formatPrice(product.price)} </td>
                                    <td className="flex justify-end gap-4 px-6 py-4 font-medium">
                                        <Link className=' text-red-700' href={`/products/delete/` + product._id}>Delete</Link>
                                        <Link href={`/products/edit/` + product._id} className="text-green-700">Edit</Link>
                                    </td>
                                </tr>

                            </tbody>
                        ))}
                    </table>
                </div>




            )}

        </div>
    </>
}

export default Products