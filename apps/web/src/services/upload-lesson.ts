import axios from "axios";
import { BASE_URL } from "../utils/constants";
import type { IlessonDetails } from "../utils/interfaces";

export const uploadLesson=async (lessonDetails:IlessonDetails)=>{
    try {
        const authToken=localStorage.getItem('authToken');
        const res=await axios.post(`${BASE_URL}/admin/course/upload-lesson`,lessonDetails,{
            headers:{
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(res);
        
    } catch (error) {
        console.log(error);
        
    }
}