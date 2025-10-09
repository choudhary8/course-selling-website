import axios from "axios"
import {BASE_URL } from "../utils/constants"
import type { Icourse } from "../hooks/useAllCourses";

export const getAllCourses=async()=>{
    try {
        const auth_token=localStorage.getItem('authToken');
        
        const res=await axios.get<{data:{courses:Icourse[]}}>(`${BASE_URL}/users/courses`,{
            headers:{
                Authorization: `Bearer ${auth_token}`
            }
        })
        
        
        const courses=res.data.data.courses;
        return courses;
    } catch (error) {
        console.log(error);
        return [];
    }
}