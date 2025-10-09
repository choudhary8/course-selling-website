//fistname- string,
//lastname - string
//email - string, required, unique
//password - string, required

import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    createdCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
})

userSchema.pre("save",async function (next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=function (password:string):Promise<boolean>{
    return bcrypt.compare(password,this.password);
}

export const User=mongoose.model("User",userSchema);