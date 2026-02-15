import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.models";
import { Course } from "../models/course.models";
import { ApiResponse } from "../utils/ApiResponse";
// import { Multer } from "multer";
// import { Admin } from "../models/admin.models";
// import ffmpeg from "../utils/ffmpeg";
// import {v4 as uuidv4}  from 'uuid';
// import fs from 'fs'
// import path from 'path'
import { uploadOnCloudinary } from "../utils/cloudinary";
// import { genrateHls } from "../utils/generateHls";
import mongoose, { Mongoose, ObjectId } from "mongoose";


export const adminSignup=1;

export const adminLogin=1;
export const getAllCourses=1;
export const editCourse=asyncHandler(async(req:Request, res:Response)=>{
   interface Icourse{
        title?:string,
        description?:string,
        price?:string,
        category?:string
        // imageUrl:string
    }

    console.log(req.body);
    

    const userId=req.userId;
    const courseId=req.params.courseId;
    const courseDetails=req.body as Icourse;
    const files=req.files as {imge:Express.Multer.File[]}
    const localFilePath=files?.imge?.[0]?.path;

    const course=await Course.findById(courseId);
    if(!course){
        throw new ApiError(404,"Course not found")
    }

    if (!course.creator.equals(userId)) {
        throw new ApiError(403, "You are not allowed to edit this course");
    }

    if(localFilePath){
        const response=await uploadOnCloudinary(localFilePath||'',`courses/${courseId}`);
        if(!response){
            throw new ApiError(500,"Error while uploading file")
        }
        course.imageUrl=response?.url;
    }

    if(courseDetails.title!==undefined&&courseDetails.title!==''){
        course.title=courseDetails.title
    }

    if(courseDetails.description!==undefined&&courseDetails.description!==''){
        course.description=courseDetails.description
    }

    if(courseDetails.price!==undefined&&courseDetails.price!==''){
        course.price=Number(courseDetails.price);
    }

    if(courseDetails.category!==undefined&&courseDetails.category!==''){
        course.category=courseDetails.category
    }

    await course.save();

    return res.status(200).json(
        new ApiResponse(200,{course},"Course edited successfully")
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
        category:string
        // imageUrl:string
    }

    const creatorId=req.userId;
    const courseDetails=req.body as course;
    const files=req.files as {imge:Express.Multer.File[]}
    const localFilePath=files?.imge?.[0]?.path;

    Object.values(courseDetails).forEach(ele=>{
        if(!ele){
            throw new ApiError(400,"Parameters missing")
        }
    })

    const objectId=new mongoose.Types.ObjectId();

    const response=await uploadOnCloudinary(localFilePath||'',`courses/${objectId}`);
    const imageUrl=response?.url;

    const creator=await User.findById(creatorId);
    if(!creator){
        throw new ApiError(404,"User not found")
    }

    // const existedCourse=await Course.find({title:courseDetails.title})
    // if(existedCourse.length&&existedCourse[0].creator.equals(creatorId)){
    //     throw new ApiError(400,"Course Already Exist")
    // }
    
    const createdCourse=await Course.create(
        {_id:objectId, ...courseDetails, imageUrl, creator:creator._id}
    )
    if(!createdCourse){
        throw new ApiError(500,"Error while creating the course")
    }

    creator.createdCourses.push(objectId);
    creator.save();

    const courseInfo={...createdCourse.toJSON(),creator:creator.firstName+" "+creator.lastName}
    return res.status(200).json(
        new ApiResponse(201,{courseInfo},"Course created successfully")
    )
});


export const getAllCreatedCourses=asyncHandler(async(req:Request,res:Response)=>{
    const userId=req.userId;
    const user=await User.findById(userId).select('-lessons').populate({path:'createdCourses',populate:{path:'creator',select:'firstName lastName'}}).exec();
    if(!user){
        throw new ApiError(404,'User not found');
    }
    
    return res.status(200).json(
        new ApiResponse(200,{courses:user.createdCourses},"Created courses fetched successfully")
    )
})

export const uploadLesson=asyncHandler(async(req,res,next)=>{
     //get courseId 
     //get video file path
     //upload video on cloudinary
     //get the cloudinary url
     //save the lessoon in course
     //return lesson

     const {courseId,lessonName}=req.body;
     const files=req.files as {lessonVideo:Express.Multer.File[]}
     const videoPath=files?.lessonVideo[0]?.path;

     if(!courseId||!lessonName||!videoPath){
        throw new ApiError(400,'bad request');
     }

     const course=await Course.findById(courseId);
     if(!course){
        throw new ApiError(404,'Course not found');
     }



    //  const outputPath=path.join(
    //     process.cwd(),
    //     "public",
    //     "courses",
    //     courseId,
    //     id
    //   );;
    //  if(!fs.existsSync(outputPath)){
    //     fs.mkdirSync(outputPath, {recursive: true});
    //  }


    //  const videoUrl=cloudinaryRes.url;
    //  const hlsPath=`${outputPath}/index.m3u8`;

    // const hls =await genrateHls(videoPath,outputPath,hlsPath);
    //  console.log(hls);



     const id=new mongoose.Types.ObjectId();
     
     const response=await uploadOnCloudinary(videoPath,`courses/${courseId}/${id}`);

     const videoUrl=await response?.secure_url.replace(".mp4", ".m3u8");
    //  console.log(response);
     
     course.lessons.push({lessonName,videoUrl});

     await course.save();

     return res.status(202).json(
        new ApiResponse(202,{videoUrl},'lesson uploaded successfully')
     )
})

export const deleteCourse=asyncHandler(async(req:Request,res:Response)=>{
    const userId=req.userId;
    const courseId=req.params.courseId;

    if(!userId||!courseId){
        throw new ApiError(400,"Parameters missing")
    }

    const user=await User.findById(userId);
    if(!user){
        throw new ApiError(404,"Unauthorized user");
    }
    const course=await Course.findById(courseId);
    if(!course||!course.creator.equals(userId)){
        throw new ApiError(404,"invalid parameters");
    }

    const result=await Course.deleteOne({_id:courseId});
    if(result.deletedCount!==1){
        throw new ApiError(500,"Error while deleting the course");
    }

    await user.createdCourses.splice(user.createdCourses.indexOf(new mongoose.Types.ObjectId(courseId),1));
    await user.save();

    return res.status(200).json(
        new ApiResponse(200,"Course deleted successfully")
    )
})


export const deleteLesson=asyncHandler(async(req:Request,res:Response)=>{
    const userId=req.userId;
    const courseId=req.params.courseId;
    const lessonId=req.params.lessonId;

    if(!userId||!courseId||!lessonId){
        throw new ApiError(400,"Parameters missing")
    }

    const user=await User.findById(userId);
    if(!user||!user.createdCourses.indexOf(new mongoose.Types.ObjectId(courseId))){
        throw new ApiError(404,"invalid parameters");
    }
    const course=await Course.findOne({
        _id:courseId,
        creator:userId,
        "lessons._id":lessonId
    });

    if(!course){
        throw new ApiError(404,"invalid parameters");
    }

    const result=await Course.updateOne(
        {_id:courseId},
        {$pull:{'lessons':{_id:lessonId}}}
    );
    if(!result.acknowledged){
        throw new ApiError(500,"Error while deleting the lesson");
    }

    return res.status(200).json(
        new ApiResponse(200,"Lesson deleted successfully")
    )
})
