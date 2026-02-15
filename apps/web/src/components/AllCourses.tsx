import { useCallback, useContext, useState } from "react";
import { useGetApi } from "../hooks/useGetApi";
import type { Icourse } from "../utils/interfaces";
import { Course } from "./Course";
import { UserContext } from "../utils/userContext";

export const CoursesList = () => {
  const {loading,courses}:{loading:boolean,courses:Icourse[]}=useGetApi("/users/courses");
  const [searchParam,setSearchParam]=useState<string>('');
  const {userName}=useContext(UserContext)!;
  
  
  let timeout:NodeJS.Timeout;
  const handleChange=useCallback((event:React.ChangeEvent<HTMLInputElement>)=>{
    clearTimeout(timeout);
    timeout=setTimeout(()=>{
      setSearchParam(event.target.value);
    },1000)
  },[])

  if(loading){
    return <div className="flex items-center justify-center h-[80dvh]"><div className="loader"></div></div>
  }

  return (
    <>
    <div className="md:mx-30 mx-2 sm:mx-8 my-8">
        <div>
          <input className="border" onChange={handleChange} type="text" placeholder="Search by name/author"/>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 items-start">
          {courses.map((course) => 
            {
              const author:string=`${course.creator.firstName} ${(course.creator.lastName != undefined)?course.creator.lastName:""}`
            console.log("dsfg",userName);
              return ((course.title.includes(searchParam)||author.includes(searchParam))&&!(userName===author))&&<Course
                courseId={course._id}
                key={course._id}
                imgUrl={course.imageUrl}
                courseCategory={course.category}
                courseName={course.title}
                courseDesc={course.description}
                author={author}
                price={course.price} 
                buy={true}
              />
            }
          )}
        </div>
      </div>
    </>
    
  );
};
