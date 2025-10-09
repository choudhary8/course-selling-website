import { useCallback, useEffect, useState } from "react"
import { getAllCreatedCourses } from "../services/getAllCreatedCourses";
import type { Icourse } from "./useAllCourses";

export const useCreatedCourses=()=>{
    const [createdCourses,setCreatedCourses]=useState<Icourse[]>([]);
    const getCreatedCourses=useCallback(async()=>{
        setCreatedCourses(await getAllCreatedCourses());
    },[])
    useEffect(()=>{
        getCreatedCourses();
    },[])

    return createdCourses;
}