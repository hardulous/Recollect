
import jwt from 'jsonwebtoken';

const auth = async (req,res,next)=>{

    try {
        
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // means jwt token if <500 but if > then it is googleAuth token

        let decodedData;

        // for JWT authentication
        if(token && isCustomAuth){

            decodedData= jwt.verify(token,"test");
            req.userId = decodedData?.id;
        }
        // for googleAuth token
        else{
            decodedData=jwt.decode(token);
            req.userId = decodedData?.sub; // sub is basically google name convention for id which seperates every google user
        }

          next();

    } catch (error) {
        console.log(error);
    }

}

export default auth;

// ########### NOTE:: whatever u add in request header always write in lowercase because backend receives thing in lower case always 