import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


export const errorHandler=(error:ApiError, req:Request, res:Response,next:NextFunction)=>{
    console.log(error.message);
    
    return res.status(error.statusCode).json(
        new ApiResponse(error.statusCode,{
            error
        },error.message)
    )
}