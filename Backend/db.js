
import mongoose  from "mongoose";

const connectToMongo = (URL)=>{
    
    console.log("CONNECTED TO MONGO")
    return mongoose.connect(URL);
}

export default connectToMongo;