
import React , {useEffect , useState} from "react";
import { Container, Grow, Grid } from '@material-ui/core'
import Form from '../Form/form.js'
import Posts from '../Posts/posts.js'
import useStyles from './styles.js'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../Actions/postsAction.js'

const Home = ( { ShowAlert } ) => {

    const [currentId, setcurrentId] = useState(null);

    const dispatch = useDispatch();
  
    const classes = useStyles();
  
    useEffect(() => {
      
      dispatch(getPosts());
  
    }, [dispatch,currentId]);
  

  return (

      <Grow in>

        <Container>

          <Grid
            container
            className={classes.mainContainer}
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            
            <Grid item xs={12} sm={7} className={classes.post}>
              <Posts setcurrentId={setcurrentId} ShowAlert={ShowAlert} />
            </Grid>

            <Grid item xs={12} sm={4} className={classes.form}>
              <Form currentId={currentId} setcurrentId={setcurrentId} ShowAlert={ShowAlert} />
            </Grid>

          </Grid>

        </Container>

      </Grow>

  );

};

export default Home;
