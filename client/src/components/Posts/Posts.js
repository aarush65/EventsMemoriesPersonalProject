import React from "react";
import Post from "./Post/Post.js";
import useStyles from './styles.js';
import { useRecoilState, useRecoilValue } from "recoil";
import { posts as p } from "../../atoms/posts.js";
import { Grid, CircularProgress } from "@material-ui/core";
const Posts = () => {
    const classes = useStyles();
    const [posts, changePosts] = useRecoilState(p);
    console.log(posts);
    return(
        //If there are no posts, show a loading circle
       !posts.length ? <CircularProgress/> : (
           <Grid className={classes.container} container alignItems = "stretch" spacing = {3}>
               {posts.map((post) =>(
                   <Grid key = {post._id} item xs={12} sm={6}>
                    <Post post = {post}/>
                   </Grid>
               ))}
           </Grid>
       ));
}
export default Posts;