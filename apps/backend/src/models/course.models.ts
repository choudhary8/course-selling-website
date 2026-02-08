//title-string, required
//description - string, required
//price - number, required
//creator - objectId, required
//imageurl - string

import mongoose, { Mongoose, Schema } from "mongoose";
import { ICourse, CourseDocument, Ilesson } from "../utils/interfaces";

const lessonSchema=new Schema<Ilesson>({
    lessonName:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true
    }
})

const courseSchema=new Schema<ICourse>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    imageUrl: { type: String,required:true },
    lessons:[lessonSchema]
})

export const Course=mongoose.model<ICourse,mongoose.Model<ICourse>>("Course",courseSchema);