import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handle(req, res) {

    const { method } = req;
    await mongooseConnect();


    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Order.findOne({ _id: req.query.id }).sort({ createdAt: -1 }))
        } else {
            res.json(await Order.find().sort({ createdAt: -1 }))
        }
    }

    // if (method === 'GET') {
    //     try {
    //         const orders = await Order.find().sort({ createdAt: -1 });
    //         res.json(orders);
    //     } catch (error) {
    //         console.error('Error fetching orders:', error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // }


    if (method === 'DELETE') {
        if (req.query?.id) {
            await Order.deleteOne({ _id: req.query?.id })
            res.json(true)
        }
    }
}
