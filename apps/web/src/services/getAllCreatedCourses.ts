import axios from "axios"
import { BASE_URL } from "../utils/constants"
import type { Icourse } from "../hooks/useAllCourses";

export const getAllCreatedCourses=async()=>{
    try {
        const token=localStorage.getItem('authToken');
        const res=await axios.get<{data:{courses:Icourse[]}}>(`${BASE_URL}/admin/created-courses`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}