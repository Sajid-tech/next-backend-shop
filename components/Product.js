"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { ReactSortable } from 'react-sortablejs'
import Image from 'next/image'
import Spinner from './Spinner'
import toast from 'react-hot-toast'



// ({ ... }):

// Defines the props accepted by the component. These props are destructured from an object passed as an argument.
const Product = ({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
}) => {

    const [redirect, setRedirect] = useState(false)

    const [title, setTitle] = useState(existingTitle || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [images, setImages] = useState(existingImages || [])

    const [isUploading, setIsUploading] = useState(false)

    const uploadImagesQueue = []
    const router = useRouter()

    // send the data to db 
    async function createProduct(e) {
        e.preventDefault();


        // Check if there are new images to upload
        if (isUploading) {
            // Wait for the images to finish uploading
            await Promise.all(uploadImagesQueue)
        }
        // Now you can make the API request to save the product
        const data = { title, description, price, images };
        // we checking , if we have a id than do that else post the product
        if (_id) {
            await axios.put('/api/products', { ...data, _id });
            toast.success('Product Updated')
        } else {
            await axios.post('/api/products', data);
            toast.success('Product Added')
        }

        console.log(data)


        // Redirect after saving
        setRedirect(true);


    }
    // upload image function

    async function uploadImages(e) {
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);


                // Use the axios.post method and push the promise to the queue
                try {

                } catch (error) {

                }
                uploadImagesQueue.push(
                    axios.post('/api/upload', data)
                        .then(res => {
                            setImages(oldImages => [...oldImages, ...res.data.links]);
                        })
                );
            }

            // Wait for all images to finish uploading
            await Promise.all(uploadImagesQueue)
            setIsUploading(false)
        } else {
            return ('An Error Occured')
        }
    }



    // after send the data of product it will redirect to products section
    if (redirect) {
        router.push('/products')
        return null
    }


    function updateImageOrder(Images) {
        setImages(Images)
        console.log(Images)
    }

    function handleDeleteImage(index) {
        const updatedImages = [...images]
        updatedImages.splice(index, 1)
        setImages(updatedImages);
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
                        <input id="fileInput" type="file" className="hidden" accept='image/*'
                            multiple onChange={uploadImages}
                        />
                    </label>
                </div>


            </div>

            {/* React Spinner during upload */}
            <div className="grid grid-cols-2 items-center rounded">

                {isUploading && (
                    <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
            </div>

            {/* Display uploaded images */}


            {!isUploading && (
                <div className='grid grid-cols-2 gap-4'>
                    <ReactSortable
                        list={Array.isArray(images) ? images : []}
                        setList={updateImageOrder}
                        animation={200}
                        className='grid grid-cols-2 gap-4 '
                    >
                        {Array.isArray(images) && images.map((link, index) => (
                            <div key={link} className='relative group'>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={link} alt='image' className='object-cover h-32 w-44 rounded-md p-2' />
                                <div className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100">
                                    <button onClick={() => handleDeleteImage(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-orange-600 bg-white rounded-full">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}


            {/* Description  */}
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