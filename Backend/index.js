
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import connectToMongo from './db.js'
import postRoutes from './Routes/Posts.js'
import userRoutes from './Routes/users.js'

import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/posts',postRoutes);
app.use('/users',userRoutes)

app.use(express.static('./Static'))

const start = async(URL)=>{
      
    try {
       
       await connectToMongo(URL); 
       app.listen( PORT , ()=>{
       
        console.log(` Server is listening on port ${PORT} `)

       })
        
    } catch (error) {
        console.log(error)
    }
}

start(process.env.CONNECTION_URL);

// MY HEROKU ACCOUNT gmail is amanbisht123abc@gmail.com and password amanbisht@2001aarna