import { useCallback, useEffect, useState } from "react"
import { getAllCreatedCourses } from "../services/getAllCreatedCourses";
import type { Icourse } from "../utils/interfaces";

export const useCreatedCourses=()=>{
    const [createdCourses,setCreatedCourses]=useState<Icourse[]>([]);
    const getCreatedCourses=useCallback(async()=>{
        const allCreatedCourses=await getAllCreatedCourses();
        if(allCreatedCourses){
            setCreatedCourses(allCreatedCourses);
        }
    },[])
    useEffect(()=>{
        getCreatedCourses();
    },[])

    return createdCourses;
}