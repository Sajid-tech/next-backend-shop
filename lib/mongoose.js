import mongoose from "mongoose";

// helps to connect the database
const mongooseConnect = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("mongodb is connected ")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }


}

export default mongooseConnect;