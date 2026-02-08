// // import http from 'http';
// import dotenv from 'dotenv'
// dotenv.config();
// import app from '../src/app';
// import mongoose from 'mongoose';
// import { asyncHandler } from '../src/utils/asyncHandler';

// const connectDb=async ()=>{
//     try{
//         console.log('connecting to db....');
        
//         const db=await mongoose.connect(process.env.DB_URI||'');
//         console.log('connected to db.');
//         // const server=http.createServer(app);
//         // server.listen(process.env.PORT,()=>{
//         //     console.log(`server listening at port ${process.env.PORT}`);
//         // })
//     }catch(error){
//         console.log("Error while connecting the MongoDB : ", error);
        
//     }
// }

// export default async function handler(req:any, res:any){
//     await connectDb();
//     return app(req,res);
// }


import app from "../src/app";
import { connectDB } from "../lib/db";

export default async function handler(req: any, res: any) {
  await connectDB();
  return app(req, res);
}
