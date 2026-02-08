//firstname - string
//lastname - string
//email - string, required, unique
//password - string, required

import mongoose, { Schema } from "mongoose";

const adminSchema=new Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    createdCourses:[{
        type:mongoose.Schema.Types.ObjectId
    }]
})

export const Admin=mongoose.model("Admin",adminSchema);