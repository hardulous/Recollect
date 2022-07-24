
import PostMessage from "../Models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req,res)=>{

    try {
        
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);

    } catch (error) {
        res.status(404).json({message:error.message});
    }

}

export const createPost = async (req,res)=>{

    const post = req.body;
    // here each post will have property of creator which container userId of user whoever created that post so other user can't modify it
    const newPost = new PostMessage({...post,creator:req.userId});

    try {
        
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({message:error.message});
    }

}

export const updatePost = async(req,res)=>{

    const { id:_id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post With This Id');
    }

    const newPost = await PostMessage.findByIdAndUpdate( _id ,  { ...post, _id} , {new:true} );

    res.status(200).json(newPost);

}

export const deletePost = async(req,res)=>{

    const { id:_id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post With This Id');
    }
  
    await PostMessage.findByIdAndRemove(_id);
 
    res.status(200).json({message:"Post Deleted Successfully"});

}

export const likePost = async(req,res)=>{

    const { id:_id } = req.params;

    if(!req.userId){
        
       return res.json({message:"Unauthenticated"})
    }

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post With This Id');
    }
  
    const post = await PostMessage.findById(_id);
     
    // first need to find wheter user with id req.userId his id is present in likes array of this post , here this findIndex will return index of first occurrence of id equal to req.userId but if not present return -1

    const index = post.likes.findIndex((id)=> id===String(req.userId));

    if(index===-1){
      
        // like the post so add this userId in likes array of this post as index is -1 means this user have not liked the post yet
        post.likes.push(req.userId);
    }
    else{

        // dislike the post means removing this user id from likes array of this post  because as user id is present already in likes array of this post and as one user can like the post only 1 time 
        post.likes = post.likes.filter((id)=> id!==String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new:true})

    res.status(200).json(updatedPost);

}