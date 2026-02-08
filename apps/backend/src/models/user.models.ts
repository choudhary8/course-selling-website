//fistname- string,
//lastname - string
//email - string, required, unique
//password - string, required

import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { IUser, IUserMethods, UserDocument } from "../utils/interfaces";

const userSchema=new mongoose.Schema<IUser,any,IUserMethods>({
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

userSchema.pre("save",async function (){
    if(!this.isModified("password"))return;
    this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.isPasswordCorrect=function (password:string):Promise<boolean>{
    console.log(this.password);
    
    return bcrypt.compare(password,this.password);
}

export const User=mongoose.model<IUser,mongoose.Model<IUser,{},IUserMethods>>("User",userSchema);