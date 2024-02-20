import axios from "axios";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function DeleteProduct() {

    const router = useRouter()
    const params = useParams()
    console.log(params)
    const { slug } = params || {}
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!slug) {
            return;
        }
        axios.get('/api/products?id=' + slug).then(response => {
            setProductInfo(response.data)

        })
    }, [slug])

    const goBack = () => {
        router.push('/products')
    }

    const deleteProduct = async () => {
        await axios.delete('/api/products?id=' + slug);
        toast.success('Product Deleted ')
        goBack()
    }
    return <>

        <div className="h-80">

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-xl sm:w-full sm:max-w-xl">
                    <div className="relative p-6">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-secondary-900">Delete {productInfo?.title}</h3>
                                <div className="mt-2 text-sm text-secondary-500">Are you sure you want to delete this product? This action cannot be undone.</div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button type="button" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400" onClick={goBack}>Cancel</button>
                            <button type="button" className="rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300" onClick={deleteProduct}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>
}