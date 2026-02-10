import React, { useCallback, useState} from "react"
import { FaGraduationCap } from "react-icons/fa"
import type { IlessonDetails } from "../utils/interfaces";
import { uploadLesson } from "../services/upload-lesson";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { errorHandler } from "../utils/errorHandler";

export const LessonUpload=()=>{
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const location=useLocation();
    const courseId=location.state?.courseId;
    const handleSubmit:React.FormEventHandler<HTMLFormElement>=useCallback(async (event)=>{
        try{
            event.preventDefault();
            setLoading(true);
            const formData=new FormData(event.currentTarget);
            const lessonDetails:IlessonDetails={
                courseId,
                lessonName:formData.get('lessonName') as string,
                lessonVideo:formData.get('lessonVideo') as File
            }
        
        await uploadLesson(lessonDetails);
        toast.success("lesson uploaded successfully")
        }catch(error){
            const msg=errorHandler(error,"lesson upload failed")
            toast.error(msg)
        }finally{
        setLoading(false);
        }
    },[])

    const handleFileSize=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const file=event.target.files?.[0];
        if(!file)return;
        const fileSize=file?.size/(1024*1024);
        if(fileSize>20){
            toast.error(`file size must be less than 20MB.`)
            event.target.value='';
            return;
        }
    }

    if(loading){
        return <div className="flex flex-col items-center justify-center flex-1"><div className="text-blue-800">Please wait... This may take a while if video is long.</div><div className="loader"></div></div>
      }

    return <div className="flex flex-1 justify-center items-center">
    <form onSubmit={handleSubmit} action="" className="flex flex-col w-[28%] p-10 rounded-2xl shadow-xl bg-gray-800">
        <div className="flex justify-center items-center font-bold text-xl"><FaGraduationCap className="text-4xl mx-2"/> CourseHub</div>
        <div className="text-center text-xl p-4">Upload your lesson</div>

        <label htmlFor="lessonName">Lesson name</label>
        <input  name="lessonName" id="lessonName" placeholder="Enter your lesson name" required/>

        <label htmlFor="lessonVideo">Lesson video <span className="text-[0.71rem]">(*limit-20MB and .mp4 & .webm)</span></label>
        <input onChange={handleFileSize} type="file" accept="video/mp4,video/webm" name="lessonVideo" id="lessonVideo" required/>

        <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 mt-5 rounded-lg cursor-pointer">Upload</button>
        <div onClick={()=>{navigate(-1)}} className="flex justify-center bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 mt-5 rounded-lg cursor-pointer">Back</div>
        </form>
</div>
}