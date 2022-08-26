import {React} from "react";
import {Container} from '@material-ui/core';
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
    return(
    <GoogleOAuthProvider clientId={window.env.CLIENT_ID}>
        <Router>
            <Container maxWidth='lg'>
                <Navbar/> 
                    <Routes>
                        <Route  path="/" element = {<Home/>}/>
                        <Route path = "/auth" element= {<Auth/>}/>
                    </Routes>
            </Container>
        </Router>
    </GoogleOAuthProvider>
    )
}
export default App;