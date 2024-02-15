import mongoose from "mongoose";

// helps to connect the database
const mongooseConnect = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to mongodb")
    } catch (error) {
        console.log(error)
    }
}

export default mongooseConnect;