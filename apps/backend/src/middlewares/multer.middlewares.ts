import { Request } from "express";
import multer from "multer";
import {v4 as uuidv4} from 'uuid';
import path from 'path'

const storage=multer.diskStorage({
    destination:function(req:Request,file:Express.Multer.File,cb:(Error:Error|null, destination:string)=>void){
        cb(null,'./public/temp');
    },
    filename:function(req:Request,file:Express.Multer.File,cb:(Error:Error|null,filename:string)=>void){
        cb(null,file.fieldname+'-'+uuidv4()+path.extname(file.originalname))
    }
})

export const upload=multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
      }
})