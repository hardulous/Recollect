
import React, { useState , useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Typography,AppBar, Toolbar, Avatar, Button } from '@material-ui/core'
import useStyles from './styles.js'
import recollect from '../../Images/recollect.png'
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';
import recollect2 from '../../Images/recollect2.png'

const Navbar = ( { ShowAlert } ) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate(); 
    const classes = useStyles();
    
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(()=>{

      const token = user?.token
      
      if(token){

        const decodedToken = decode(token);

        if(decodedToken.exp * 1000 < new Date().getTime){
          logout();
        }

      }

      setuser(JSON.parse(localStorage.getItem('profile')))

    } , [dispatch,location] )

    const logout = ()=>{
      
      dispatch( { type:"LOGOUT" } )
      ShowAlert("success","You have logged-out fom your account")
      navigate('/auth');
      setTimeout(() => {
        navigate('/');
      }, 1);
      setuser(null);

    }
    
  return (


      <AppBar position="static" color="inherit" className={classes.appBar}>

        <div className={classes.brandContainer}>

           <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">
             Recollect
           </Typography>

           <img
             className={classes.image}
             src={recollect2}
             alt=""
             width="60"
             height="60"
           />

        </div>

        <Toolbar className={classes.toolbar}>

          { user ? 
          
           <div className={classes.profile}>

             <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>

             <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>

             <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >LogOut</Button>

           </div> 
          
          : <Button component={Link} to="/auth" variant="contained" color="primary">SignIn</Button> }

        </Toolbar>

      </AppBar>


  );

};

export default Navbar;
