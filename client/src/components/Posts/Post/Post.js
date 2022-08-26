import React from "react";
import {Card, CardContent, CardActions, CardMedia, Button, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles.js';
import moment from 'moment';
import { useRecoilState } from "recoil";
import { currentId as iD, posts as p } from "../../../atoms/posts.js";
import * as api from "../../../api";
const Post = ({post}) => {
    const classes = useStyles();
    const [Id, setId] = useRecoilState(iD);    
    const [posts, setPosts] = useRecoilState(p);
    const user = JSON.parse(localStorage.getItem('profile'));
    

    const deletePost = async(id) => {
        try {
            await api.deletePost(id);
            setPosts(posts.filter((post)=> post._id !== id));
            //update the state
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <Card className={classes.card}>
            <CardMedia className = {classes.media} image = {post.selectedFile} title = {post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6"> {post.name} </Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
           {(post?.creator === user?.result?._id || post?.creator === user?.result?.sub) && ( 
            <div className ={classes.overlay2}>
                <Button style={{color:'white'}} size="small" onClick= {()=>{setId(post._id)}} >
                    <MoreHorizIcon fontSize="default"/>
                </Button>
            </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
            </div>
            <Typography className = {classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component = "p" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions>
                 {(post?.creator === user?.result?._id || post?.creator === user?.result?.sub) && (
                <Button size="small" color="primary" onClick= {()=>{deletePost(Id)}} >
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
              )} 
            </CardActions>
        </Card>
    )}
export default Post;