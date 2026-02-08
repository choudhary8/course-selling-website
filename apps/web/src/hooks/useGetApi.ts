import { useCallback, useEffect, useState } from "react"
import type { Icourse } from "../utils/interfaces";
import { getApiTrigger } from "../services/get-api-trigger";
import { errorHandler } from "../utils/errorHandler";
import toast from "react-hot-toast";

export const useApi=(route:string)=>{
    const [courses,setCourses]=useState<Icourse[]>([]);
    const getCourses=useCallback(async(route:string)=>{
        try {
            const courses=await getApiTrigger(route);
            if(courses)
            setCourses(courses);
            if(courses?.length===0){
                toast.error('No course available');
            }
        } catch (error) {
            const message=errorHandler(error,'Data fetching failed');
            toast.error(message);
        }
    },[])

    useEffect(()=>{
        getCourses(route);
    },[route]);

    return courses;
}