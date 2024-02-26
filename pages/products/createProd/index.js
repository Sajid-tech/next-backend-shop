import Product from '@/components/Product'
import React from 'react'

const NewProduct = () => {
    return <>
        <section className="p-4 mt-6 lg:mt-0">
            <div className="sm:flex sm:items-center sm:justify-center">
                <div className="text-center sm:text-left">
                    <p className="mt-1.5 text-lg text-red-500">
                        Fill all the fields to add a new product!
                    </p>
                </div>
            </div>

            <hr className="my-8 h-px border-0 bg-gray-300" />
            <div className="my-10 max-sm:my-12">
                <Product />
            </div>

        </section>
    </>
}

export default NewProduct