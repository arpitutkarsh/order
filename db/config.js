import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB Connected Successfully", connectionInstance.connection.host)
    } catch (error) {
        console.log("Error connecting to the Database", error)
        throw error
    }
}

export default connectDB