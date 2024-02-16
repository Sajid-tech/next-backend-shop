"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Product = () => {

    const [redirect, setRedirect] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [images, setImages] = useState([])
    const router = useRouter()

    // send the data to db 
    async function createProduct(e) {
        e.preventDefault();

        const data = { title, description, price };
        await axios.post('/api/products', data)
        console.log(data)
        setRedirect(true);


    }

    if (redirect) {
        router.push('/products')
        return null
    }

    return <>

        <form onSubmit={createProduct} className='mx-auto max-w-screen-sm'>
            {/* Title  */}
            <div className='mx-auto my-4'>
                <div>
                    <label htmlFor="example1" className="mb-1 block text-lg font-medium text-gray-700 py-1">Title</label>
                    <input type="text" id="example1" className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3"
                        placeholder="Product Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </div>
            {/* Select Category  */}
            <div className='mx-auto my-4'>
                <div>
                    <label htmlFor="example1" className="mb-1 block text-lg font-medium text-gray-700 py-1">Select Category</label>
                    <select className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3" >
                        <option value="">No category selected</option>
                        <option value="">Headphone</option>
                        <option value="">Clothing</option>
                    </select>
                </div>
            </div>
            {/* images  */}
            <div className='mx-auto my-4'>


                <div className="mx-auto ">
                    <label htmlFor="example1" className="mb-1 block text-lg font-medium text-gray-700 py-1">Images</label>
                    <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-blue-300 p-6 transition-all hover:border-primary-300">
                        <div className="space-y-1 text-center">
                            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                            </div>
                            <div className="text-gray-600"><a href="#" className="font-medium text-primary-500 hover:text-primary-700">Click to upload</a> or drag and drop</div>
                            <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        </div>
                        <input id="example5" type="file" className="sr-only" />
                    </label>
                </div>

                {/* Description  */}

            </div>
            <div className='mx-auto my-4'>
                <div>
                    <label htmlFor="example1" className="mb-1 block text-lg font-medium text-gray-700 py-1">Description</label>
                    <textarea rows={5} type="text" id="example1" className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3" placeholder=" Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            {/* Price  */}
            <div className='mx-auto my-4'>
                <div>
                    <label htmlFor="example1" className="mb-1 block text-lg font-medium text-gray-700 py-1">Price</label>
                    <input type="number" id="example1" className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3" placeholder="Product Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            </div>

            {/* upload button */}
            <div className='mx-auto my-4'>
                <button className="group relative inline-block focus:outline-none focus:ring w-full" type='submit'>
                    <span
                        className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-green-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 w-full"
                    ></span>

                    <span
                        className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 w-full"
                    >
                        Save Product
                    </span>
                </button>
            </div>



        </form>
    </>
}

export default Product