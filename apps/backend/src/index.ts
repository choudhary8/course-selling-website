import http from 'http';
import dotenv from 'dotenv'
dotenv.config();
import app from './app';
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/error.middlewares';

const server=http.createServer(app);

try{
    const db=mongoose.connect(process.env.DB_URI||'');
    
    server.listen(process.env.PORT,()=>{
        console.log(`server listening at port ${process.env.PORT}`);
    })
}catch(error){
    console.log("Error while connecting the MongoDB : ", error);
    
}

app.use(errorHandler as any)
