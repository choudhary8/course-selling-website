import { NextFunction, Request, Response } from "express"
import { IApiError } from "./ApiError";

export const asyncHandler=(requestHandler:(req:Request,Res:Response,next:NextFunction)=>Promise<IApiError | Response | void>)=>{
    return (req:Request, res:Response,next:NextFunction)=>{
        Promise.resolve(requestHandler(req,res,next)).catch(error=>next(error));
    }
}

// const asyncHandler=(fn)=>(req,res,next)=>{
//     try{
//         fn(req,res,next)
//     }catch(error){
//         return res
//     }
// }