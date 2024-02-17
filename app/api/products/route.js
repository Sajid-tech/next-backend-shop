//api for products

import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {

    const { title, description, price } = await req.json()


    //connect to database
    await mongooseConnect()

    await Product.create({
        title,
        description,
        price,
    })
    return NextResponse.json({ message: "Product created" }, { status: 201 })

}








