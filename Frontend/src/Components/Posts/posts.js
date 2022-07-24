
import React from 'react'
import Post from './Post/post.js';
import useStyles from './styles.js'
import { useSelector } from 'react-redux';
import { Grid , CircularProgress } from '@material-ui/core';

const Posts = ({ setcurrentId }) => {

  const posts = useSelector((state)=> state.posts);
  
  const classes = useStyles();


    return (

        <>
        
          {posts.length==0 ? <CircularProgress/> :
          
            <Grid container className={classes.mainContainer} alignItems='stretch' spacing={3}>

              {posts.map((element)=>{

                return <Grid item key={element._id} xs={12} sm={6}>

                  <Post post={element} setcurrentId={setcurrentId}/>

                </Grid>

              })}

            </Grid>

          }


        </>

    )

}

export default Posts;