import { useCallback, useEffect, useState } from "react"
import { getPurchasedCourses } from "../services/getPurchasedCourses";
import type { Icourse } from "./useAllCourses";

export const usePurchasedCourses=()=>{
    const [courses,setCourses]=useState<Icourse[]>([]);
    const getPurchasedCourse=useCallback(async()=>{
        const res=await getPurchasedCourses();
        if(res){
        setCourses(res);
    }
    },[])
    useEffect(()=>{
        getPurchasedCourse();
    },[])
    return courses;
}