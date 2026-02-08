import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


export const errorHandler=(error:ApiError, req:Request, res:Response,next:NextFunction)=>{
    console.log(error);
    
    return res.status(error.statusCode||500).json(
        new ApiResponse(error.statusCode,{
            error
        },error.message)
    )
}