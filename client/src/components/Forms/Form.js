import {React, useEffect, useState} from "react";
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import useStyles from './styles.js';
import FileBase from 'react-file-base64';
import * as api from '../../api';
import {useRecoilState } from "recoil";
import { posts as p, currentId as curId} from "../../atoms/posts.js";
import { users } from "../../atoms/users.js";


const Form = () => {
    const classes = useStyles();
    const [postData,setPostData] = useState({
        title:'', message:'', tags:'', selectedFile:''
    });
    
    const [posts, setPosts] = useRecoilState(p);
    const [currentId, setId] = useRecoilState(curId); 
    const Post = (currentId ? posts.find((p)=> p._id === currentId) :  null);
    const [user, setUser] = useRecoilState(users)
    
    //Updates form if the currentId of a post is changed which is helpful for updating posts
    useEffect(()=> {
        if(Post) {setPostData(Post)};
    },[Post]);

    //If user is not logged in, prevent them from making posts
    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to Create Events and interact with other events
                </Typography>
            </Paper>
        )
    }
    const createPost = async(POSTS) => {
        try {
            const {data}  = await api.createPost(POSTS);
            setPosts((posts) =>[...posts,data]);
        } catch (error) {
            console.log(error);
        }
    }
    const updatePost = async(Id, post) => {
        try {
            const {data} = await api.updatePost(Id, post);
            const pos = posts.map((Post) => Post?._id === data?._id ? data : Post);
            setPosts(pos); 
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange = (e) => {
        setPostData({...postData, [e.target.name]: e.target.value});

    };
    const handleSubmit = (e) => {
            e.preventDefault();
            if(currentId === '') {
                createPost({...postData, name:user?.result?.name });
            } else {
              updatePost(currentId, {...postData, name:user?.result?.name })
            }
            clear();
    }
    const clear = () => {
        setId('');
        setPostData({
            title:'', message:'', tags:'', selectedFile:'',
        })
    }

    return(
           <Paper className={classes.paper}>
               <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                   <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Event/Memory</Typography>
                   <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={handleChange}/>
                   <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={handleChange}/>
                   <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={handleChange}/>
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile:base64})}/>
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                        <Button variant="contained" color="secondary" size="small" onClick={clear}fullWidth>Clear</Button>
                    </div>
               </form>
           </Paper> 
        )
}
export default Form;