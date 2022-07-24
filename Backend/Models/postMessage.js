
import mongoose  from "mongoose";

const postSchema = mongoose.Schema({

    title:String,
    message:String,
    name:String,
    creator:String, // this is id of user whose post is that 
    tag:[String],
    selectedFile:String,

     // basically this likes is array of all user id means whoever user like any post have their id pushed inside that post likes array
    likes:{    
        type:[String],
        default:[]
    },

    createdAt:{
        type:Date,
        default:new Date().toISOString()
    },

})

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;