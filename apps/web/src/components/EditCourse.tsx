import React, { useCallback, useState } from "react"
import { FaGraduationCap } from "react-icons/fa"
import { errorHandler } from "../utils/errorHandler";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { editCourse } from "../services/edit-course";

export const EditCourse=()=>{
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [searchParams] = useSearchParams();
    const course = searchParams.get("course");

    const handleSubmit:React.FormEventHandler<HTMLFormElement>=useCallback(async(event)=>{
        event.preventDefault();
        setLoading(true);
        try {
            const formData=new FormData(event.currentTarget);
            if(course)
            {
                const res=await editCourse(formData,course);
                if(res?.course)
                toast.success('Course edited succefully');
            }
        } catch (error) {
            const message=errorHandler(error,'Course creation failed')
                 toast.error(message);
        }finally{
            setLoading(false);
        }
    },[])

    const handleFileSize=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const file=event.target.files?.[0];
        if(!file)return;
        const fileSize=file?.size/(1024*1024);
        if(fileSize>5){
            toast.error(`file size must be less than 5MB.`)
            event.target.value='';
            return;
        }
    }

    if(loading){
        return <div className="flex items-center justify-center flex-1"><div className="loader"></div></div>
      }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} action="" className="flex flex-col w-full sm:w-1/3 p-10 rounded-2xl sm:bg-gray-800">
                <div className="flex justify-center items-center font-bold text-xl"><FaGraduationCap className="text-4xl mx-2"/> CourseHub</div>
                <div className="text-center text-xl p-4">Edit your course</div>

                <label htmlFor="title">Course title</label>
                <input type="text" id="title" name="title" placeholder="Enter course title"/>

                <label htmlFor="category">Course Category</label>
                <input type="text" id="category" name="category" placeholder="Enter course category"/>

                <label htmlFor="description">Course Description</label>
                <textarea name="description" id="description" placeholder="Enter course description"></textarea>
                {/* <input type="description" name="description" id="description" placeholder="Enter course description"/> */}

                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" placeholder="Enter course price"/>

                <label htmlFor="imge">Course thumbnil <span className="text-[0.71rem]">(*limit-5MB)</span></label>
                <input onChange={handleFileSize} type="file" accept="image/*" name="imge" id="imge"/>

                <div className="grid grid-cols-3 gap-4 justify-between">
                    <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 rounded-lg cursor-pointer">Edit</button>
                    <div onClick={()=>{navigate(-1)}} className="flex justify-center bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 rounded-lg cursor-pointer">Back</div>
                </div>
            </form>
        </div>
    )
}