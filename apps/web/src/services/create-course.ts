import axios from "axios";
import { BASE_URL } from "../utils/constants"

export const createCourse=async(reqData:FormData)=>{
    try { 
        const auth_token=localStorage.getItem('authToken');
        const res=await axios.post(`${BASE_URL}/admin/courses`,reqData,{
            headers:{
                Authorization: `Bearer ${auth_token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}