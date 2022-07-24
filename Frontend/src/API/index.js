
import axios from 'axios';

// API CALLS TO BACKEND SERVER::::

const API = axios.create( { baseURL:"https://myrecollect-project.herokuapp.com" } )


API.interceptors.request.use((req)=>{

    if(localStorage.getItem('profile')){

        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`

    }

    return req;

})

// NOTES CALLS

export const fetchPost = () => API.get('/posts');
export const createPost = (newPost)=> API.post( '/posts' , newPost );
export const updatePost = (id,updatedPost)=> API.patch(`/posts/${id}`,updatedPost)
export const deletePost = (id)=> API.delete(`/posts/${id}`);
export const likePost = (id)=> API.patch(`/posts/${id}/likePost`);

// USERS CALLS

export const signIn = (formData)=> API.post('/users/signin', formData);
export const signUp = (formData)=> API.post('/users/signup', formData);
