import Product from "@/components/Product";
import axios from "axios";
// import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



export default function EditProduct() {

    // first fetch the product info by id 
    const params = useParams()
    console.log(params)
    const { slug } = params
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!slug) {
            return;
        }
        axios.get('/api/products?id=' + slug).then(response => {
            setProductInfo(response.data)
        })
    }, [slug])
    return <>
        <div className="max-sm:p-4">

            <div className="sm:flex sm:items-center sm:justify-center">
                <div className="text-center sm:text-left">
                    <p className="my-4 text-xl text-red-500">
                        Editing <span className="text-green-600">{productInfo?.title}</span>
                    </p>
                </div>
            </div>
            <hr class="my-8 h-px border-0 bg-gray-300" />
            <div className="my-10 max-sm:my-12">
                {productInfo && (
                    <Product {...productInfo} />
                )}
            </div>
        </div>
    </>
}