import http from 'http';
import dotenv from 'dotenv'
dotenv.config();
import app from './app';
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/error.middlewares';



try{
    const connectDb=async ()=>{
        const db=await mongoose.connect(process.env.DB_URI||'');
        console.log(db);
    }
    connectDb();
    const server=http.createServer(app);
    server.listen(process.env.PORT,()=>{
        console.log(`server listening at port ${process.env.PORT}`);
    })
}catch(error){
    console.log("Error while connecting the MongoDB : ", error);
    
}

app.use(errorHandler as any)
