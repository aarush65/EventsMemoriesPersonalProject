import {React, useState} from "react";
import * as api from '../../api';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';
import { users as user } from "../../atoms/users";
import { useSetRecoilState } from "recoil";
import useStyles from './styles.js';
import { Avatar, Button, Paper, Grid, Typography,Container} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from "./Input";

const Auth = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp,setIsSignUp] = useState(false);
    const setUser = useSetRecoilState(user);
    const switchSignUp = () => {
        setIsSignUp(!isSignUp);
        setShowPassword(false);
    };
    const intialData = useState({firstName:'', lastName:'', email:'', password:'',confirmPassword:'' });

    const [loginData,setLoginData] = useState(intialData);

    const login = useGoogleLogin({
        flow:'auth-code',
        onSuccess:async codeResponse => {
            const tokens = await api.getToken(codeResponse);
            var result = jwt_decode(tokens.data.id_token);
            var token = tokens.data.id_token;
            //put decoded parts of token into local storage to ensure user data is there after a refresh
            localStorage.setItem('profile', JSON.stringify({result,token}));
            setUser(JSON.parse(localStorage.getItem('profile')));
            console.log(JSON.parse(localStorage.getItem('profile')));
            //navigate to home screen with posts
            navigate('/');
        },
         onError:errorResponse => console.log(errorResponse),
      });
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const SignUp = async(data,nav) => {
        try {
            const userData =  await api.signUp(data);
            console.log(userData.data);
            localStorage.setItem('profile',JSON.stringify(userData.data));
            setUser(JSON.parse(localStorage.getItem('profile')));
            nav('/')
        } catch (error) {
            console.log(error);
        }
    }
    const SignIn = async(data, nav) => {
        try {
            const userData =  await api.signIn(data);

            localStorage.setItem('profile', JSON.stringify(userData.data));
            setUser(JSON.parse(localStorage.getItem('profile')));
            nav('/')
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            SignUp(loginData, navigate);
        } else {
            SignIn(loginData,navigate)
        }

        console.log(loginData);
    };
    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    };
    const classes = useStyles();

    //Auth Forms
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.Paper} elevation = {3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant = "h5" >{isSignUp ? 'Sign Up' : 'Sign In'} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing = {2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange = {handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange = {handleChange} half/>
                                </>

                            )
                        }
                            <Input name = "email" label = "Email Address" handleChange = {handleChange} type = "email"/>
                            <Input name = "password" label = "Password" handleChange = {handleChange} type = { showPassword ? 'text' : 'password'} handleShowPassword = {handleShowPassword} />
                        {isSignUp && 
                            <Input name = "confirmPassword"  label = "Repeat Password" handleChange={handleChange} type="password"/>
                        }
                    </Grid>
                    
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Button className={classes.googleButton} 
                                color="primary" 
                                fullWidth onClick={() => login()} 
                                variant = "contained">
                                Google Sign-In 
                        </Button>
                    <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchSignUp}>
                            { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                    </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth;