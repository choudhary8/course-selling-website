import { HydratedDocument,Types } from "mongoose";

export interface IUser{
    _id:Types.ObjectId,
    firstName?:string|null,
    lastName?:string|null,
    email:string,
    password:string,
    purchasedCourses:Types.ObjectId[],
    createdCourses:Types.ObjectId[]
}

export interface IUserMethods{
    isPasswordCorrect(password:string):Promise<boolean>
}

export type UserDocument=HydratedDocument<IUser,IUserMethods>

export interface ICourse{
    _id:Types.ObjectId,
    title:string,
    description:string,
    category:string,
    price:number,
    creator:Types.ObjectId,
    imageUrl:string,
    lessons:Types.DocumentArray<Ilesson>
}

export interface Ilesson{
    _id:Types.ObjectId,
    lessonName:string,
    videoUrl:string
}

export type CourseDocument=HydratedDocument<ICourse>