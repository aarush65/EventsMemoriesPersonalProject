import axios from 'axios';

const API = axios.create({ baseURL:'http://localhost:5000'});

API.interceptors.request.use((req)=> {
    //Checks if user is logged in
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    } 

    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (currentId, post) => API.patch(`/posts/${currentId}`, post);
export const deletePost = (currentId) => API.delete(`/posts/${currentId}`);

export const getToken = (code) => API.post('/auth/google',code);
export const signUp = (data) => API.post('/user/signup', data);
export const signIn = (data) => API.post('/user/signin', data);