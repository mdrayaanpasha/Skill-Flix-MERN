import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/skillflix', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
})

const S = mongoose.Schema({
    User:String,
    Learn: String,
    Teach: String,
    Description:String
});

const PostModel = mongoose.model("Posts",S)


export default PostModel
