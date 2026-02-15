import { useCallback, useEffect, useState } from "react";
import type { Ilesson } from "../utils/interfaces";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteLesson } from "../services/delete-lesson";

export const LessonList = () => {
  const [searchParams] = useSearchParams();
  const course = searchParams.get("course");
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParam,setSearchParam]=useState<string>('');
  // console.log(location.state.from);

  const [list, setList] = useState<Ilesson[]>([]);
  const [loading, setLoading] = useState(false);

  const getList = useCallback(async (courseId: string) => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem("authToken");
      const res = await axios.get<{ data: { lessons: Ilesson[] } }>(
        `${BASE_URL}/users/course/${courseId}/lessons-list`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const lessons = res.data.data.lessons;

      if (lessons?.length === 0) {
        toast.error("No lessons available");
      }

      setList(lessons);
    } catch (error) {
      toast.error("Error while fetching the lessons");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (course != undefined) getList(course);
  }, []);

  const handleUpload = useCallback(async () => {
    if (course != undefined) {
      navigate("/lesson-upload", { state: { courseId: course } });
    }
  }, []);


  let timeout:NodeJS.Timeout;
  const handleChange=useCallback((event:React.ChangeEvent<HTMLInputElement>)=>{
    clearTimeout(timeout);
    timeout=setTimeout(()=>{
      setSearchParam(event.target.value);
    },1000)
  },[])

  const handleDelete=useCallback(deleteLesson,[])

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="md:mx-30 mx-2 sm:mx-8 my-8">
      <div className="flex justify-between">
        {location.state.from === "/created-courses" && (
          <button
            onClick={handleUpload}
            className=" bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 rounded-lg cursor-pointer"
          >
            Upload Lesson
          </button>
        )}
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 px-8 rounded-lg cursor-pointer"
        >
          Back
        </button>
      </div>
      <div className="my-4">
        <div>
          <input className="border" onChange={handleChange} type="text" placeholder="Search by name"/>
        </div>
        {list?.map((lesson) => (
          (lesson.lessonName.includes(searchParam))&&<div
          className="mb-4 flex justify-between items-center hover:inset-ring hover:shadow-sm hover:shadow-blue-700 hover:inset-ring-blue-700 rounded-2xl p-4 px-6 bg-gray-900 border-[0.25px] border-black"
          >
            <div
            className="flex cursor-pointer"
            onClick={() => {
              navigate("/lesson-video", {
                state: {
                  lessonName: lesson.lessonName,
                  videoUrl: lesson.videoUrl,
                },
              });
            }}
            key={lesson._id}
            >
            <div className="w-20 h-20 rounded-lg flex items-center justify-center bg-blue-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-play size-6 text-blue-600"
              >
                <polygon points="6 3 20 12 6 21 6 3"></polygon>
              </svg>
            </div>
            <div className="sm:font-medium sm:text-2xl ml-5">{lesson.lessonName}</div>
          </div>
          {location.state.from === "/created-courses"&&<button
          onClick={() => {if(course&&lesson._id)handleDelete({courseId:course,lessonId:lesson._id})}}
          className="bg-blue-700 hover:bg-blue-800 text-white border-black border-1 p-3 px-8 rounded-lg cursor-pointer"
        >
          Delete
        </button>}
          </div>
        ))}
      </div>
    </div>
  );
};
