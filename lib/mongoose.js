import mongoose from "mongoose";

// helps to connect the database
const mongooseConnect = async () => {

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();

    } else {
        const uri = process.env.MONGODB_URI
        return mongoose.connect(uri);
    }


}

export default mongooseConnect;