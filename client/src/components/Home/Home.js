import {React, useEffect} from "react";
import { Grow, Grid} from '@material-ui/core';
import Form from '../Forms/Form.js';
import Posts from '../Posts/Posts.js';
import useStyles from './styles.js';
import * as api from '../../api';
import {  posts as p, currentId as Id } from "../../atoms/posts.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
const Home = () => {
    const classes = useStyles();
    const setPosts = useSetRecoilState(p);
    const[curId,setId] = useRecoilValue(Id);
    useEffect(() => {
        //Gets posts everytime an action occurs
         const GetPosts = async() => {
    
            try {
                 var {data} = await api.fetchPosts();
                setPosts(data);
            } catch (error) {
                console.log(error);
            }
           
        }
        GetPosts();
    }, [curId]);
    return(
        <Grow in>
                <Grid container className = {classes.MainContainer} justifyContent ="space between" alignItems="stretch" spacing={3}>
                    <Grid item xs = {12} sm ={7}>
                        <Posts/>
                    </Grid>
                    <Grid item xs = {12} sm ={4}>
                        <Form/>
                    </Grid>
                </Grid>
            </Grow>
    )
}
export default Home;
