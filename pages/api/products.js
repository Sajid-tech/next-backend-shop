//api for products

import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";


export default async function handle(req, res) {
    const { method } = req;

    //connect to database
    await mongooseConnect()
    if (method === 'POST') {
        const { title, description, price, images } = await req.body;




        const productDoc = await Product.create({
            title,
            description,
            price,
            images,
        })
        res.json(productDoc);

    }
}








