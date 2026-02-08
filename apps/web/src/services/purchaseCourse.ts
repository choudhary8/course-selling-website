import axios from "axios"
import {  BASE_URL } from "../utils/constants"
import { errorHandler } from "../utils/errorHandler";

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
    }catch(error:any){
        const message=errorHandler(error,'Api failed');
        console.log(message);
        if(message.includes('Already purchased'))
        throw new Error('Already Purchased');
        else
        throw new Error(message);
    }
}