import mongoose from "mongoose";
 

//creating a schema for post messages for uniformity
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    createdAt: {
        type:Date,
        default: new Date()
    },
})
const PostMessage = mongoose.model('PostMessage', postSchema);
//exporting a model from this PostMessage component, can run model commands as a result
export default PostMessage;