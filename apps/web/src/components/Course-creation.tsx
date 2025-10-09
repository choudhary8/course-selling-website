import React, { useCallback } from "react"
import { FaGraduationCap } from "react-icons/fa"
import { createCourse} from "../services/create-course";

export const CourseCreation=()=>{
    const handleSubmit:React.FormEventHandler<HTMLFormElement>=useCallback(async(event)=>{
        event.preventDefault();
        try {
            const formData=new FormData(event.currentTarget);
            const res=await createCourse(formData);
            console.log(res);
            
        } catch (error) {
            console.log(error);
            
        }
    },[])
    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} action="" className="flex flex-col sm:w-1/3 p-10 rounded-2xl shadow-xl bg-gray-800">
                <div className="flex justify-center items-center font-bold text-xl"><FaGraduationCap className="text-4xl mx-2"/> CourseHub</div>
                <div className="text-center text-xl p-4">Create your course</div>

                <label htmlFor="title">Course title</label>
                <input type="text" id="title" name="title" placeholder="Enter course title" required/>

                <label htmlFor="category">Course Category</label>
                <input type="text" id="category" name="category" placeholder="Enter course category" required/>

                <label htmlFor="description">Course Description</label>
                <textarea name="description" id="description" placeholder="Enter course description" required></textarea>
                {/* <input type="description" name="description" id="description" placeholder="Enter course description" required/> */}

                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" placeholder="Enter course price" required/>

                <label htmlFor="imge">Course thumbnil</label>
                <input type="file" name="imge" id="imge" required/>

                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 mt-5 rounded-lg cursor-pointer">Create</button>
            </form>
        </div>
    )
}