//title-string, required
//description - string, required
//price - number, required
//creator - objectId, required
//imageurl - string

import mongoose, { Mongoose, Schema } from "mongoose";

const courseSchema=new Schema({
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
    imageUrl: { type: String,required:true }
})

export const Course=mongoose.model("Course",courseSchema);