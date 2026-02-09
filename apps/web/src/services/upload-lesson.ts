import axios from "axios";
import { BASE_URL } from "../utils/constants";
import type { IlessonDetails } from "../utils/interfaces";
import { errorHandler } from "../utils/errorHandler";

export const uploadLesson=async (lessonDetails:IlessonDetails)=>{
    try {
        const authToken=localStorage.getItem('authToken');
        await axios.post(`${BASE_URL}/admin/course/upload-lesson`,lessonDetails,{
            headers:{
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "multipart/form-data"
            }
        })
    } catch (error) {
        console.log(error);
        errorHandler(error,"upload failed");
    }
}