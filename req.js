import mongoose from "mongoose";


mongoose.connect('mongodb://localhost:27017/skillflix', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
})

const Sc = mongoose.Schema({
    user:String,
    teach:String,
    learn:String,
    by:String,
    type:String,
    message:String,
    descion:String,
})

const requestModel = mongoose.model("requests",Sc);

export default requestModel;