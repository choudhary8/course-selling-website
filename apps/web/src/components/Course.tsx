import { useCallback, useState } from "react";
import { LuUser } from "react-icons/lu";
import { purchaseCourse } from "../services/purchaseCourse";
import toast from "react-hot-toast";
import { errorHandler } from "../utils/errorHandler";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteCourse } from "../services/delete-course";

export interface Iparams {
  courseId: string;
  imgUrl?: string;
  courseCategory: string;
  courseName: string;
  courseDesc: string;
  author: string;
  price: number;
  buy: boolean;
}

export const Course = ({
  courseId,
  imgUrl,
  courseCategory = "course",
  courseName,
  courseDesc,
  author,
  price,
  buy,
}: Iparams) => {
  const navigate=useNavigate();
  const location=useLocation();
  const [loading,setLoading]=useState(false);

  const buyCourse = useCallback(async () => {
    try {
      setLoading(true);
      const res = await purchaseCourse(courseId);
      console.log(res);

      if (res) {
        toast.success("Course bought successfully");
      }
    } catch (error: any) {
      const message = errorHandler(error, "Course puchase failed");
      toast.error(message);
    }finally{
      setLoading(false);
    }
  }, []);

  const handleDelete=useCallback(()=>{
    deleteCourse({courseId});
  },[])

  if(loading){
    return <div className="flex items-center justify-center h-full"><div className="loader"></div></div>
  }
  return (
    <div className="rounded-2xl shadow-xl bg-gray-800 overflow-hidden">
      <div>
        {imgUrl && (
          <img src={imgUrl} alt="courseImage" className="w-full h-60" />
        )}
      </div>
      <div className="p-6 ">
        <div>
          <span className="bg-gray-700 rounded-xl shadow-xl p-1 px-2 text-sm">
            {courseCategory}
          </span>
        </div>
        <div className="font-bold text-xl py-3">{courseName}</div>
        <div>{courseDesc}</div>
        <div className="flex items-center font-semibold py-2">
          <LuUser className="mx-1" />
          {author}
        </div>
        <div className="text-blue-500 hover:text-blue-600">${price}</div>
        {buy ? (
          <button
            onClick={buyCourse}
            className="hover:bg-blue-800 text-blue-600 hover:text-white border-black p-3 mt-2 rounded-lg cursor-pointer w-full"
          >
            Buy
          </button>
        ) : (
          <div>
            <button onClick={()=>{navigate(`/lessons-list?course=${courseId}`,{state:{from:location.pathname}})}} className="block bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 px-8 rounded-lg cursor-pointer mt-4 w-full">
              View Content
            </button>
            {location.pathname === "/created-courses"&&<div className="mt-3 grid grid-cols-2 gap-4">
              <button
              onClick={handleDelete}
              className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 px-8 rounded-lg cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={()=>{navigate(`/edit-course?course=${courseId}`)}}
              className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 px-8 rounded-lg cursor-pointer"
            >
              Edit
            </button>
            </div>}
          </div>
        )}
      </div>
    </div>
  );
};
