import mongoose, { mongo } from "mongoose";

mongoose.connect('mongodb://localhost:27017/skillflix', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
})


const sch = mongoose.Schema({
    sender:String,
    reciver: String,
    message : String
})


const testModel  = mongoose.model("test",sch)

export default testModel