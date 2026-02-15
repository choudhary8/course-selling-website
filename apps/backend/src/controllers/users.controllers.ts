import { Request, Response } from "express";
import { User } from "../models/user.models";
import { Course } from "../models/course.models";
import jwt, { SignOptions } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";


export const userSignup=asyncHandler(async (req:Request,res:Response)=>{
    //parameters from req
    //validating the parameters
    //checking if user already exist
    //if not then create the user
    //return the user

    interface signinData{
        firstName:string|"",
        lastName:string|"",
        email:string,
        password:string
    }
    console.log(req.body);
    const  {firstName,lastName,email,password}:signinData=req.body;
    
    
    const existedUser=await User.findOne({email:email});
    if(existedUser){
        throw new ApiError(400,"User already exist");
    }

    const user=await User.create({
        firstName,
        lastName,
        email,
        password
    })

    const createdUser=await User.findById(user._id).select("-password");

    if(!createdUser){
        throw new ApiError(500,"Error while creating the User")
    }

    return res.status(200).json(
        new ApiResponse(201,{
            createdUser
        },"User created successfully")
    )
});


export const userLogin=asyncHandler(async (req:Request,res:Response)=>{
    //Fetching parameters from req
    //validating the parameters
    //check if user exist
    //if exist the create the jwt token
    //return res with jwt token

    interface loginData{
        email:string,
        password:string
    }

    const {email,password}=req?.body as loginData;

    if(!email||!password){
        throw new ApiError(400,"parameters required")
    }

    const user=await User.findOne({email:email});
    if(!user){
        throw new ApiError(404,"User not found")
    }

    const isCorrect=await user.isPasswordCorrect(password);
    // console.log(isCorrect);
    
    if(!isCorrect){
        throw new ApiError(400,"Password incorrect")
    }

    const token=jwt.sign({
        id:user._id
    },(process.env.JWT_SECRET||'eljgf') as string,{
        expiresIn:(process.env.JWT_EXPIRY||'1h') as SignOptions["expiresIn"]
    })

    if(!token){
        throw new ApiError(500,"Error while creating the auth token")
    }

    let resUser=user.firstName;
    resUser+=' ';
    if(user.lastName){
        resUser+=user.lastName;
    }
    return res.status(200).json(
        new ApiResponse(200,{
            user:resUser,
            token
        },"User logged in successfully")
    )
});


export const getAllCourses=asyncHandler(async(req:Request,res:Response)=>{
    //get all courses from db
    const courses=await Course.find().populate('creator','firstName lastName').select('-lessons');
    
    if(!courses){
        throw new ApiError(404,"No courses available")
    }

    return res.status(200).json(
        new ApiResponse(200,{
            courses
        },"Courses fetched successfully"))
});


export const purchaseCourse=asyncHandler(async(req:Request,res:Response)=>{
    //get parameters from req
    //validate the parameter
    //save the purchase details in db

    interface purchaseInterface{
        courseId:string
    }

    const userId=req?.userId;
    const {courseId}:purchaseInterface=req.body;
    if(!userId||!courseId){
        throw new ApiError(403,"parameters missing")
    }

    const course=await Course.findById(courseId)
    if(!course){
        throw new ApiError(404,"Course not found")
    }

    const user=await User.findById(userId).select("-password");
    if(!user){
        throw new ApiError(404,"User not found");
    }

    if(user.purchasedCourses.some(id=>id.equals(courseId))){
        throw new ApiError(400,"Already purchased");
    }

    user.purchasedCourses.push(new mongoose.Types.ObjectId(courseId));
    user.save({validateBeforeSave:false});
    return res.status(200).json(
        new ApiResponse(201,{
            course
        },"Course purchased successfully")
    )
});


export const getPurchasedCourses=asyncHandler(async (req:Request, res:Response)=>{
    //get the inputs from req
    //validate the inputs
    //validate the user
    //fetch all the courses with courseIds
    //return all the fetch courses

    const userId=req?.userId;
    if(!userId){
        throw new ApiError(400,"User required")
    }

    // const user=await User.findById(userId);
    // if(!user){
    //     throw new ApiError(404,"User not found")
    // }

    // returns js native promise for each query and awaits for all promises to resolve and then returns array of resolved values
    // const courses=await Promise.all(user.purchasedCourses.map(courseId=>Course.findById(courseId).exec()));


    //finds user by id then populate it's purchasedCourses feild with courses from Course instead of ids
    const user=await User.findById(userId).populate({path:'purchasedCourses',select:'-lessons',populate:{path:'creator',select:'firstName lastName'}}).exec();
    if(!user){
        throw new ApiError(404,"User not found")
    }

    const courses=user.purchasedCourses;
    if(!courses){
        throw new ApiError(500,"Error while fetching the courses")
    }

    return res.status(200).json(
        new ApiResponse(200,{
            courses
        },"Courses fetched successfully")
    )

});


export const getLessonsList=asyncHandler(async(req:Request, res:Response)=>{
    //get courseID
    //verify courseId
    //get the lessons with course
    const courseId=req.params.courseId;
    console.log(courseId);
    
    if(!courseId){
        throw new ApiError(400,'course id misssing');
    }

    const lessonsList=await Course.findById(courseId).select('lessons ');
    if(!lessonsList){
        throw new ApiError(500,'Error while fetching the lessons');
    }

    return res.status(200).json(
        new ApiResponse(200,lessonsList,'lessons fetched successfully')
    );

})