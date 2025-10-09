import axios from "axios"
import { BASE_URL } from "../utils/constants"
import type { Icourse } from "../hooks/useAllCourses";

export const getPurchasedCourses=async()=>{
    try{
        const auth_token=localStorage.getItem('authToken');
        const res=await axios.get<{data:{courses:Icourse[]}}>(`${BASE_URL}/users/courses/purchasedCourses`,{
            headers:{
                Authorization:`Bearer ${auth_token}`
            }
        })
        return res.data.data.courses;
    }catch(error){
        console.log(error);
        return [];
    }
}