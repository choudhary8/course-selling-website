import { useCallback, useEffect, useState } from "react";
import { LessonUpload } from "./LessonUpload";
import type { Ilesson } from "../utils/interfaces";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSearchParams } from "react-router-dom";


export const LessonList = () => {

    const [searchParams,setSearchParams]=useSearchParams();
    const course=searchParams.get('course');
    const [list,setList]=useState<Ilesson[]>([])
    const [uploadVideo,setUploadVideo]=useState<boolean>(false);

    const getList=useCallback(async(courseId:string)=>{
      try {
        const authToken=localStorage.getItem('authToken');
        const res=await axios.get<{data:{lessons:Ilesson[]}}>(`${BASE_URL}/users/course/${courseId}/lessons-list`,{
          headers:{
            "Authorization":`Bearer ${authToken}`
          }
        })
        setList(res.data.data.lessons);
        console.log(list);
        
      } catch (error) {
        
      }
    },[])

    useEffect(()=>{
      if(course!=undefined)
      getList(course);
    },[]);
    
  return <div>
    <div>
      <button onClick={()=>{setUploadVideo(true)}}>Upload</button>
      {(course!=undefined)&&uploadVideo&&<LessonUpload courseId={course}/>}
    </div>
    <div>
    {
        list?.map((lesson)=>(
            <a href={lesson.videoUrl} key={lesson._id} className="decoration-none m-4 flex justify-between hover:bg-gray-900 rounded-md p-2 items-center"><div>{lesson.lessonName}</div><button className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-2 rounded-lg cursor-pointer">Watch</button></a>
        ))
    }
    </div>
  </div>
};
