import {React, useEffect} from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles.js';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { users} from '../../atoms/users.js';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();
    const [user,setUser] = useRecoilState(users);
    const logout = () => {
        setUser(null);
        localStorage.clear();
        navigate('/')

    }
    useEffect(()=> {
        const token = user?.token;
        //Logout the user if the time is up
        if(token) {
            const decodedToken = jwt_decode(token);
            if(decodedToken?.expiry_date * 1000 < new Date().getTime() || decodedToken?.exp*1000 < new Date().getTime()) logout();}
        //reset user if logout or logged in
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className = {classes.heading} variant="h2" align="center">Memories/Events</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt = {user.result.name} src ={user.result.picture}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant = 'h6'>{user.result.name}</Typography>
                        <Button variant = "contained" className={classes.logout} color = "secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component = {Link} to= "/auth" variant = "contained" color = "primary" >Sign In</Button>    
                )
            }
            </Toolbar>
        </AppBar>
    )
}
export default Navbar;