import axios from "axios";
import { useRouter } from "next/router";
// import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function DeleteOrder() {

    const router = useRouter();
    const { id } = router.query;
    const [orderInfo, setOrderInfo] = useState(null); // Initialize state with null


    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/order?id=' + id).then(response => {
            setOrderInfo(response.data)
            console.log("setOrderInfo", response.data)

        })
    }, [id])

    const goBack = () => {
        router.push('/orders');
    }

    const deleteOrder = async () => {
        await axios.delete('/api/order?id=' + id);
        toast.success('Order Deleted ')
        goBack()
    }

    console.log("orderinfo", orderInfo)
    return (
        <div className="min-h-screen mt-6 lg:mt-6 bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden md:max-w-md">
                <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-100 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Delete {orderInfo?.name} Order</h3>
                            </div>

                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">

                                    <div>
                                        <h3 className="text-md font-medium text-gray-900">By</h3>
                                        <p className="mt-1 text-sm text-gray-600">{orderInfo?.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-medium text-gray-900">Email</h3>
                                        <p className="mt-1 text-sm text-gray-600">{orderInfo?.email}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-medium text-gray-900">Country</h3>
                                        <p className="mt-1 text-sm text-gray-600">{orderInfo?.country}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-medium text-gray-900">Address</h3>
                                        <p className="mt-1 text-sm text-gray-600">{orderInfo?.address}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-medium text-gray-900">City</h3>
                                        <p className="mt-1 text-sm text-gray-600">{orderInfo?.city}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-medium text-gray-900">Zip Code</h3>
                                        <p className="mt-1 text-sm text-gray-600">{orderInfo?.zip}</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <h3 className="text-md font-medium text-gray-900">Products</h3>
                                        <div className="mt-1">
                                            {orderInfo?.line_items &&
                                                orderInfo?.line_items.map((product, index) => (
                                                    <div key={index} className="border-b border-gray-200 py-3">
                                                        <p className="text-md font-medium text-gray-900">{product.price_data?.product_data?.name}</p>
                                                        <p className="mt-1 text-sm text-gray-600">Quantity: {product.quantity}</p>
                                                        <p className="mt-1 text-sm text-gray-600">Price: ₹{(product.price_data?.unit_amount / 100).toFixed(2)}</p>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="mt-6 text-sm text-gray-600">Are you sure you want to delete this order? This action cannot be undone.</p>
                        <div className="mt-4 lg:mt-6 flex md:mt-0 md:ml-4">
                            <button
                                type="button"
                                className="py-2 px-4 border border-transparent   shadow-sm text-sm font-medium rounded-md text-gray-700 bg-sky-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={goBack}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={deleteOrder}

                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}