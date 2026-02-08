import { useEffect, useState } from "react"
import { getAllCourses } from "../services/getAllCourses"
import type { Icourse } from "../utils/interfaces";



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