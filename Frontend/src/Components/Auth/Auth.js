
import React , { useState , useEffect } from 'react'
import { Avatar , Button , Paper , Grid , Typography, Container, TextField, Icon } from '@material-ui/core'
import useStyles from './styles.js'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './input.js'
import  { GoogleLogin } from 'react-google-login';
import ICON from './Icon.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup , signin } from '../../Actions/authAction.js'

const Auth = ( { ShowAlert } ) => {
   
    let auth = useSelector((state)=>state.auth);
    console.log(auth);
    useEffect(()=>{

      if(auth?.error && !auth.authData){
         ShowAlert("danger",auth.error);
      }

      if(!auth?.error && auth.authData){
         ShowAlert("success","Welcome To Recollect App");
      }

    },[auth]);


    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();

    const [formData, setformData] = useState({

      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:"",

    });

    const [isSignUp,setisSignUp] = useState(false);
    const [showPassword,setshowPassword] = useState(false);

    const handleSubmit = (e)=>{

       e.preventDefault();
       
       if(isSignUp){

         dispatch(signup(formData,navigate,"Check either user with this email already exist and write same password in confirm password pls !!"))

       }
       else{

         dispatch(signin(formData,navigate,"Check either credentials are valid or not and User with this email might already exist !!"))

       }

    }

    const handleChange = (e)=>{

       setformData( { ...formData , [e.target.name]:e.target.value } )

    }

    const handleShowPassword = ()=>{

        setshowPassword( (prevShowPassword)=> ! prevShowPassword )
    }

    const switchMode =()=>{

        setisSignUp( (prevIsSignUp)=> !prevIsSignUp )
        setshowPassword(false);

    }

    const googleSuccess = async (res)=>{

       console.log(res);
       const result = res?.profileObj 
       const token = res?.tokenId;

       try {
         
         dispatch( { type:"AUTH", payload: {result,token} } );
         navigate('/');

       } catch (error) {
          
          console.log(error)
       }

    }

    const googleFailure = ()=>{

       console.log("Google Sign In was unsuccessfull. Try Again Later")
    }

    return (

        <Container component="main" maxWidth="xs">

          <Paper className={classes.paper} elevation={3}>

             <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
             </Avatar>

             <Typography variant="h5">{isSignUp ? "Sign Up":"Sign In"}</Typography>

             <form className={classes.form} onSubmit={handleSubmit}>

                <Grid container spacing={2}>

                  { isSignUp && 
                    
                     <>
                       
                       <Input name="firstName" label="FirstName" handleChange={handleChange} autoFocus half/>

                       <Input name="lastName" label="LastName" handleChange={handleChange} half/>

                     </> 
                  }
                   
                   <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus={!isSignUp ? true : false} />

                   <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text":"password"} handleShowPassword={handleShowPassword}/>

                   { isSignUp && 
                   
                      <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>
                   
                   }

                </Grid>
                
                <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>{ isSignUp ? "Sign Up" : "Sign In"}</Button>


               <GoogleLogin clientId='980938868182-5rqa8rk3sb2m0ia2q9uqg7u739p6bv0p.apps.googleusercontent.com' render={(renderProps)=>{

                  return <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<ICON/>} variant='contained'>Google Sign In</Button>

                }} onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy='single_host_origin'/>

                <Grid container justifyContent='flex-end'>

                   <Grid item>

                       <Button onClick={switchMode}>
                           { isSignUp ? 'Already have an account ? Sign In' : "Don't have an account Sign Up" }
                       </Button>

                   </Grid>

                </Grid>

             </form>

          </Paper>

        </Container>

    )

}

export default Auth
