import axios from "axios"
import {  BASE_URL } from "../utils/constants"

export const purchaseCourse=async(course:string)=>{
    try{
        const auth_token=localStorage.getItem('authToken');
        const res=await axios.post(`${BASE_URL}/users/courses`,{
            courseId:course
        },{
            headers:{
                authorization:`Bearer ${auth_token}`
            }
        })
        return res.data;
    }catch(error){
        alert(error.response.data.message);
        throw error;
    }
}