import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

interface decodedJWT{
    id:string
}

declare global{
    namespace Express{
        interface Request{
            userId:string
        }
    }
}

export const verifyJWT=asyncHandler(async (req:Request, _, next:NextFunction)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        throw new ApiError(404,"Unauthorized user")
    }

    const token=authHeader.split(" ")[1];

    const secret=process.env.JWT_SECRET||'';
    
    const decoded=jwt.verify(token, process.env.JWT_SECRET||'') as decodedJWT;
    if(!decoded?.id){
        throw new ApiError(401,"Unauthorized User")
    }

    req.userId=decoded?.id;
    next();
})