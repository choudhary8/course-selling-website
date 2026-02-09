import { useCallback } from "react";
import { LuUser } from "react-icons/lu";
import { purchaseCourse } from "../services/purchaseCourse";
import toast from "react-hot-toast";
import { errorHandler } from "../utils/errorHandler";
import { useLocation, useNavigate } from "react-router-dom";

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
  const buyCourse = useCallback(async () => {
    try {
      const res = await purchaseCourse(courseId);
      console.log(res);

      if (res) {
        toast.success("Course bought successfully");
      }
    } catch (error: any) {
      const message = errorHandler(error, "Course puchase failed");
      toast.error(message);
    }
  }, []);
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
          <button onClick={()=>{navigate(`../lessons-list?course=${courseId}`,{state:{from:location.pathname}})}} className="hover:bg-blue-800 text-blue-600 hover:text-white border-black p-3 mt-2 rounded-lg cursor-pointer w-full">
              View Course
          </button>
        )}
      </div>
    </div>
  );
};
