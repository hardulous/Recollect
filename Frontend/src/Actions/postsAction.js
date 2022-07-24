
import * as api from '../API/index.js'
import { FETCH_ALL, UPDATE, CREATE, DELETE, LIKE } from '../Constants/ActionTypes.js';

// ACTION CREATORS::::

export const getPosts = ()=>{

    return async (dispatch)=>{

        try {
            
            const { data } = await api.fetchPost();
            const action = { type:FETCH_ALL ,payload: data };
            dispatch(action);

        } catch (error) {
            
            console.log(error);

        }

    }
}

export const createPost = (newPost)=>{

    return async (dispatch)=>{

        try {
            
            const { data } = await api.createPost(newPost);
            const action = { type:CREATE ,payload: data };
            dispatch(action);

        } catch (error) {
            
            console.log(error);

        }

    }
}


export const updatePost = ( id , updatedPost )=>{

    return async (dispatch)=>{

        try {
            
            const { data } = await api.updatePost( id , updatedPost );
            const action = { type:UPDATE ,payload: data };
            dispatch(action);

        } catch (error) {
            
            console.log(error);

        }

    }
}


export const deletePost = ( id )=>{

    return async (dispatch)=>{

        try {
            
            await api.deletePost(id);
            const action = { type:DELETE ,payload: id };
            dispatch(action);

        } catch (error) {
            
            console.log(error);

        }

    }
}


export const likePost = ( id )=>{

    return async (dispatch)=>{

        try {
            
            const { data } = await api.likePost(id);
            const action = { type:LIKE ,payload: data };
            dispatch(action);

        } catch (error) {
            
            console.log(error);

        }

    }
}

