
import React , { useState , useEffect } from 'react'
import useStyles from './styles.js'
import { TextField , Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { createPost , updatePost } from '../../Actions/postsAction.js';

const Form = ({ currentId , setcurrentId }) => {

    const user = JSON.parse(localStorage.getItem('profile'));

    const classes = useStyles();

    const dispatch = useDispatch();

    const post = useSelector((state)=> currentId?state.posts.find((p)=>p._id===currentId):null);

    const [postData, setpostData] = useState({
        title:'',
        message:'',
        tag:'',
        selectedFile:''
    })

    const handleSubmit =(e)=>{

        e.preventDefault();
        
        if(currentId){

          dispatch(updatePost(currentId,{...postData , name:user?.result.name}));

        }else{

          dispatch(createPost({...postData , name:user?.result.name}));

        }

        clear();
    }

    const clear =()=>{

     setcurrentId(null);
     setpostData({ title:'',message:'',tag:'',selectedFile:''})

    }

    useEffect(()=>{

       if(post){
         setpostData(post);
       }

    } , [dispatch,post] )

     if(!user?.result?.name){

       return (<Paper className={classes.paper}>

          <Typography variant='h6' align='center'>
            Please sign-in to create your own Recollect
          </Typography>

       </Paper>)

     }

    return (

        <Paper className={classes.paper}>
          
          <form onSubmit={handleSubmit} autoComplete='off' noValidate className={`${classes.root} ${classes.form}`}>

            <Typography variant="h6">{currentId?"Edit a Memo":"Create a Memo"}</Typography>

             <TextField 

              name="title" 
              variant="outlined" 
              label="title" 
              fullWidth 
              value={postData.title} 
              onChange={(e)=>{setpostData({...postData,[e.target.name]:e.target.value})}}

            />

             <TextField 

              name="message" 
              variant="outlined" 
              label="message" 
              fullWidth 
              value={postData.message} 
              onChange={(e)=>{setpostData({...postData,[e.target.name]:e.target.value})}}

            />

             <TextField 

              name="tag" 
              variant="outlined" 
              label="tags" 
              fullWidth 
              value={postData.tag} 
              onChange={(e)=>{setpostData({...postData,[e.target.name]:e.target.value.split(',')})}}

            />

            <div className={classes.fileInput}>

               <FileBase
               
                type="file"
                multiple={false}
                onDone={({base64})=>{{setpostData({...postData, selectedFile:base64})}}}
               
               />

            </div>

            <Button className="my-2" variant="contained" color="primary" size="large" type="submit" fullWidth>{currentId?"Edit Memo":"Add Memo"}</Button>

            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear Field</Button>
            
          </form>

        </Paper>

    )

}

export default Form;