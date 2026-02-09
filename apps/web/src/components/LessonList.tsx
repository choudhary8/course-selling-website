import { useCallback, useEffect, useState } from "react";
import type { Ilesson } from "../utils/interfaces";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";


export const LessonList = () => {

    const [searchParams]=useSearchParams();
    const course=searchParams.get('course');
    const location=useLocation();
    const navigate=useNavigate();
    // console.log(location.state.from);
    
    const [list,setList]=useState<Ilesson[]>([])
    const [loading,setLoading]=useState(false);

    const getList=useCallback(async(courseId:string)=>{
      try {
        setLoading(true);
        const authToken=localStorage.getItem('authToken');
        const res=await axios.get<{data:{lessons:Ilesson[]}}>(`${BASE_URL}/users/course/${courseId}/lessons-list`,{
          headers:{
            "Authorization":`Bearer ${authToken}`
          }
        })
        const lessons=res.data.data.lessons;

        if(lessons?.length===0){
          toast.error('No lessons available');
        }
        
        setList(lessons);
      } catch (error) {
        toast.error('Error while fetching the lessons')
      }finally{
        setLoading(false);
      }
    },[])

    useEffect(()=>{
      if(course!=undefined)
      getList(course);
    },[]);

    const handleUpload=useCallback(async ()=>{
      if(course!=undefined){
        navigate('/lesson-upload',{state:{courseId:course}});
      }
    },[])
  
    if(loading){
      return <div className="flex items-center justify-center h-[80dvh]"><div className="loader"></div></div>
    }

  return <div className="md:mx-30 mx-2 sm:mx-8">
    <div className="flex flex-row-reverse">
      {(location.state.from==='/created-courses')&&<button onClick={handleUpload} className="mt-3 mr-5 bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 rounded-lg cursor-pointer">Upload Lesson</button>}
    </div>
    <div>
    {
        list?.map((lesson)=>(
            <a href={lesson.videoUrl} key={lesson._id} className="decoration-none m-4 flex hover:inset-ring hover:shadow-sm hover:shadow-blue-700 hover:inset-ring-blue-700 rounded-2xl p-4 bg-gray-900 border-[0.25px] border-black"><div className="w-20 h-20 rounded-lg flex items-center justify-center bg-blue-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play size-6 text-blue-600"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg></div><div className="font-medium text-2xl ml-5">{lesson.lessonName}</div></a>
        ))
    }
    </div>
  </div>
};
