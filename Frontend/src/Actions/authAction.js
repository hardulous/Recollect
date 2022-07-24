
import { AUTH , ERROR } from '../Constants/ActionTypes.js';
import * as api from '../API/index.js'

export const signin = (formData,navigate,errMessage)=>{

    return async (dispatch)=>{

        try {
            
            const { data } = await api.signIn(formData);
            console.log(data);
            dispatch( { type: AUTH , payload: data} ) 
            navigate('/');

        } catch (error) {

            console.log(error);
            dispatch( { type: ERROR , payload: errMessage } ) 
        }

    }

}

export const signup = (formData,navigate,errMessage)=>{

    return async (dispatch)=>{

        try {

            const { data } = await api.signUp(formData);
            console.log(data);
            dispatch( { type: AUTH , payload: data} ) 
            navigate('/');

        } catch (error) {

            console.log(error);
            dispatch( { type: ERROR , payload: errMessage } ) 
        }

    }

}