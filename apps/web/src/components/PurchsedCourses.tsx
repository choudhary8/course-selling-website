// import { usePurchasedCourses } from "../hooks/usePurchasedCourses";
import { useGetApi } from "../hooks/useGetApi";
import type { Icourse } from "../utils/interfaces";
import { Course } from "./Course";

export const PurchasedCourses = () => {
  const {loading,courses}:{loading:boolean,courses:Icourse[]}=useGetApi("/users/courses/purchasedCourses");

  if(loading){
    return <div className="flex items-center justify-center flex-1"><div className="loader"></div></div>
  }

  return (<><div className="md:mx-30 mx-2 sm:mx-8  my-8">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 items-start">
        {courses.map((course) => (
          <Course
            courseId={course._id}
            key={course._id}
            imgUrl={course.imageUrl}
            courseCategory={course.category}
            courseName={course.title}
            courseDesc={course.description}
            author={
              course.creator.firstName +
              " " +
              (course.creator.lastName != undefined
                ? course.creator.lastName
                : "")
            }
            price={course.price}
            buy={false}
          />
        ))}
      </div>
    </div></>
  );
};
