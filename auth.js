import mongoose, { mongo } from "mongoose";

mongoose.connect('mongodb://localhost:27017/skillflix', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
})

const S = mongoose.Schema({
    name:String,
    password:String
})

const UserModel = mongoose.model("user-auth",S);

export default UserModel
