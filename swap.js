import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/skillflix', {
    useNewUrlParser: true,
});

const S =  mongoose.Schema({
    initilized: String,
    request: String,
    learn: String,
    teach: String
});

const SwapModel = mongoose.model("SwapBase", S);

export default SwapModel;
