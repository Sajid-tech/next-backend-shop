import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    images: [{ type: String }]
})

export const Product = models.Product || model('Product', ProductSchema)