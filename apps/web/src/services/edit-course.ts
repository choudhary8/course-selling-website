import axios from "axios";
import { BASE_URL } from "../utils/constants"
import { errorHandler } from "../utils/errorHandler";
import type { Icourse } from "../utils/interfaces";
import toast from "react-hot-toast";

export const editCourse=async(reqData:FormData,courseId:string)=>{
    try { 
        const auth_token=localStorage.getItem('authToken');
        const res=await axios.put<{data:{course:Icourse}}>(`${BASE_URL}/admin/courses/${courseId}`,reqData,{
            headers:{
                Authorization: `Bearer ${auth_token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        return res.data.data;
    } catch (error) {
        const message=errorHandler(error,'Api failed');
        toast.error(message);
    }
}