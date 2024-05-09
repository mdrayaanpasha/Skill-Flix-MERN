import mongoose, { mongo } from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/skillflix', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log(error)
    }
}

export { connectDB };