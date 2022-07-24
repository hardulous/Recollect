
import { FETCH_ALL, UPDATE, CREATE, DELETE, LIKE, AUTH, LOGOUT, ERROR} from '../Constants/ActionTypes.js';


// REDUCERS:::

// POST REDUCERS
export const postReducer = ( posts=[] , action )=>{

    switch (action.type) {

        case FETCH_ALL:
            
           return action.payload;
        
        case CREATE:
      
           return [...posts,action.payload];

        case UPDATE:
        case LIKE:    

           return posts.map( (post) => post._id==action.payload._id?action.payload:post )

        case DELETE:
           
           return posts.filter( (post)=> post._id!==action.payload );  

        default:
            
           return posts;

    }

}

// AUTH REDUCERS
export const authReducer = (state = { authData:null } , action)=>{

    switch (action.type) {

       case AUTH:
         
         localStorage.setItem('profile',JSON.stringify({...action?.payload}))
         return {...state, authData:action?.payload,error:null};
       
       case LOGOUT:
          
         localStorage.clear();
         return {...state, authData:null, error:null}

       case ERROR:
          
         return {error:action.payload};

       default:

         return state

    }
} 