import { useEffect, useState } from "react"
import { getAllCourses } from "../services/getAllCourses"


interface Icreator{
    _id:string,
    firstName:string,
    lastName:string
}
export interface Icourse{
    _id:string,
    imageUrl?:string,
    title:string,
    description:string,
    category:string
    creator:Icreator,
    price:number
}
export const useCoursesList=()=>{
    const [courses,setCourses]=useState<Icourse[]>([]);

    useEffect(()=>{
        const allCourses=async()=>{
            const allCourses=await getAllCourses();
            setCourses(allCourses);
        }
        allCourses();
    },[])
    return courses;
}