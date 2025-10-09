import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.models";
import { Course } from "../models/course.models";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { Multer } from "multer";
import { Admin } from "../models/admin.models";



export const adminSignup=1;

export const adminLogin=1;
export const getAllCourses=1;
export const editCourse=asyncHandler(async(req:Request, res:Response)=>{
    const files=req.files as {imge:Express.Multer.File[]}
    const localFilePath=files?.imge?.[0]?.path;
    
    const courseId:string=req.body.courseId;

    const course=await Course.findById(courseId);
    if(!course){
        throw new ApiError(404,"Course not found")
    }

    const response=await uploadOnCloudinary(localFilePath||'');
    if(!response){
        throw new ApiError(500,"Error while uploading file")
    }
    course.imageUrl=response?.url;
    await course.save();

    return res.status(200).json(
        new ApiResponse(200,{course},"img uploaded")
    )
});
export const createCourse=asyncHandler(async (req:Request, res:Response)=>{
    //get the inputs from frontend - userId, course details - title, image, descryption, price
    //validate the inputs
    //create new course
    //return the response

    interface course{
        title:string,
        description:string,
        price:number,
        // imageUrl:string
    }

    const creatorId=req.userId;
    const courseDetails=req.body as course;
    const files=req.files as {imge:Express.Multer.File[]}
    const localFilePath=files?.imge?.[0]?.path;
    const response=await uploadOnCloudinary(localFilePath||'');
    const imageUrl=response?.url;
    
    Object.values(courseDetails).forEach(ele=>{
        if(!ele){
            throw new ApiError(400,"Parameters missing")
        }
    })

    const creator=await User.findById(creatorId);
    if(!creator){
        throw new ApiError(404,"User not found")
    }

    // const existedCourse=await Course.find({title:courseDetails.title})
    // if(existedCourse.length&&existedCourse[0].creator.equals(creatorId)){
    //     throw new ApiError(400,"Course Already Exist")
    // }
    
    const createdCourse=await Course.create(
        {...courseDetails, imageUrl, creator:creator._id}
    )
    

    if(!createdCourse){
        throw new ApiError(500,"Error while creating the course")
    }

    creator.createdCourses.push(createdCourse._id);
    creator.save();

    const courseInfo={...createdCourse.toJSON(),creator:creator.firstName+" "+creator.lastName}
    return res.status(200).json(
        new ApiResponse(201,{courseInfo},"Course created successfully")
    )
});


export const getAllCreatedCourses=asyncHandler(async(req:Request,res:Response)=>{
    const userId=req.userId;
    const user=await User.findById(userId).populate({path:'createdCourses',populate:{path:'creator',select:'firstName lastName'}}).exec();
    if(!user){
        throw new ApiError(404,'User not found');
    }
    
    return res.status(200).json(
        new ApiResponse(200,user.createdCourses,"Created courses fetched successfully")
    )
})

